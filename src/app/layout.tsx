import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { Providers } from "@/components/Providers";
import { ADSENSE_PUB_ID } from "@/lib/ad-config";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const SITE_URL = process.env.AUTH_URL ?? "https://main.d331chu91ig1xv.amplifyapp.com";

export const metadata: Metadata = {
  title: {
    default: "AI Music Cloud - AI生成音楽の共有プラットフォーム",
    template: "%s | AI Music Cloud",
  },
  description:
    "Suno・Udio等で生成したAI音楽を投稿・共有・発見できるプラットフォーム。ジャンル別にブラウズ、試聴、いいね。あなたのAI音楽を世界に届けよう。",
  keywords: [
    "AI音楽", "AI Music", "Suno", "Udio", "AI生成音楽", "音楽共有",
    "AI Music Generator", "Music Sharing Platform", "EDM", "Lo-Fi", "AI作曲",
  ],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: SITE_URL,
    siteName: "AI Music Cloud",
    title: "AI Music Cloud - AI生成音楽の共有プラットフォーム",
    description: "Suno・Udio等で生成したAI音楽を投稿・共有・発見できるプラットフォーム。",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Music Cloud",
    description: "AI生成音楽を投稿・共有・発見できるプラットフォーム",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "AI Music Cloud",
    url: SITE_URL,
    description: "AI生成音楽のキュレーション・共有プラットフォーム",
    applicationCategory: "MusicApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "JPY" },
  };

  return (
    <html lang="ja" data-theme="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
