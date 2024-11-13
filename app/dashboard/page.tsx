"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import ConvertisseurID from '@/lib/ConvertisseurID';
import { selectUser } from '@/lib/features/users/userSlice';
import { Dispatch, Selector } from '@/lib/hooks';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaDownload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { MdMode } from "react-icons/md";
import { getBooks, selectBook } from '@/lib/features/books/bookSlice';
import { Book } from '@/lib/Interface/book.interface';
import Pagination from './components/Pagination';


const Dashboard = () => {
    const [token, setToken] = useState<string | null>(null);
    const user = Selector(selectUser);
    const dispatch = Dispatch();
    const books = Selector(selectBook);

    //Vérification du token pour vérifier l'autorisation d'afficher les livres
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
            if (storedToken) {
                dispatch(getBooks(storedToken as string));
            }
        }
    }, [token]);

    return (
        <main className='flex flex-col w-full justify-center items-center gap-3.5'>
            {(books?.nbBookTotal === 0)
                ? <p>Aucun livre n'est disponible</p>
                : <div className=' w-full flex flex-col lg:flex-row flex-wrap gap-2.5 items-center justify-around'>
                    {books?.allBook.map((book: Book) => (
                        <Card key={book.id} className='flex flex-row items-center justify-between w-[95%] h-[50px] hover:scale-[101%]'>
                            <CardHeader className='flex w-[80%] '>
                                <CardTitle className='text-md'>{book.title}</CardTitle>
                                <CardDescription>
                                    Catégorie :  <ConvertisseurID id={book.categoryId} token={token as string} />
                                </CardDescription>
                            </CardHeader>
                            <CardFooter className='flex flex-row h-full gap-2.5 p-0 text-xl'>
                                <Link href={book.url} download={book.url} className=''><FaDownload />
                                </Link>
                                {(user?.role !== "user") && <div className='flex flex-row items-center justify-center h-full gap-2.5 m-2.5'>
                                    <MdMode className='text-blue-700 hover:cursor-pointer' />
                                    <MdDeleteForever className='text-red-700 hover:cursor-pointer' />
                                </div>}
                            </CardFooter>
                        </Card>
                    ))}
                </div>}
            <Pagination />
            {books?.nbBookTotal}
        </main>
    )
}

export default Dashboard
