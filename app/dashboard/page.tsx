"use client"
import { Book } from '@/lib/Interface/book.interface';
import Url from '@/lib/Url';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [token, setToken] = useState<string | null>(null);
    const [books, setBooks] = useState<Book[] | null>(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
            if (storedToken) {
                axios.get(Url.getBooks, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                    .then(res => setBooks(res.data.data))
                    .catch(err => console.log(err))
            }
        }
    }, [token]);

    if (books?.length === 0) return (
        <main className='flex flex-col w-full justify-center items-center'>
            Aucun livre n'est disponible
        </main>
    )

    return (
        <main className='flex flex-col w-full justify-center items-center'>
            {books?.map((book) => (
                <div key={book.id}>
                    <p>{book.title}</p>
                    <p><img src={book?.url} alt="" /></p>
                </div>
            ))}
        </main>
    )
}

export default Dashboard
