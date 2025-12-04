import { NextRequest, NextResponse } from "next/server";
import { sendEmail, getDefaultRecipient } from "@/lib/nodemailer";
import { generateContactEmail, type ContactEmailData } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const body: ContactEmailData = await request.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate email HTML
    const html = generateContactEmail(body);
    const subject = `New Contact Form Submission from ${body.name}`;
    const recipientEmail = getDefaultRecipient();

    // Send email with submitter's name as the from name
    await sendEmail({
      to: recipientEmail,
      subject,
      html,
      fromName: body.name,
      replyTo: body.email,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error in contact email API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    );
  }
}

