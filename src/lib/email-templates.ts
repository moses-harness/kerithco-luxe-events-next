export interface AppointmentEmailData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  eventType: string;
  eventDate?: string;
  guestCount?: string;
  budget?: string;
  venue?: string;
  details: string;
  howHeard?: string;
}

export interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

/**
 * Generate HTML email template for appointment/consultation requests
 */
export function generateAppointmentEmail(data: AppointmentEmailData): string {
  const fullName = `${data.firstName} ${data.lastName}`;
  const eventDate = data.eventDate
    ? new Date(data.eventDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Not specified";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Consultation Request - Kerith & Co.</title>
  <style>
    body {
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background-color: #faf9f7;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e8e5e0;
    }
    .header {
      background: linear-gradient(135deg, #d4a574 0%, #c8965f 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      font-family: 'Playfair Display', Georgia, serif;
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      color: #1a1a1a;
      margin-bottom: 30px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20px;
      color: #c8965f;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0ebe5;
    }
    .info-row {
      margin-bottom: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #f5f3f0;
    }
    .info-label {
      font-weight: 600;
      color: #4a4a4a;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .info-value {
      color: #1a1a1a;
      font-size: 15px;
    }
    .details-box {
      background-color: #faf9f7;
      padding: 20px;
      border-left: 3px solid #c8965f;
      margin-top: 10px;
      border-radius: 4px;
    }
    .footer {
      background-color: #faf9f7;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e8e5e0;
    }
    .footer p {
      margin: 5px 0;
      color: #6b6b6b;
      font-size: 13px;
    }
    .footer .brand {
      font-family: 'Playfair Display', Georgia, serif;
      color: #c8965f;
      font-size: 18px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Consultation Request</h1>
    </div>
    <div class="content">
      <div class="greeting">
        Hello Kerith & Co. Team,
      </div>
      
      <div class="section">
        <div class="section-title">Client Information</div>
        <div class="info-row">
          <div class="info-label">Full Name</div>
          <div class="info-value">${fullName}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email Address</div>
          <div class="info-value">${data.email}</div>
        </div>
        ${data.phone ? `
        <div class="info-row">
          <div class="info-label">Phone Number</div>
          <div class="info-value">${data.phone}</div>
        </div>
        ` : ''}
      </div>

      <div class="section">
        <div class="section-title">Event Details</div>
        <div class="info-row">
          <div class="info-label">Event Type</div>
          <div class="info-value">${data.eventType}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Preferred Event Date</div>
          <div class="info-value">${eventDate}</div>
        </div>
        ${data.guestCount ? `
        <div class="info-row">
          <div class="info-label">Estimated Guest Count</div>
          <div class="info-value">${data.guestCount} guests</div>
        </div>
        ` : ''}
        ${data.budget ? `
        <div class="info-row">
          <div class="info-label">Budget Range</div>
          <div class="info-value">$${data.budget.replace('-', ' - $')}</div>
        </div>
        ` : ''}
        ${data.venue ? `
        <div class="info-row">
          <div class="info-label">Venue</div>
          <div class="info-value">${data.venue}</div>
        </div>
        ` : ''}
      </div>

      ${data.details ? `
      <div class="section">
        <div class="section-title">Event Vision & Details</div>
        <div class="details-box">
          ${data.details.replace(/\n/g, '<br>')}
        </div>
      </div>
      ` : ''}

      ${data.howHeard ? `
      <div class="section">
        <div class="section-title">How They Heard About Us</div>
        <div class="info-value">${data.howHeard.charAt(0).toUpperCase() + data.howHeard.slice(1)}</div>
      </div>
      ` : ''}
    </div>
    <div class="footer">
      <div class="brand">Kerith & Co. Events</div>
      <p>This is an automated notification from your website.</p>
      <p>Please respond to ${data.email} within 24-48 hours.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generate HTML email template for contact form submissions
 */
export function generateContactEmail(data: ContactEmailData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission - Kerith & Co.</title>
  <style>
    body {
      font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #1a1a1a;
      background-color: #faf9f7;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border: 1px solid #e8e5e0;
    }
    .header {
      background: linear-gradient(135deg, #d4a574 0%, #c8965f 100%);
      padding: 40px 30px;
      text-align: center;
    }
    .header h1 {
      font-family: 'Playfair Display', Georgia, serif;
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }
    .content {
      padding: 40px 30px;
    }
    .greeting {
      font-size: 18px;
      color: #1a1a1a;
      margin-bottom: 30px;
    }
    .section {
      margin-bottom: 30px;
    }
    .section-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20px;
      color: #c8965f;
      margin-bottom: 15px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0ebe5;
    }
    .info-row {
      margin-bottom: 12px;
      padding: 12px 0;
      border-bottom: 1px solid #f5f3f0;
    }
    .info-label {
      font-weight: 600;
      color: #4a4a4a;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .info-value {
      color: #1a1a1a;
      font-size: 15px;
    }
    .message-box {
      background-color: #faf9f7;
      padding: 20px;
      border-left: 3px solid #c8965f;
      margin-top: 10px;
      border-radius: 4px;
      white-space: pre-wrap;
    }
    .footer {
      background-color: #faf9f7;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e8e5e0;
    }
    .footer p {
      margin: 5px 0;
      color: #6b6b6b;
      font-size: 13px;
    }
    .footer .brand {
      font-family: 'Playfair Display', Georgia, serif;
      color: #c8965f;
      font-size: 18px;
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="greeting">
        Hello Kerith & Co. Team,
      </div>
      
      <div class="section">
        <div class="section-title">Contact Information</div>
        <div class="info-row">
          <div class="info-label">Name</div>
          <div class="info-value">${data.name}</div>
        </div>
        <div class="info-row">
          <div class="info-label">Email Address</div>
          <div class="info-value">${data.email}</div>
        </div>
        ${data.phone ? `
        <div class="info-row">
          <div class="info-label">Phone Number</div>
          <div class="info-value">${data.phone}</div>
        </div>
        ` : ''}
      </div>

      <div class="section">
        <div class="section-title">Message</div>
        <div class="message-box">${data.message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      <div class="brand">Kerith & Co. Events</div>
      <p>This is an automated notification from your website.</p>
      <p>Please respond to ${data.email} as soon as possible.</p>
    </div>
  </div>
</body>
</html>
  `.trim();
}

