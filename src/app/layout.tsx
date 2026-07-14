import type { Metadata } from "next";
import { Fraunces, Inter, Space_Mono, Dancing_Script } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-space-mono",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-cursive",
});

export const metadata: Metadata = {
  title: "Loop \u2014 Rooftop Gastropub & Nightclub | Ranchi",
  description:
    "14,000 sq/ft rooftop gastropub & nightclub on the 8th floor of Eastern Mall, Ranchi. Multi-cuisine kitchen, full bar, live music, DJ nights. Open 12 PM\u201312 AM daily.",
  keywords: [
    "rooftop bar Ranchi",
    "gastropub Ranchi",
    "nightclub Ranchi",
    "Loop Ranchi",
    "rooftop restaurant Ranchi",
    "best bar Ranchi",
    "live music Ranchi",
    "DJ night Ranchi",
  ],
  openGraph: {
    title: "Loop \u2014 Rooftop Gastropub & Nightclub | Ranchi",
    description:
      "Dinner. Rooftop. Nightclub. One floor, no compromise. 14,000 sq/ft above Ranchi.",
    url: "https://loopranchi.com",
    siteName: "Loop Ranchi",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Loop \u2014 Rooftop Gastropub & Nightclub | Ranchi",
    description:
      "Dinner. Rooftop. Nightclub. One floor, no compromise. 14,000 sq/ft above Ranchi.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Loop",
  description:
    "14,000 sq/ft rooftop gastropub & nightclub. Multi-cuisine kitchen, full bar, live music, DJ nights.",
  url: "https://loopranchi.com",
  telephone: "+919876543210",
  email: "loopranchi@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "8th Floor (Rooftop), Eastern Mall, Pantaloons Dangratoli Chowk, Lalpur",
    addressLocality: "Ranchi",
    addressRegion: "Jharkhand",
    postalCode: "834001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 23.3441,
    longitude: 85.3096,
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    opens: "12:00",
    closes: "00:00",
  },
  priceRange: "\u20B9400\u20131,600",
  servesCuisine: ["American", "Asian", "Chinese", "Indian", "Thai"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.3",
    reviewCount: "1355",
    bestRating: "5",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable} ${dancingScript.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-void text-text-primary font-sans antialiased">
        {/* Global grain texture overlay */}
        <div className="grain-overlay" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
