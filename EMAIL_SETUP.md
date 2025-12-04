# Email Setup with Nodemailer

This project uses Nodemailer to send emails from the server-side API routes. You can use either Mailjet (recommended) or SMTP.

## Configuration

### Option 1: Mailjet (Recommended)

Mailjet is a transactional email service that's easy to set up and reliable.

1. Sign up for a free account at [Mailjet](https://www.mailjet.com/)
2. Get your API Key and Secret Key from the Mailjet dashboard
3. Add to your `.env.local` file:

```env
# Mailjet Configuration
MAILJET_API_KEY=your_api_key_here
MAILJET_SECRET_KEY=your_secret_key_here
SMTP_FROM_EMAIL=your_verified_email@example.com
SMTP_FROM_NAME=Kerith & Co. Events
SMTP_TO_EMAIL=recipient@example.com
```

**Note:** The email in `SMTP_FROM_EMAIL` must be verified in your Mailjet account.

### Option 2: SMTP Configuration

Create a `.env.local` file in the root directory with the following SMTP configuration:

```env
# SMTP Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password
SMTP_FROM_EMAIL=your_email@gmail.com
SMTP_FROM_NAME=Kerith & Co. Events
SMTP_TO_EMAIL=recipient@example.com
```

### Gmail Setup

If you're using Gmail:

1. Enable 2-Step Verification on your Google Account
2. Generate an [App Password](https://support.google.com/accounts/answer/185833)
3. Use the App Password (not your regular password) in `SMTP_PASSWORD`

### Other Email Providers

#### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
```

#### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
```

#### Custom SMTP Server
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587  # or 465 for SSL
```

## API Routes

### POST `/api/email/appointment`

Sends a consultation request email.

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "123-456-7890",
  "eventType": "Wedding",
  "eventDate": "2024-12-25",
  "guestCount": "100",
  "budget": "25000-50000",
  "venue": "Grand Ballroom",
  "details": "Looking for a luxury wedding...",
  "howHeard": "google"
}
```

### POST `/api/email/contact`

Sends a contact form submission email.

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "123-456-7890",
  "message": "I'm interested in your services..."
}
```

## Usage

The `useEmail` hook handles all email sending:

```typescript
import { useEmail } from "@/hooks/use-email";

const { sendAppointment, sendContact, isLoading, error } = useEmail();

// Send appointment email
await sendAppointment({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  eventType: "Wedding",
  details: "Event details...",
});

// Send contact email
await sendContact({
  name: "Jane Doe",
  email: "jane@example.com",
  message: "Message content...",
});
```

## Testing

### Test Configuration Endpoint

You can test your email configuration by visiting:
```
http://localhost:3000/api/email/test-config
```

This endpoint will:
- Check if all required environment variables are set
- Verify the connection to your email provider
- Show which provider you're using (Mailjet or SMTP)

### Development Testing

For development, you can use a service like [Mailtrap](https://mailtrap.io/):

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_USER=your_mailtrap_username
SMTP_PASSWORD=your_mailtrap_password
```

## Troubleshooting

### Common Issues

1. **"Invalid login" error**
   - Make sure you're using an App Password for Gmail
   - Verify your SMTP credentials are correct

2. **Connection timeout**
   - Check your firewall settings
   - Verify SMTP_HOST and SMTP_PORT are correct
   - Some networks block SMTP ports

3. **Emails not received**
   - Check spam/junk folder
   - Verify SMTP_TO_EMAIL is correct
   - Check server logs for errors

### Debug Mode

To see detailed error messages, check the server console logs when running `npm run dev`.

