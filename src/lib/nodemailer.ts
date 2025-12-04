import nodemailer from "nodemailer";

// Mailjet API Configuration (using SMTP)
// Mailjet uses SMTP with API Key as username and Secret Key as password
const MAILJET_API_KEY = process.env.MAILJET_API_KEY || "";
const MAILJET_SECRET_KEY = process.env.MAILJET_SECRET_KEY || "";

// Determine if we're using Mailjet
const isUsingMailjet = !!(MAILJET_API_KEY && MAILJET_SECRET_KEY);

// Configuration - prioritize Mailjet if keys are present
const SMTP_HOST = isUsingMailjet 
  ? "in-v3.mailjet.com" 
  : (process.env.SMTP_HOST || "");
const SMTP_PORT = isUsingMailjet 
  ? 587 
  : parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_USER = isUsingMailjet 
  ? MAILJET_API_KEY 
  : (process.env.SMTP_USER || "");
const SMTP_PASSWORD = isUsingMailjet 
  ? MAILJET_SECRET_KEY 
  : (process.env.SMTP_PASSWORD || "");
const SMTP_FROM_EMAIL = process.env.SMTP_FROM_EMAIL || "";
const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME || "Kerith & Co. Events";
const SMTP_TO_EMAIL = process.env.SMTP_TO_EMAIL || "";

// Validate required configuration
function validateSMTPConfig(): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  // Check if using Mailjet
  if (MAILJET_API_KEY && MAILJET_SECRET_KEY) {
    if (!SMTP_FROM_EMAIL) missing.push("SMTP_FROM_EMAIL");
    return {
      valid: missing.length === 0,
      missing,
    };
  }
  
  // Check standard SMTP configuration
  if (!SMTP_HOST) missing.push("SMTP_HOST");
  if (!SMTP_USER) missing.push("SMTP_USER or MAILJET_API_KEY");
  if (!SMTP_PASSWORD) missing.push("SMTP_PASSWORD or MAILJET_SECRET_KEY");
  if (!SMTP_FROM_EMAIL) missing.push("SMTP_FROM_EMAIL");
  
  return {
    valid: missing.length === 0,
    missing,
  };
}

// Create reusable transporter
// Mailjet uses SMTP with API Key as username and Secret Key as password
const transporterConfig: nodemailer.TransportOptions = {
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true for 465, false for other ports
};

// Only add auth if credentials are provided
if (SMTP_USER && SMTP_PASSWORD) {
  transporterConfig.auth = {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  };
}

export const transporter = nodemailer.createTransport(transporterConfig);

// Verify transporter configuration
export async function verifyTransporter(): Promise<boolean> {
  try {
    await transporter.verify();
    return true;
  } catch (error) {
    const provider = isUsingMailjet ? "Mailjet" : "SMTP";
    console.error(`${provider} configuration error:`, error);
    if (error instanceof Error) {
      console.error(`Error details: ${error.message}`);
      if (isUsingMailjet) {
        console.error("Mailjet config:", {
          host: SMTP_HOST,
          port: SMTP_PORT,
          user: SMTP_USER ? `${SMTP_USER.substring(0, 4)}...` : "missing",
          hasPassword: !!SMTP_PASSWORD,
        });
      }
    }
    return false;
  }
}

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  fromName?: string; // Name of the person sending the email (submitter)
}

export async function sendEmail(options: EmailOptions) {
  try {
    // Validate SMTP configuration before attempting to send
    const configCheck = validateSMTPConfig();
    if (!configCheck.valid) {
      const errorMessage = `SMTP configuration is incomplete. Missing: ${configCheck.missing.join(", ")}. Please check your .env.local file.`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    // Use submitter's name if provided, otherwise use default from env
    const fromName = options.fromName || SMTP_FROM_NAME;
    
    if (!SMTP_FROM_EMAIL) {
      throw new Error("SMTP_FROM_EMAIL is not configured");
    }

    const mailOptions = {
      from: `"${fromName}" <${SMTP_FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      replyTo: options.replyTo || SMTP_FROM_EMAIL,
    };

    const info = await transporter.sendMail(mailOptions);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error) {
    console.error("Error sending email:", error);
    
    // Provide user-friendly error messages
    if (error instanceof Error) {
      const provider = isUsingMailjet ? "Mailjet" : "SMTP";
      
      if (error.message.includes("Missing credentials")) {
        const keyNames = isUsingMailjet 
          ? "MAILJET_API_KEY and MAILJET_SECRET_KEY" 
          : "SMTP_USER and SMTP_PASSWORD";
        throw new Error(`${provider} authentication failed. Please check your ${keyNames} in .env.local`);
      }
      if (error.message.includes("Invalid login") || error.message.includes("authentication failed")) {
        throw new Error(`${provider} login failed. Please verify your API key and secret key are correct. Make sure the email in SMTP_FROM_EMAIL is verified in your Mailjet account.`);
      }
      if (error.message.includes("ECONNREFUSED") || error.message.includes("ETIMEDOUT")) {
        const hostInfo = isUsingMailjet 
          ? "Mailjet server (in-v3.mailjet.com)" 
          : `SMTP server (${SMTP_HOST})`;
        throw new Error(`Could not connect to ${hostInfo}. Please check your network connection and firewall settings.`);
      }
      
      // Log the actual error for debugging
      console.error(`Full error: ${error.message}`);
      if (error.stack) {
        console.error(`Stack trace: ${error.stack}`);
      }
    }
    
    throw error;
  }
}

export function getDefaultRecipient(): string {
  return SMTP_TO_EMAIL || SMTP_FROM_EMAIL;
}

