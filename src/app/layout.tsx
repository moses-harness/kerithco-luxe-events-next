import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Kerith & Co. Events | Luxury Event Planning",
  description:
    "Kerith & Co. Events specializes in luxury event planning for weddings, baby showers, corporate events, and more. Creating unforgettable moments through intentional design and seamless coordination.",
  authors: [{ name: "Kerith & Co. Events" }],
  keywords: [
    "event planning",
    "luxury events",
    "wedding planner",
    "baby shower",
    "corporate events",
    "event coordination",
  ],
  openGraph: {
    title: "Kerith & Co. Events | Luxury Event Planning",
    description:
      "Creating unforgettable moments through intentional design and seamless coordination.",
    type: "website",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kerithandco",
    images: ["https://lovable.dev/opengraph-image-p98pqg.png"],
  },
  alternates: {
    canonical: "https://kerithandco.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.variable} ${playfairDisplay.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

