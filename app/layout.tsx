import type { Metadata } from "next";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Script from "next/script";
import { useEffect } from "react";
import { usePathname } from "next/navigation";



export const metadata: Metadata = {
  title: "Cellule noire",
  description: "bibliothèque, lecture, club, réflexion"
};

const GA_MEASUREMENT_ID = "G-6PLXY6GSBW"; // Remplacez par votre ID de mesure

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return (
    <StoreProvider>
      <html lang="fr">
        <head>
          {/* Ajout des scripts Google Analytics */}
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </head>
        <body className="flex flex-col max-w-7xl items-center m-auto">
          {children}
        </body>
      </html>
    </StoreProvider>
  );
}
