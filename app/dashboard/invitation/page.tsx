"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Url from '@/lib/Url';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
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
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            await axios.post(Url.userById, data, {
                withCredentials: true,
            });

            setMessage(`Email envoyé à ${data.email}`);

            setTimeout(() => {
                setMessage(null)
                navigate.push("/dashboard")
            }, 3000);
        } catch (error: any) {
            console.error(`${error.response.data.message}`);
            setErreur(error.response.data.message);
        }

    };

    return (
        <>
            <h1 className='text-2xl font-semibold item-center'>Inviter un nouveau lecteur</h1>
            <div className={(message !== null) ? 'flex flex-col justify-center items-center gap-y-1.5 w-[40%] text-center text-2xl flex-grow' : "hidden"}>
                {message}
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className={(message === null) ? "flex flex-col gap-y-1.5 w-[80%] lg:w-[40%] mx-auto my-[50%] lg:my-[20%]" : "hidden"}>
                <Input type="email" placeholder="e-mail" id="identifiant" autoComplete="off" className="rounded placeholder-red-400 pl-4" {...register("email", { required: true })} aria-label="Email" />
                {errors.email && errors.email.type === "required" && <span className='text-red-700 text-center'>Email Obligatoire !</span>}


                <div className='flex items-center justify-center mt-2.5 gap-3.5 w-[60%] m-auto'>
                    <Button type='button' onClick={() => navigate.back()} className='bg-red-500 hover:bg-red-400 w-1/2 rounded'> Annuler</Button>
                    <Button type="submit" className="bg-blue-500 hover:bg-blue-400 w-1/2 rounded">Inviter</Button>
                </div>

                <div className={(erreur === null) ? 'hidden' : "text-2xl text-center text-red"}>
                    {erreur}
                </div>
            </form>




        </>
    )
}

export default Invitation;
