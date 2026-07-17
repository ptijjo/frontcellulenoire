"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getAxiosErrorMessage } from '@/lib/getAxiosErrorMessage';
import Url from '@/lib/Url';
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type Inputs = {
    email: string;
};

const Invitation = () => {
    const navigate = useRouter();
    const [message, setMessage] = useState<string | null>(null);
    const [erreur, setErreur] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await apiClient.post(Url.userById, data);

            setMessage(`Invitation envoyée à ${data.email}`);

            setTimeout(() => {
                setMessage(null);
                navigate.push("/dashboard");
            }, 3000);
        } catch (error: unknown) {
            setErreur(getAxiosErrorMessage(error));
        }
    };

    if (message) {
        return (
            <div className="flex w-full max-w-md flex-col items-center gap-4 py-12 text-center">
                <h1 className="font-serif text-2xl">Invitation envoyée</h1>
                <p className="text-muted-foreground">{message}</p>
            </div>
        );
    }

    return (
        <div className="flex w-full max-w-md flex-col items-center gap-6 py-8">
            <h1 className="font-serif text-2xl sm:text-3xl">Inviter un lecteur</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-4">
                <div>
                    <Input
                        type="email"
                        placeholder="Adresse e-mail"
                        autoComplete="off"
                        {...register("email", { required: true })}
                        aria-label="Email"
                    />
                    {errors.email?.type === "required" && (
                        <span className="mt-1 block text-center text-sm text-destructive">E-mail obligatoire</span>
                    )}
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                    <Button type="button" variant="outline" onClick={() => navigate.back()} className="flex-1">
                        Annuler
                    </Button>
                    <Button type="submit" className="flex-1">Inviter</Button>
                </div>

                {erreur && <p className="text-center text-sm text-destructive">{erreur}</p>}
            </form>
        </div>
    );
}

export default Invitation;
