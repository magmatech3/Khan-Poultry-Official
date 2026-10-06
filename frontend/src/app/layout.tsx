import type { Metadata } from "next";
import { Bricolage_Grotesque, Work_Sans, Fraunces } from "next/font/google";
import { withBasePath } from "@/lib/base-path";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const body = Work_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const displaySerif = Fraunces({
  variable: "--font-display-serif",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Khan's Poultry & Meats Ltd | Fresh Halal Poultry, Meat & Seafood",
  description:
    "Halal-certified poultry, meat and seafood. 7 locations across Trinidad, wholesale & retail since 1990. Quality you can taste.",
  keywords: [
    "poultry",
    "meat",
    "seafood",
    "halal",
    "Trinidad",
    "Marabella",
    "fresh chicken",
    "wholesale meat",
  ],
  icons: {
    icon: withBasePath("/images/KHAN'S%20LOGO.png"),
  },
  openGraph: {
    title: "Khan's Poultry & Meats Ltd",
    description:
      "Fresh halal poultry, meat & seafood. 7 locations across Trinidad since 1990.",
    type: "website",
    locale: "en_TT",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${displaySerif.variable}`}>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}