"use client";

import React from "react";
import { User } from "@/lib/Interface/user.interface";

interface WelcomeBannerProps {
  user: User;
}

const WelcomeBanner = ({ user }: WelcomeBannerProps) => {
  if (user.role === "new") {
    const remaining = user.download >= 1 ? 0 : 1;
    const exhausted = remaining === 0;

    return (
      <div
        className={`surface-muted w-full max-w-3xl p-4 text-center sm:p-5 ${
          exhausted ? "border-destructive/30 bg-destructive/10" : "border-primary/30 bg-primary/5"
        }`}
      >
        <p className={`font-serif text-lg ${exhausted ? "text-destructive" : "text-primary"}`}>
          {exhausted ? "Quota mensuel atteint" : "Bienvenue dans la bibliothèque"}
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          Compte lecteur débutant :{" "}
          <strong className="text-foreground">
            {remaining}/1 téléchargement restant ce mois-ci
          </strong>
          .
          {exhausted
            ? " Revenez le mois prochain pour un nouvel ouvrage."
            : " Choisissez un livre dans la sélection ci-dessous."}
        </p>
      </div>
    );
  }

  return (
    <div className="surface-muted w-full max-w-3xl p-4 text-center sm:p-5">
      <p className="font-serif text-lg text-foreground">Par où commencer ?</p>
      <p className="mt-2 text-sm text-muted-foreground">
        Découvrez la sélection du moment, les nouveautés ou filtrez par catégorie.
      </p>
    </div>
  );
};

export default WelcomeBanner;
