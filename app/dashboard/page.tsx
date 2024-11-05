"use client"
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import ConvertisseurID from '@/lib/ConvertisseurID';
import { Book } from '@/lib/Interface/book.interface';
import { Category } from '@/lib/Interface/categories.interface';
import Url from '@/lib/Url';
import { Label } from '@radix-ui/react-menubar';
import axios from 'axios';
import Link from 'next/link';
import { Input } from 'postcss';
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
    );

    return (
        <main className='flex flex-col w-full justify-center items-center'>
            <div className=' w-full flex flex-col lg:flex-row flex-wrap gap-2.5 items-center justify-around'>
                {books?.map((book) => (
                    <Card key={book.id} className='flex flex-col items-center justify-center w-1/5 h-[150px] p-2.5'>
                        <CardHeader>
                            <CardTitle className='text-md'>{book.title}</CardTitle>
                            <CardDescription>
                                Catégorie :  <ConvertisseurID id={book.categoryId} token={token as string} />
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                        </CardContent>
                        <CardFooter>
                            <Link href={book.url} download="OpenBook">Cliquez pour télécharger</Link>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </main>
    )
}

export default Dashboard
