import { NextRequest, NextResponse } from "next/server";
import { sendEmail, getDefaultRecipient } from "@/lib/nodemailer";
import { generateAppointmentEmail, type AppointmentEmailData } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const body: AppointmentEmailData = await request.json();

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.eventType || !body.details) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Generate email HTML
    const html = generateAppointmentEmail(body);
    const subject = `New Consultation Request from ${body.firstName} ${body.lastName}`;
    const recipientEmail = getDefaultRecipient();
    const fullName = `${body.firstName} ${body.lastName}`;

    // Send email with submitter's name as the from name
    await sendEmail({
      to: recipientEmail,
      subject,
      html,
      fromName: fullName,
      replyTo: body.email,
    });

    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error in appointment email API:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    );
  }
}

