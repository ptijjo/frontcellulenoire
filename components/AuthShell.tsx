import Image from "next/image";
import Link from "next/link";
import { ReactNode } from "react";

interface AuthShellProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  showHero?: boolean;
}

export default function AuthShell({ children, title, subtitle, showHero = true }: AuthShellProps) {
  return (
    <main className="page-shell">
      <div className="page-content flex min-h-dvh flex-col lg:flex-row lg:items-center lg:gap-10 py-8 lg:py-12">
        {showHero && (
          <aside className="hidden w-full lg:flex lg:w-1/2 flex-col justify-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/40">
              <Image
                src="/images/homepage.jpg"
                alt="Bibliothèque Cellule noire"
                width={480}
                height={600}
                priority
                className="h-auto w-full object-cover opacity-90"
                sizes="(max-width: 1024px) 0vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-0 p-6">
                <p className="font-serif text-2xl text-foreground">Cellule noire</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Bibliothèque privée — histoire, philosophie, spiritualité.
                </p>
              </div>
            </div>
          </aside>
        )}

        <div className="flex w-full flex-col items-center lg:w-1/2">
          <Link href="/" className="mb-6 block shrink-0">
            <Image
              src="/logos/logo.jpeg"
              alt="Logo Cellule noire"
              width={80}
              height={80}
              priority
              className="size-16 rounded-full border-2 border-primary/30 object-cover sm:size-20"
            />
          </Link>

          {(title || subtitle) && (
            <div className="mb-6 text-center">
              {title && <h1 className="font-serif text-2xl sm:text-3xl">{title}</h1>}
              {subtitle && <p className="mt-2 text-sm text-muted-foreground max-w-sm">{subtitle}</p>}
            </div>
          )}

          <div className="surface-card w-full max-w-md p-6 sm:p-8">{children}</div>
        </div>
      </div>

      <footer className="w-full max-w-7xl py-6 text-center text-xs text-muted-foreground">
        <p>© {new Date().getFullYear()} Cellule noire — Tous droits réservés</p>
      </footer>
    </main>
  );
}
