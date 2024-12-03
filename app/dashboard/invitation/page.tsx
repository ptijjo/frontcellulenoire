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
    const [token, setToken] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        }
    }, [token]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            if (token) {
                const invitation = await axios.post(Url.userById, data, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(invitation.data);
            }
        } catch (error: any) {
            console.error(`${error.response.data.message}`)
        }

    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-1.5 w-[40%] m-auto">
                <Input type="email" placeholder="e-mail" id="identifiant" autoComplete="off" className="rounded-none placeholder-red-400 pl-4" {...register("email", { required: true })} aria-label="Email" />
                {errors.email && errors.email.type === "required" && <span className='text-red-700 text-center'>Email Obligatoire !</span>}


                <div className='flex items-center justify-center mt-2.5 gap-3.5'>
                    <Button type='button' onClick={() => navigate.back()}> Annuler</Button>
                    <Button type="submit" className="bg-blue-400 text-black">Inviter</Button>
                </div>

            </form>


        </>
    )
}

export default Invitation;
