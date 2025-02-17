import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Analytics from "./Analytics";




export const metadata: Metadata = {
  title: "Cellule noire",
  description: "bibliothèque, lecture, club, réflexion"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <StoreProvider>
      <html lang="fr">
        <body className="flex flex-col max-w-7xl items-center m-auto">
        <Analytics />
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
