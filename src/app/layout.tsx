import type { Metadata } from "next";
import { Outfit, Playball } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const playball = Playball({
  variable: "--font-playball",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Roti Bakar Bandung SD",
  description: "Kreasi Rasa Yang Tak Pernah Terlupakan",
};

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
