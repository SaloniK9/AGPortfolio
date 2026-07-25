"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Eye, Users } from "lucide-react";
import { createSupabaseBrowserClient } from "@/lib/supabase";

const STORAGE_KEY = "portfolio-visitor-id";

export default function VisitorCounter() {
  const [onlineCount, setOnlineCount] = useState(0);
  const [totalVisitors, setTotalVisitors] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isConfigured, setIsConfigured] = useState(true);

  const channelName = useMemo(() => "portfolio-presence", []);

  useEffect(() => {
    const client = createSupabaseBrowserClient();
    if (!client) {
      setIsConfigured(false);
      setIsReady(true);
      return;
    }

    let isMounted = true;
    let channel: ReturnType<typeof client.channel> | null = null;

    const run = async () => {
      const sessionId = crypto.randomUUID();
      channel = client.channel(channelName, {
        config: {
          broadcast: { self: false },
          presence: { key: sessionId },
        },
      });

      channel.on("presence", { event: "sync" }, () => {
        if (!isMounted) return;
        const state = channel?.presenceState();
        const count = state ? Object.values(state).filter((members) => Array.isArray(members) && members.length > 0).length : 0;
        setOnlineCount(count);
      });

      channel.on("presence", { event: "join" }, () => {
        if (!isMounted) return;
        const count = Object.keys(channel?.presenceState() ?? {}).length;
        setOnlineCount(count);
      });

      channel.on("presence", { event: "leave" }, () => {
        if (!isMounted) return;
        const count = Object.keys(channel?.presenceState() ?? {}).length;
        setOnlineCount(count);
      });

      await channel.subscribe(async (status) => {
        if (!isMounted) return;

        if (status === "SUBSCRIBED") {
          await channel?.track({ user_id: sessionId, online_at: new Date().toISOString() });
          setIsReady(true);
        }
      });
    };

    run();

    return () => {
      isMounted = false;
      if (channel) {
        void channel.untrack();
        void channel.unsubscribe();
      }
    };
  }, [channelName]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedVisitorId = window.localStorage.getItem(STORAGE_KEY);
    const visitorId = storedVisitorId ?? crypto.randomUUID();

    if (!storedVisitorId) {
      window.localStorage.setItem(STORAGE_KEY, visitorId);
    }

    const registerVisitor = async () => {
      try {
        const response = await fetch("/api/visitors", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId }),
        });

        const data = await response.json();
        if (data?.totalVisitors !== undefined) {
          setTotalVisitors(data.totalVisitors);
        }
      } catch {
        setTotalVisitors(0);
      }
    };

    void registerVisitor();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 rounded-[1.5rem] border border-slate-100 bg-white/90 px-3 py-3 shadow-[0_16px_40px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:bottom-6 sm:right-6"
    >
      <div className="flex items-center gap-2 rounded-full bg-slate-50 px-3 py-2">
        <div className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-600" />
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.28em] text-slate-400">Online Now</p>
          <p className="text-sm font-black text-slate-900 tabular-nums">
            {isConfigured ? (isReady ? `${onlineCount} Visitors` : "Connecting...") : "Offline"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-amber-100 bg-amber-50/80 px-3 py-2">
        <div className="rounded-full bg-amber-100 p-2 text-amber-700">
          <Eye className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.28em] text-amber-700/80">Total Visitors</p>
          <p className="text-sm font-black text-slate-900 tabular-nums">{totalVisitors.toLocaleString()}</p>
        </div>
      </div>
    </motion.div>
  );
}
