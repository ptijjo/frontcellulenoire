"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import apiClient from "@/lib/apiClient";
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
            const newPassword = await apiClient.put(Url.resetPassword + "/" + id, {
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="password">Nouveau mot de passe</Label>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="new-password"
                        spellCheck={false}
                        aria-invalid={errors.password ? true : undefined}
                        aria-describedby="password-hint"
                        {...register("password", { required: true, pattern: PASSWORD_PATTERN })}
                    />
                    <p id="password-hint" className="text-xs leading-relaxed text-muted-foreground">
                        8 à 16 caractères, avec une majuscule, un chiffre et un symbole parmi @ $ ! % * ? &.
                    </p>
                    {errors.password?.type === "required" && (
                        <p className="text-sm text-destructive" role="alert">Indiquez un mot de passe.</p>
                    )}
                    {errors.password?.type === "pattern" && (
                        <p className="text-sm text-destructive" role="alert">
                            Ce mot de passe ne respecte pas les règles ci-dessus.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="password2">Confirmation</Label>
                    <Input
                        id="password2"
                        type="password"
                        autoComplete="new-password"
                        spellCheck={false}
                        aria-invalid={errors.password2 ? true : undefined}
                        {...register("password2", { required: true })}
                    />
                    {errors.password2?.type === "required" && (
                        <p className="text-sm text-destructive" role="alert">Confirmez le mot de passe.</p>
                    )}
                </div>

                {erreur && <p className="text-sm text-destructive" role="alert">{erreur}</p>}

                <Button type="submit" className="w-full">Enregistrer</Button>
            </form>
            <Link href="/" className="mt-5 block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                Retour à la connexion
            </Link>
        </AuthShell>
    );
}

export default ResetPassword
