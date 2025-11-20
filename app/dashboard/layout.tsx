"use client"
import React, { useEffect, useState } from 'react'
import Header from './components/header/Header';
import { login, selectUser } from '@/lib/features/users/userSlice';
import { Dispatch, Selector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import Loading from './loading';


const layout = ({ children }: { children: React.ReactNode }) => {

    const dispatch = Dispatch();
    const router = useRouter();
    const user = Selector(selectUser);
    const errorLogin = Selector(state => state.user.error);



    useEffect(() => {
        dispatch(login());
    }, [dispatch, login]);


    if (!user) {
        return (
            <>
                <Loading />
                {errorLogin != null && router.push("/")}
            </>
        )
    }


    return (
        <div className='flex flex-col items-center w-full max-w-7xl bg-white'>
            <Header pseudo={user?.pseudo} id={user?.id} avatar={user?.avatar} role={user?.role} />
            <main className='flex flex-col w-full items-center gap-3.5'>
                {children}
            </main>
        </div>
    )
}

export default layout;