"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
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
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const connectUser = await apiClient.post(Url.connection, data);
            toast.success(connectUser.data?.message ?? "Connexion réussie");
            setTimeout(() => {
                navigate.push("/dashboard")
            }, 1500);
        } catch (error: unknown) {
            toast.error(getAxiosErrorMessage(error, "Une erreur est survenue !"));
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full">
                <div>
                    <Input
                        type="text"
                        placeholder="E-mail ou pseudo"
                        autoComplete="username"
                        aria-label="Identifiant"
                        {...register("identifiant", { required: true })}
                    />
                    {errors.identifiant?.type === "required" && (
                        <span className="mt-1 block text-center text-sm text-destructive">Identifiant obligatoire</span>
                    )}
                </div>

                <div>
                    <Input
                        type="password"
                        placeholder="Mot de passe"
                        autoComplete="current-password"
                        aria-label="Mot de passe"
                        {...register("password", { required: true })}
                    />
                    {errors.password?.type === "required" && (
                        <span className="mt-1 block text-center text-sm text-destructive">Mot de passe obligatoire</span>
                    )}
                </div>

                <Button type="submit" className="w-full">Se connecter</Button>
            </form>
            <ToastContainer theme="dark" autoClose={2000} />
        </>
    )
}

export default LoginPage;
