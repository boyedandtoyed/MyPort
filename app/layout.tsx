import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://binodtiwari.com"),
  title: "Binod Tiwari | AI/ML Portfolio",
  description:
    "3D interactive portfolio for Binod Tiwari, a Computer Science student building AI/ML systems.",
  openGraph: {
    title: "Binod Tiwari | AI/ML Portfolio",
    description: "A solar-system portfolio where every planet is an AI/ML project.",
    url: "https://binodtiwari.com",
    siteName: "binodtiwari.com",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body>{children}</body>
    </html>
  );
}
