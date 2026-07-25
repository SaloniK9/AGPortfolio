import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const createSupabaseServerClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
};

export async function GET() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ success: true, totalVisitors: 0, isConfigured: false });
  }

  const { data, error } = await supabase
    .from("visitor_stats")
    .select("total_visitors")
    .eq("id", "portfolio")
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    return NextResponse.json({ success: false, totalVisitors: 0, message: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, totalVisitors: data?.total_visitors ?? 0, isConfigured: true });
}

export async function POST(request: Request) {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return NextResponse.json({ success: true, totalVisitors: 0, isConfigured: false });
  }

  const body = await request.json().catch(() => ({}));
  const visitorId = typeof body.visitorId === "string" ? body.visitorId.trim() : "";

  if (!visitorId) {
    return NextResponse.json({ success: false, totalVisitors: 0, message: "Missing visitorId" }, { status: 400 });
  }

  const { data: existingSession, error: existingSessionError } = await supabase
    .from("visitor_sessions")
    .select("visitor_id")
    .eq("visitor_id", visitorId)
    .maybeSingle();

  if (existingSessionError && existingSessionError.code !== "PGRST116") {
    return NextResponse.json({ success: false, totalVisitors: 0, message: existingSessionError.message }, { status: 500 });
  }

  if (existingSession) {
    const { data: statsData, error: statsError } = await supabase
      .from("visitor_stats")
      .select("total_visitors")
      .eq("id", "portfolio")
      .maybeSingle();

    if (statsError && statsError.code !== "PGRST116") {
      return NextResponse.json({ success: false, totalVisitors: 0, message: statsError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, totalVisitors: statsData?.total_visitors ?? 0, isConfigured: true, isNewVisitor: false });
  }

  const { error: insertSessionError } = await supabase.from("visitor_sessions").insert({
    visitor_id: visitorId,
    first_seen: new Date().toISOString(),
  });

  if (insertSessionError) {
    return NextResponse.json({ success: false, totalVisitors: 0, message: insertSessionError.message }, { status: 500 });
  }

  const { data: currentStats, error: statsError } = await supabase
    .from("visitor_stats")
    .select("total_visitors")
    .eq("id", "portfolio")
    .maybeSingle();

  if (statsError && statsError.code !== "PGRST116") {
    return NextResponse.json({ success: false, totalVisitors: 0, message: statsError.message }, { status: 500 });
  }

  const nextTotal = (currentStats?.total_visitors ?? 0) + 1;

  const { data: updatedStats, error: upsertError } = await supabase
    .from("visitor_stats")
    .upsert({ id: "portfolio", total_visitors: nextTotal }, { onConflict: "id" })
    .select("total_visitors")
    .single();

  if (upsertError) {
    return NextResponse.json({ success: false, totalVisitors: 0, message: upsertError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, totalVisitors: updatedStats?.total_visitors ?? nextTotal, isConfigured: true, isNewVisitor: true });
}
