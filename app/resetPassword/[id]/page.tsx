"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import Url from "@/lib/Url";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/AuthShell";
import { getAxiosErrorMessage } from "@/lib/getAxiosErrorMessage";

type Inputs = {
    password: string;
    password2: string;
}

const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

const ResetPassword = ({ params }: { params: { id: string } }) => {
    const [erreur, setErreur] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useRouter();
    const id = params.id as string;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.password !== data.password2) {
            setErreur("Les mots de passe ne correspondent pas");
            window.setTimeout(() => setErreur(null), 3000);
            return;
        }

        try {
            const newPassword = await axios.put(Url.resetPassword + "/" + id, {
                password: data.password
            });

            if (newPassword.status === 200) {
                setMessage("Votre mot de passe a été réinitialisé avec succès !");
                window.setTimeout(() => navigate.push("/"), 3000);
            }
        } catch (error: unknown) {
            setErreur(getAxiosErrorMessage(error));
            window.setTimeout(() => setErreur(null), 3000);
        }
    };

    if (message) {
        return (
            <AuthShell title="Mot de passe mis à jour" subtitle={message} showHero={false}>
                <p className="text-center text-sm text-muted-foreground">Redirection vers la connexion…</p>
            </AuthShell>
        );
    }

    return (
        <AuthShell
            title="Nouveau mot de passe"
            subtitle="Choisissez un mot de passe sécurisé pour votre compte."
            showHero={false}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <Input
                        type="password"
                        placeholder="Nouveau mot de passe"
                        autoComplete="new-password"
                        {...register("password", { required: true, pattern: PASSWORD_PATTERN })}
                    />
                    {errors.password?.type === "required" && (
                        <span className="mt-1 block text-center text-sm text-destructive">Mot de passe obligatoire</span>
                    )}
                    {errors.password?.type === "pattern" && (
                        <span className="mt-1 block text-center text-xs text-destructive">
                            8 à 16 caractères, une majuscule, un chiffre et un symbole.
                        </span>
                    )}
                </div>

                <div>
                    <Input
                        type="password"
                        placeholder="Confirmer le mot de passe"
                        autoComplete="new-password"
                        {...register("password2", { required: true })}
                    />
                    {errors.password2?.type === "required" && (
                        <span className="mt-1 block text-center text-sm text-destructive">Confirmation obligatoire</span>
                    )}
                </div>

                {erreur && <p className="text-center text-sm text-destructive">{erreur}</p>}

                <Button type="submit" className="w-full">Enregistrer</Button>
            </form>
            <Link href="/" className="mt-4 block text-center text-sm text-primary hover:underline">
                Retour à la connexion
            </Link>
        </AuthShell>
    );
}

export default ResetPassword
