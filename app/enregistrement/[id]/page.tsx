"use client"
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import apiClient from '@/lib/apiClient';
import Url from '@/lib/Url';
import { useRouter } from 'next/navigation';
import AuthShell from '@/components/AuthShell';
import { getAxiosErrorMessage } from '@/lib/getAxiosErrorMessage';

type Inputs = {
    password: string;
    password2: string;
};

const PASSWORD_PATTERN = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;

const Enregistrement = ({ params }: { params: { id: string } }) => {
    const id = params.id as string;
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        if (data.password !== data.password2) {
            setErrorMessage("Les mots de passe ne sont pas identiques");
            window.setTimeout(() => setErrorMessage(""), 3000);
            return;
        }

        try {
            await apiClient.post(Url.createUser + "/" + id, { password: data.password });
            navigate.push("/");
        } catch (error: unknown) {
            setErrorMessage(getAxiosErrorMessage(error, "Une erreur est survenue"));
            window.setTimeout(() => setErrorMessage(""), 3000);
        }
    };

    return (
        <AuthShell
            title="Créer votre compte"
            subtitle="Choisissez un mot de passe sécurisé pour accéder à la bibliothèque."
            showHero={false}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <div>
                    <Input
                        type="password"
                        placeholder="Mot de passe"
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

                {errorMessage && (
                    <p className="text-center text-sm text-destructive">{errorMessage}</p>
                )}

                <Button type="submit" className="w-full">S&apos;enregistrer</Button>
            </form>
        </AuthShell>
    );
}

export default Enregistrement
