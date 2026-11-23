"use client";

import React from "react";
import { User } from "@/lib/Interface/user.interface";

interface WelcomeBannerProps {
  user: User;
}

const WelcomeBanner = ({ user }: WelcomeBannerProps) => {
  if (user.role !== "new") return null;

  const remaining = user.download >= 1 ? 0 : 1;
  const exhausted = remaining === 0;

  return (
    <p
      className={`max-w-xl text-sm leading-relaxed ${
        exhausted ? "text-destructive" : "text-muted-foreground"
      }`}
    >
      {exhausted
        ? "Vous avez utilisé votre téléchargement de ce mois. Le prochain sera disponible le mois prochain."
        : "Votre compte peut télécharger un livre ce mois-ci. Choisissez-le dans la bibliothèque."}
    </p>
  );
};

export default WelcomeBanner;
