"use client"
import React, { useEffect, useState } from 'react'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import { login, selectUser, selectUserStatus } from '@/lib/features/users/userSlice';
import { Dispatch, Selector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';


const layout = ({ children }: { children: React.ReactNode }) => {

    const dispatch = Dispatch();
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);
    const user = Selector(selectUser);

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
    }, [token]);


    return (
        <div className='w-full flex flex-col items-center'>
            <Header pseudo={user?.pseudo} id={user?.id} avatar={user?.avatar} role={user?.role} />
            {children}
            <Footer />
        </div>
    )
}

export default layout;