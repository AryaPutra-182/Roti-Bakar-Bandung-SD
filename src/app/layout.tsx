import type { Metadata } from "next";
import { Outfit, Playball } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://roti-bakar-bandung-sd.vercel.app"),
  title: "Roti Bakar Bandung SD",
  description: "Kreasi Rasa Yang Tak Pernah Terlupakan",
  verification: {
    google: "ha6ipiM7RhmFbpKzrC4DUhPi3AF-jcD5Lvs7mYMhYlk",
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
  return (
    <html lang="id" className={`${outfit.variable} ${playball.variable} h-full antialiased`}>
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
