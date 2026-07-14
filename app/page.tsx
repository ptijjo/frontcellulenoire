import LoginPage from "./components/LoginPage";
import Link from "next/link";
import AuthShell from "@/components/AuthShell";

export default function Home() {
  return (
    <AuthShell
      title="Bienvenue"
      subtitle="Connectez-vous pour accéder à la bibliothèque privée."
    >
      <LoginPage />
      <Link
        href="/forgetPassword"
        className="mt-4 block text-center text-sm text-primary hover:underline"
      >
        Mot de passe oublié ?
      </Link>
    </AuthShell>
  );
}
