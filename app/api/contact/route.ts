import { NextResponse } from "next/server";

const toEmails = [process.env.CONTACT_EMAIL_1, process.env.CONTACT_EMAIL_2].filter(Boolean) as string[];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, subject, message } = data as {
      name?: string;
      email?: string;
      subject?: string;
      message?: string;
    };

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ success: false, message: "Please complete all fields." }, { status: 400 });
    }

    if (!toEmails.length) {
      return NextResponse.json({ success: false, message: "Email delivery is not configured yet." }, { status: 500 });
    }

    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      message,
    ].join("\n");

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.EMAIL_FROM || "onboarding@resend.dev",
        to: toEmails,
        subject: `[Academic Portfolio] ${subject}`,
        text: body,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send email");
    }

    return NextResponse.json({ success: true, message: "Message delivered successfully." });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: "Unable to send message right now. Please email directly." }, { status: 500 });
  }
}
