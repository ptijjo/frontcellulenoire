import LoginPage from "./components/LoginPage";
import Link from "next/link";
import AuthShell from "@/components/AuthShell";

export default function Home() {
  return (
    <AuthShell
      title="Connexion"
      subtitle="La bibliothèque est réservée aux membres."
    >
      <LoginPage />
      <Link
        href="/forgetPassword"
        className="mt-5 block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
      >
        Mot de passe oublié ?
      </Link>
    </AuthShell>
  );
}
