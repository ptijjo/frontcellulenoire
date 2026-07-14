"use client";

import React from "react";
import { User } from "@/lib/Interface/user.interface";

interface WelcomeBannerProps {
    user: User;
}

const WelcomeBanner = ({ user }: WelcomeBannerProps) => {
    if (user.role === "new" && user.download === 0) {
        return (
            <div className="surface-muted w-full max-w-3xl border-primary/30 bg-primary/5 p-4 text-center sm:p-5">
                <p className="font-serif text-lg text-primary">Bienvenue dans la bibliothèque</p>
                <p className="mt-2 text-sm text-muted-foreground">
                    En tant que nouveau lecteur, vous pouvez télécharger <strong className="text-foreground">1 livre par mois</strong>.
                    Commencez par la sélection ci-dessous.
                </p>
            </div>
        );
    }

    if (user.role === "new" && user.download >= 1) {
        return (
            <div className="surface-muted w-full max-w-3xl border-destructive/30 bg-destructive/10 p-4 text-center sm:p-5">
                <p className="font-serif text-lg text-destructive">Quota mensuel atteint</p>
                <p className="mt-2 text-sm text-muted-foreground">
                    Vous avez déjà téléchargé votre livre ce mois-ci. Revenez le mois prochain.
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
