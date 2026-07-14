import type { Metadata } from "next";
import { Cormorant_Garamond, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Analytics from "./Analytics";

const fontSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fontSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Cellule noire",
  description: "Bibliothèque privée — lecture, réflexion, club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="fr" className={`${fontSans.variable} ${fontSerif.variable}`}>
        <body className="font-sans min-h-dvh bg-background text-foreground">
          <Analytics />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
