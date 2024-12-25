"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import React, { useState } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Url from "@/lib/Url";
import { useRouter } from "next/navigation";

type Inputs = {
    password: string;
    password2: string;
}
const resetPassword = ({ params }: { params: { id: string } }) => {
    const [Erreur, setErreur] = useState<string | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const navigate = useRouter();
    const id = params.id as string;

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {

            if (data.password !== data.password2) {
                setErreur("Mots de passe sont différents");

                setInterval(() => {
                    setErreur(null);
                }, 3000);
            };

            const newPassword = await axios.put(Url.resetPassword + "/" + id, {
                password: data.password
            });

            if (newPassword.status == 200) {
                setMessage("Votre mot de passe a été réinitialisé avec succès !")
            };

            if (newPassword.status === 200) {
                setMessage("Un email vous sera transmis d'ici quelques minutes !");
                setInterval(() => {
                    setMessage(null);
                }, 3000);
            };


        } catch (error: any) {
            setErreur(`${error.response.data.message}`);
            setInterval(() => {
                setErreur(null);
            }, 3000);
        }

    };
    return (
        <>
            <header className="flex justify-items-start items-center w-full mt-2.5">
                <Link href="/dashboard">
                    <div className="w-[40px] lg:w-[80px]">
                        <Image src="/logos/logo.jpeg" alt="logo" width={80} height={80} priority className="w-full h-full" />
                    </div >
                </Link>
            </header>
            <main className="flex flex-col flex-grow w-full">
                <form onSubmit={handleSubmit(onSubmit)} className={(!message) ? "flex flex-col gap-y-1.5 w-[40%] m-auto" : "hidden"}>

                    <Input type="password" placeholder="Entrez mot de passe" id="password" autoComplete="off" className="rounded-none placeholder-red-400 pl-4" {...register("password", { required: true })} />
                    {errors.password && errors.password.type === "required" && <span className="text-center text-red-700">Password Obligatoire ! </span>}

                    <Input type="password" placeholder="Confirmez le mot de passe" id="password2" autoComplete="off" className="rounded-none placeholder-red-400 pl-4" {...register("password2", { required: true })} />
                    {errors.password2 && errors.password2.type === "required" && <span className="text-center text-red-700">Password Obligatoire ! </span>}

                    <div className={(!Erreur) ? "hidden" : "text-red-600 flex m-auto"}>{Erreur}</div>

                    <Button type="submit" className="mt-2.5 bg-blue-500 hover:bg-blue-400 text-black w-[80%] mx-auto">Réinitialiser mot de passe</Button>
                </form>

                <div className={(message) ? "flex flex-col gap-y-1.5 w-[80%] m-auto text-2xl" : "hidden"}>
                    {message}
                </div>
            </main>
        </>
    )
}

export default resetPassword
