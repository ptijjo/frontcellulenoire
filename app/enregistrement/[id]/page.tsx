"use client"
import React, { useState } from 'react'
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import Url from '@/lib/Url';
import { useRouter } from 'next/navigation';

type Inputs = {
    password: string;
    password2: string;

};

const Enregistrement = ({ params }: { params: { id: string } }) => {
    const id = params.id as string;
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useRouter();

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (data.password !== data.password2) {
                setErrorMessage("Les mots de passe ne sont pas identiques");

                setTimeout(() => {
                    setErrorMessage("");
                }, 3000);
                return;
            }

            await axios.post(Url.createUser + "/" + id, {
                password: data.password
            });

            navigate.push("/")




        } catch (error: any) {
            console.error(`${error}`)
        }

    };
    return (
        <>
            <header className="flex flex-row items-center justify-between p-3.5 w-full text-black">
                <div className="w-[40px] lg:w-[80px]">
                    <Image src="/logos/logo.jpeg" alt="logo" width={80} height={80} priority className="w-full h-full" />
                </div >
            </header >
            <main className='flex flex-col w-full justify-center items-center gap-3.5 mt-[30px] flex-grow'>
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-1.5 w-4/5 m-auto">
                    <Input type="password" placeholder="password" id="password" autoComplete="off" className="rounded-none placeholder-red-400 pl-4" {...register("password", { required: true, pattern: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/ })} />
                    {errors.password && errors.password.type === "required" && <span className='text-red-700 text-center'>Le mot de passe Obligatoire !</span>}
                    {errors.password && errors.password.type === "pattern" && <span className='text-red-700 text-center'>Le mot de passe doit contenir entre 8 et 16 caractères, avec au moins une majuscule, un chiffre et un symbole.</span>}

                    <Input type="password" placeholder="confirmer password" id="password2" autoComplete="off" className="rounded-none placeholder-red-400 pl-4" {...register("password2", { required: true })} />
                    {errors.password2 && errors.password2.type === "required" && <span className='text-red-700 text-center'>Le mot de passe Obligatoire !</span>}
                    {errors.password && errors.password.type === "pattern" && <span className='text-red-700 text-center'>Le mot de passe doit contenir entre 8 et 16 caractères, avec au moins une majuscule, un chiffre et un symbole.</span>}

                    {errorMessage && (
                        <p id="egalitePassword" className="text-red-500">
                            {errorMessage}
                        </p>
                    )}


                    <div className='flex items-center justify-center mt-2.5 gap-3.5'>
                        {/* <Button type='button' onClick={() => navigate.back()}> Annuler</Button> */}
                        <Button type="submit" className="bg-blue-400">S'enregistrer</Button>
                    </div>

                </form>


            </main>
        </>
    )
}

export default Enregistrement
