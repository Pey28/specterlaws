import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
} from "@/lib/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} – Tu Defensa Legal en Costa Rica`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  alternates: {
    canonical: SITE_URL,
    languages: { "es-CR": SITE_URL },
  },
  openGraph: {
    type: "website",
    locale: "es_CR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} – Tu Defensa Legal en Costa Rica`,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: "/opengraph-image.png", width: 1200, height: 630, alt: "Specterlaws – Asistente Legal IA Costa Rica" }],
  },
  icons: {
    icon: "/icon.png",
    apple: "/apple-icon.png",
    shortcut: "/icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} – Tu Defensa Legal en Costa Rica`,
    description: DEFAULT_DESCRIPTION,
    images: ["/opengraph-image.png"],
    creator: "@specterlaws",
    site: "@specterlaws",
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION ?? "PENDIENTE",
  },
  category: "legal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es-CR"
      className={`${geistSans.variable} ${geistMono.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
