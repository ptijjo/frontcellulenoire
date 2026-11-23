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
    <main className={showHero ? "min-h-dvh lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]" : "min-h-dvh"}>
      {showHero && (
        <aside className="relative hidden min-h-dvh lg:block">
          <Image
            src="/images/homepage.jpg"
            alt=""
            fill
            priority
            sizes="52vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-black/25" />
          <div className="absolute bottom-0 max-w-md p-10">
            <p className="font-serif text-4xl leading-none text-white">Cellule noire</p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">
              Une bibliothèque privée. Histoire, philosophie, spiritualité.
            </p>
          </div>
        </aside>
      )}

      <section className="flex min-h-dvh flex-col px-6 py-6 sm:px-10">
        <Link href="/" className="inline-flex w-fit items-center gap-3">
          <Image
            src="/logos/logo.jpeg"
            alt=""
            width={44}
            height={44}
            priority
            className="size-11 rounded-full object-cover"
          />
          <span className={showHero ? "font-serif text-lg lg:sr-only" : "font-serif text-lg"}>Cellule noire</span>
        </Link>

        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-6">
          {(title || subtitle) && (
            <div className="mb-8">
              {title && <h1 className="font-serif text-3xl leading-tight">{title}</h1>}
              {subtitle && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>

        <footer className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Cellule noire
        </footer>
      </section>
    </main>
  );
}
