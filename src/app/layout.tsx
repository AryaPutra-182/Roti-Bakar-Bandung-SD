import type { Metadata } from "next";
import { Outfit, Playball } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://roti-bakar-bandung-sd.vercel.app"),
  title: {
    default: "Roti Bakar Bandung SD | Kreasi Rasa Yang Tak Terlupakan",
    template: "%s | Roti Bakar Bandung SD",
  },
  description:
    "Roti Bakar Bandung SD – roti bakar spesial dengan bahan premium, berbagai pilihan topping lezat. Pesan sekarang via WhatsApp!",
  keywords: [
    "roti bakar bandung",
    "roti bakar SD",
    "roti bakar enak",
    "roti bakar topping",
    "jajanan malang",
    "roti malang",
    "roti bakar murah",
    "pesan roti bakar",
    "roti bakar malang",
    "roti bakar Bandung di malang",
    "roti bakar bandung malang",
    "roti bakar bandung malang enak",
    "roti bakar murah malang",
    "pesan roti bakar bandung malang"
  ],

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://roti-bakar-bandung-sd.vercel.app",
    siteName: "Roti Bakar Bandung SD",
    title: "Roti Bakar Bandung SD | Kreasi Rasa Yang Tak Terlupakan",
    description:
      "Roti bakar spesial dengan bahan premium dan berbagai topping lezat. Pesan sekarang!",
    images: [
      {
        url: "/roti%20bakar%20bandung.jpg",
        width: 1200,
        height: 630,
        alt: "Roti Bakar Bandung SD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roti Bakar Bandung SD",
    description: "Roti bakar spesial dengan bahan premium dan berbagai topping lezat.",
    images: ["/roti%20bakar%20bandung.jpg"],
  },
  verification: {
    google: "ha6ipiM7RhmFbpKzrC4DUhPi3AF-jcD5Lvs7mYMhYlk",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
};

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playball = Playball({
  variable: "--font-playball",
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Roti Bakar Bandung SD",
    description:
      "Roti bakar spesial dengan bahan premium dan berbagai pilihan topping lezat.",
    url: "https://roti-bakar-bandung-sd.vercel.app",
    telephone: "+6281908618783",
    servesCuisine: "Indonesian",
    priceRange: "Rp",
    image: "https://roti-bakar-bandung-sd.vercel.app/roti%20bakar%20bandung.jpg",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Bandung",
      addressRegion: "Jawa Barat",
      addressCountry: "ID",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "08:00",
        closes: "22:00",
      },
    ],
    sameAs: [
      "https://wa.me/+6281908618783",
    ],
  };

  return (
    <html lang="id" className={`${outfit.variable} ${playball.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
