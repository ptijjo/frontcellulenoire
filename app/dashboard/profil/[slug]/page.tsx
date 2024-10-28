"use client"
import { User } from '@/lib/Interface/user.interface';
import Url from '@/lib/Url';
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Profil = ({ params }: { params: { slug: string } }) => {

    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
            if (storedToken) {
                axios.get(Url.userById + `${params.slug}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                    .then(res => setUser(res.data.data))
                    .catch(err => console.log(err))
            };
        }
    }, [token, params.slug]);

    console.log(user);


    return (
        <main className='flex flex-col w-full justify-center items-center'>
            {params.slug}
            {user?.pseudo}
            {user?.email}
            {user?.id}
            {user?.role}
            <p>{user?.avatar}</p>

        </main>
    )
}

export default Profil
