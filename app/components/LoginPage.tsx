"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation';
import Url from "@/lib/Url";
import apiClient from "@/lib/apiClient";
import { getAxiosErrorMessage } from "@/lib/getAxiosErrorMessage";

type Inputs = {
    identifiant: string
    password: string
}

const LoginPage = () => {
    const navigate = useRouter();
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await apiClient.post(Url.connection, data);
            navigate.push("/dashboard");
        } catch (error: unknown) {
            toast.error(getAxiosErrorMessage(error, "Identifiant ou mot de passe incorrect."));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5" noValidate>
                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="identifiant">Identifiant</Label>
                    <Input
                        id="identifiant"
                        type="text"
                        autoComplete="username"
                        autoCapitalize="none"
                        spellCheck={false}
                        aria-invalid={errors.identifiant ? true : undefined}
                        aria-describedby={errors.identifiant ? "identifiant-error" : undefined}
                        {...register("identifiant", { required: true })}
                    />
                    {errors.identifiant && (
                        <p id="identifiant-error" className="text-sm text-destructive" role="alert">
                            Indiquez votre e-mail ou votre pseudo.
                        </p>
                    )}
                </div>

                <div className="flex flex-col gap-1.5">
                    <Label htmlFor="password">Mot de passe</Label>
                    <Input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        spellCheck={false}
                        aria-invalid={errors.password ? true : undefined}
                        aria-describedby={errors.password ? "password-error" : undefined}
                        {...register("password", { required: true })}
                    />
                    {errors.password && (
                        <p id="password-error" className="text-sm text-destructive" role="alert">
                            Indiquez votre mot de passe.
                        </p>
                    )}
                </div>

                <Button type="submit" className="mt-1 w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Connexion…" : "Se connecter"}
                </Button>
            </form>
            <ToastContainer theme="dark" autoClose={4000} />
        </>
    )
}

export default LoginPage;
