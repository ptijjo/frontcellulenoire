"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                        id="email"
                        type="email"
                        autoComplete="email"
                        spellCheck={false}
                        aria-invalid={errors.email ? true : undefined}
                        {...register("email", { required: true })}
                    />
                    {errors.email?.type === "required" && (
                        <p className="text-sm text-destructive" role="alert">Indiquez votre e-mail.</p>
                    )}
                </div>

                {erreur && <p className="text-sm text-destructive" role="alert">{erreur}</p>}

                <Button type="submit" className="w-full">Recevoir le lien</Button>
            </form>
            <Link href="/" className="mt-5 block text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
                Retour à la connexion
            </Link>
        </AuthShell>
    );
}

export default ForgetPassword
