# Kerith & Co. Events - Next.js

This is the Next.js version of the Kerith & Co. Events website, converted from the original React Vite project.

## Getting Started

### Installation

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

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

**Note:** For Gmail, you'll need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password. For other email providers, adjust the SMTP_HOST and SMTP_PORT accordingly.

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

To create a production build:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Start Production Server

```bash
npm start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
kerithco-luxe-events-next/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   ├── booking/      # Booking page
│   │   │   └── page.tsx
│   │   ├── not-found.tsx # 404 page
│   │   ├── providers.tsx # Client providers
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/          # Shadcn UI components
│   │   └── ...          # Page components
│   ├── hooks/           # Custom React hooks
│   └── lib/             # Utility functions
├── public/              # Static assets
│   └── assets/         # Images
└── ...
```

## Key Changes from Vite to Next.js

1. **Routing**: Converted from React Router to Next.js App Router
   - Routes are now file-based in the `app` directory
   - `Link` components use Next.js `Link` instead of React Router

2. **Images**: Updated to use Next.js `Image` component
   - Images moved to `public/assets/` directory
   - Using Next.js `Image` for optimized image loading

3. **Environment Variables**: Changed from `import.meta.env` to `process.env.NEXT_PUBLIC_*`
   - All public env vars must be prefixed with `NEXT_PUBLIC_`

4. **Client Components**: Added `"use client"` directive to components using:
   - React hooks (useState, useEffect, etc.)
   - Browser APIs
   - Event handlers

5. **Fonts**: Using Next.js font optimization with `next/font/google`

6. **Metadata**: Using Next.js metadata API for SEO

## Features

- ✨ Luxury event planning website
- 📱 Fully responsive design
- 🎨 Beautiful UI with Tailwind CSS and Shadcn UI
- 📧 EmailJS integration for contact forms
- 🖼️ Image gallery with modal view
- 📄 Multi-step booking form
- 🌙 Dark mode support (via next-themes)

## Tech Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI)
- **Forms**: React Hook Form
- **Email**: EmailJS
- **Icons**: Lucide React

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn UI](https://ui.shadcn.com)

