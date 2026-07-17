"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import apiClient from "@/lib/apiClient";
import Url from "@/lib/Url";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getAxiosErrorMessage } from "@/lib/getAxiosErrorMessage";
import AuthShell from "@/components/AuthShell";

type Inputs = {
    email: string
}

const ForgetPassword = () => {
    const [erreur, setErreur] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await apiClient.post(Url.forgetPassword, {
                email: data.email
            });

            if (response.status === 200) {
                setMessage(response.data.message ?? "Si cette adresse email est enregistrée, un lien de réinitialisation vous sera envoyé.");
                window.setTimeout(() => {
                    setMessage(null);
                    navigate.push("/");
                }, 3000);
            }
        } catch (error: unknown) {
            setErreur(getAxiosErrorMessage(error));
            window.setTimeout(() => {
                setErreur(null);
            }, 3000);
        }
    };

    if (message) {
        return (
            <AuthShell title="E-mail envoyé" subtitle={message} showHero={false}>
                <p className="text-center text-sm text-muted-foreground">Redirection vers la connexion…</p>
            </AuthShell>
        );
    }

    return (
        <AuthShell
            title="Mot de passe oublié"
            subtitle="Entrez votre adresse e-mail pour recevoir un lien de réinitialisation."
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <Input
                        type="email"
                        placeholder="Votre e-mail"
                        autoComplete="email"
                        {...register("email", { required: true })}
                    />
                    {errors.email?.type === "required" && (
                        <span className="mt-1 block text-center text-sm text-destructive">E-mail obligatoire</span>
                    )}
                </div>

                {erreur && <p className="text-center text-sm text-destructive">{erreur}</p>}

                <Button type="submit" className="w-full">Réinitialiser le mot de passe</Button>
            </form>
            <Link href="/" className="mt-4 block text-center text-sm text-primary hover:underline">
                Retour à la connexion
            </Link>
        </AuthShell>
    );
}

export default ForgetPassword
