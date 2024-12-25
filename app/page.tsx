import LoginPage from "./components/LoginPage";
import Separation from "./components/Separation";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col max-h-dvh items-center justify-center w-full max-w-7xl m-auto bg-white">
      <div className="flex flex-grow p-3.5 items-center">
        <aside className="hidden md:flex w-1/2 h-1/2 md:rounded-xl md:overflow-hidden">
          <Image src="/images/homepage.jpg" alt="logo_accueil" width={400} height={400} priority className="w-auto h-auto" />
        </aside>
        <div className=" flex flex-col gap-y-3.5 items-center justify-between">
          <Card className="border-none md:rounded-none md:shadow-none flex flex-col justify-center items-center">
            <Image src="/logos/logo.jpeg" alt="logo" width={600} height={600} priority className="w-2/3 mb-3.5" />
            <div className="flex flex-col mt-3.5 w-full">
              <LoginPage />
              <Separation />
              <Link href="/forgetPassword" className="flex text-center m-0 justify-center w-full lg:w-[30%] mb-3.5 mx-auto hover:text-blue-500">Mot de passe oublié ?</Link>
            </div>
          </Card>
        </div>
      </div>
      <footer className="flex flex-wrap gap-5 lg:gap-x-3.5 text-xs mt-3.5 items-center justify-center">
        <Link href="#">Meta</Link>
        <Link href="#">A propos</Link>
        <Link href="#">Blog</Link>
        <Link href="#">Emploi</Link>
        <Link href="#">Aide</Link>
        <Link href="#">API</Link>
        <Link href="#">Confidentialité</Link>
        <Link href="#">Paramètres des cookies</Link>
        <Link href="#">Conditions</Link>
        <Link href="#">Lieux</Link>
        <Link href="#">Threads</Link>
        <Link href="#">Importation des contacts et non-utilisateurs</Link>
        <Link href="#">Meta Verified</Link>
      </footer>
    </main>
  );
}