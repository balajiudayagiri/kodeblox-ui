import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./Header";
import { cn } from "kodebloxui/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "kodebloxui/components/ui/toaster";
import Footer from "./Footer";
import { NextThemesProviders } from "kodebloxui/Providers/theme-provider";
import { UserProvider } from "kodebloxui/Providers/user-provider";
import { ENV } from "kodebloxui/utils";

const montserrat = Montserrat({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl = ENV.SITE_URL || "http://localhost:3000";

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "KodeBloxUI - The Ultimate UI Library",
      template: "%s | KodeBloxUI",
    },
    description:
      "Discover the best user-created UI elements including animated components, buttons, cards, loaders, and more with KodeBloxUI.",
    openGraph: {
      type: "website",
      url: siteUrl,
      title: "KodeBloxUI - The Ultimate UI Library",
      description:
        "Discover the best user-created UI elements including animated components, buttons, cards, loaders, and more with KodeBloxUI.",
      siteName: "KodeBloxUI",
      images: [
        {
          url: `${siteUrl}/HomePage.png`,
          alt: "KodeBloxUI - The Ultimate UI Library",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@KodeBloxUI",
      creator: "@KodeBloxUI",
      title: "KodeBloxUI - The Ultimate UI Library",
      description:
        "Discover the best user-created UI elements including animated components, buttons, cards, loaders, and more with KodeBloxUI.",
      images: [
        {
          url: `${siteUrl}/HomePage.png`,
          alt: "KodeBloxUI - The Ultimate UI Library",
        },
      ],
    },
  };
}

export default function RootLayout({
  children,
  Modal,
}: Readonly<{
  children: React.ReactNode;
  Modal?: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" type="image/x-icon" />
        <link
          rel="icon"
          href="/favicon-16x16.png"
          sizes="16x16"
          type="image/png"
        />
        <link
          rel="icon"
          href="/favicon-32x32.png"
          sizes="32x32"
          type="image/png"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon.png"
          sizes="180x180"
          type="image/png"
        />
        <link
          rel="icon"
          href="/android-chrome-192x192.png"
          sizes="192x192"
          type="image/png"
        />
        <link
          rel="icon"
          href="/android-chrome-512x512.png"
          sizes="512x512"
          type="image/png"
        />
      </head>
      <body className={cn(montserrat.className, "h-dvh")}>
        <SpeedInsights />
        <NextThemesProviders>
          <UserProvider>
            <Header />
            {Modal}
            {children}
            <Footer />
          </UserProvider>
        </NextThemesProviders>
        <Toaster />
      </body>
    </html>
  );
}
