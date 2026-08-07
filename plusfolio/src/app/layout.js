import "./globals.css";
import Script from "next/script";
import { AuthProvider } from "@/contexts/AuthContext";

const BASE_URL =
  process.env.NEXT_PUBLIC_CLIENT_URL || "https://plusfolio.netlify.app";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#5B3DF5" },
    { media: "(prefers-color-scheme: dark)", color: "#5B3DF5" },
  ],
};

export const metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default: "PlusFolio | Free AI Resume Builder, Biodata Maker & Career Tools",
    template: "%s | PlusFolio",
  },

  description:
    "Create ATS-friendly resumes, professional biodatas, cover letters, portfolios and career documents with AI. Free, privacy-first and easy to use. Powered by INTERESTING Plus.",

  keywords: [
    "PlusFolio",
    "AI Resume Builder",
    "Resume Builder",
    "Resume Maker",
    "Resume Generator",
    "ATS Resume",
    "ATS Checker",
    "Biodata Maker",
    "Marriage Biodata",
    "Portfolio Builder",
    "Cover Letter Generator",
    "Career Tools",
    "INTERESTING Plus",
    "Jatin Poriya",
  ],

  authors: [
    {
      name: "INTERESTING Plus",
    },
  ],

  creator: "INTERESTING Plus",

  publisher: "INTERESTING Plus",

  applicationName: "PlusFolio",

  manifest: "/manifest.json",

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    type: "website",
    siteName: "PlusFolio",
    url: BASE_URL,
    title: "PlusFolio | Free AI Resume Builder & Career Tools",
    description:
      "Build ATS-friendly resumes, biodatas, cover letters and portfolios with AI. Fast, free, privacy-first and beautifully designed.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PlusFolio AI Resume Builder Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "PlusFolio | Free AI Resume Builder",
    description:
      "Create professional ATS-friendly resumes, biodatas and career documents with AI.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo192.png",
  },

  formatDetection: {
    telephone: false,
  },

  appleWebApp: {
    capable: true,
    title: "PlusFolio",
    statusBarStyle: "black-translucent",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {/* Google Analytics */}

        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-PHMS5LB36B"
          strategy="afterInteractive"
        />

        <Script id="google-analytics" strategy="afterInteractive">
          {`
              window.dataLayer = window.dataLayer || [];

              function gtag(){
                dataLayer.push(arguments);
              }

              gtag('js', new Date());

              gtag('config','G-PHMS5LB36B');
            `}
        </Script>

        {/* Structured Data */}

        <Script
          id="software-schema"
          type="application/ld+json"
          // strategy="afterInteractive"
        >
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "PlusFolio",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            creator: {
              "@type": "Organization",
              name: "INTERESTING Plus",
            },
          })}
        </Script>

        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
