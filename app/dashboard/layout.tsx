"use client"
import React, { useEffect, useState } from 'react'
import Header from './components/header/Header';
import { login, selectUser } from '@/lib/features/users/userSlice';
import { Dispatch, Selector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { getBooks } from '@/lib/features/books/bookSlice';


const layout = ({ children }: { children: React.ReactNode }) => {

    const dispatch = Dispatch();
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const user = Selector(selectUser);
    const errorLogin = Selector(state => state.user.error);
    const navigate = useRouter();
    //Vérification de l'existance d'un token pour vérifier qui est connecté et si pas de token on retourne a la page de connection
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
            if (storedToken) {
                dispatch(login(storedToken as string));
            }
            else {
                router.push("/");
            }
        }
    }, [token, dispatch, login, getBooks]);

    useEffect(() => {
        if (errorLogin !== null) {
            setTimeout(() => {
                navigate.push("/");
            }, 5000);
        }
    }, [errorLogin]);

    if (errorLogin !== null) {
        return (
            <>
                <div className='text-red-700 text-2xl font-bold text-center'>Vous n'êtes pas autorisé à accéder à cette page</div>
                <div className='text-xl font-bold text-center'>Vous serez rediriger vers la page de connection dans quelques secondes...</div>
            </>
        )
    };


    return (
        <div className='flex flex-col items-center w-dvw max-w-7xl m-auto bg-white'>
            <Header pseudo={user?.pseudo} id={user?.id} avatar={user?.avatar} role={user?.role} />
            <main className='flex flex-col w-full items-center gap-3.5 min-h-dvh'>
                {children}
            </main>
        </div>
    )
}

export default layout;