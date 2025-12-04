import { NextResponse } from "next/server";
import { verifyTransporter } from "@/lib/nodemailer";

/**
 * Test endpoint to verify SMTP configuration
 * GET /api/email/test-config
 * 
 * This endpoint helps diagnose SMTP configuration issues
 * without exposing sensitive credentials.
 */
export async function GET() {
  try {
    // Check for Mailjet API keys first
    const hasMailjet = !!(process.env.MAILJET_API_KEY && process.env.MAILJET_SECRET_KEY);
    
    // Check environment variables (without exposing values)
    const envVars = {
      // Mailjet configuration
      MAILJET_API_KEY: !!process.env.MAILJET_API_KEY,
      MAILJET_SECRET_KEY: !!process.env.MAILJET_SECRET_KEY,
      // SMTP configuration (fallback or custom)
      SMTP_HOST: !!process.env.SMTP_HOST,
      SMTP_PORT: !!process.env.SMTP_PORT,
      SMTP_USER: !!process.env.SMTP_USER,
      SMTP_PASSWORD: !!process.env.SMTP_PASSWORD,
      // Required for both
      SMTP_FROM_EMAIL: !!process.env.SMTP_FROM_EMAIL,
      SMTP_FROM_NAME: !!process.env.SMTP_FROM_NAME,
      SMTP_TO_EMAIL: !!process.env.SMTP_TO_EMAIL,
    };

    // Determine which configuration is being used
    const usingMailjet = hasMailjet;
    const usingSMTP = !!(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASSWORD);

    if (!usingMailjet && !usingSMTP) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing email configuration",
          message: "Please configure either Mailjet (MAILJET_API_KEY, MAILJET_SECRET_KEY) or SMTP (SMTP_HOST, SMTP_USER, SMTP_PASSWORD) in your .env.local file.",
          configured: envVars,
        },
        { status: 400 }
      );
    }

    // Check required fields
    const missing: string[] = [];
    if (!envVars.SMTP_FROM_EMAIL) missing.push("SMTP_FROM_EMAIL");

    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required environment variables",
          missing,
          provider: usingMailjet ? "Mailjet" : "SMTP",
          message: `Please add the following to your .env.local file: ${missing.join(", ")}`,
          configured: envVars,
        },
        { status: 400 }
      );
    }

    // Try to verify the transporter
    let isValid = false;
    let errorMessage = "";
    
    try {
      isValid = await verifyTransporter();
    } catch (error) {
      errorMessage = error instanceof Error ? error.message : "Unknown error";
    }

    if (!isValid) {
      const provider = usingMailjet ? "Mailjet" : "SMTP";
      return NextResponse.json(
        {
          success: false,
          error: `${provider} connection failed`,
          provider,
          message: usingMailjet
            ? `Could not connect to Mailjet. ${errorMessage || "Please check your MAILJET_API_KEY and MAILJET_SECRET_KEY. Make sure the email in SMTP_FROM_EMAIL is verified in your Mailjet account."}`
            : `Could not connect to SMTP server. ${errorMessage || "Please check your SMTP_HOST, SMTP_PORT, SMTP_USER, and SMTP_PASSWORD."}`,
          errorDetails: errorMessage || undefined,
          configured: envVars,
          tip: usingMailjet 
            ? "Make sure: 1) Your API keys are correct, 2) The email in SMTP_FROM_EMAIL is verified in Mailjet, 3) Your Mailjet account is active"
            : "Check your SMTP server settings and credentials",
        },
        { status: 500 }
      );
    }

    const provider = usingMailjet ? "Mailjet" : "SMTP";
    return NextResponse.json({
      success: true,
      message: `${provider} configuration is valid and connection successful!`,
      provider,
      configured: envVars,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        message: "An error occurred while testing SMTP configuration.",
      },
      { status: 500 }
    );
  }
}

