"use client"
import React, { useEffect } from 'react'
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
    }, [dispatch]);

    useEffect(() => {
        if (errorLogin != null) {
            router.push("/");
        }
    }, [errorLogin, router]);

    if (!user) {
        return (
            <div className="flex min-h-dvh w-full items-center justify-center bg-background">
                <Loading />
            </div>
        )
    }

    return (
        <div className="page-shell min-h-dvh pb-8">
            <div className="page-content flex flex-col gap-4 sm:gap-6">
                <Header pseudo={user?.pseudo} id={user?.id} avatar={user?.avatar} role={user?.role} />
                <main className="flex w-full flex-col items-center gap-4 sm:gap-6 px-1 sm:px-2">
                    {children}
                </main>
            </div>
        </div>
    )
};

export default layout;
