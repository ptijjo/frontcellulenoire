"use client"
import { Button } from '@/components/ui/button';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import ConvertisseurID from '@/lib/ConvertisseurID';
import { selectUser } from '@/lib/features/users/userSlice';
import { Selector } from '@/lib/hooks';
import { Book } from '@/lib/Interface/book.interface';
import Url from '@/lib/Url';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaDownload, FaSearch } from 'react-icons/fa';
import { MdDeleteForever, MdMode } from 'react-icons/md';


const SearchPage = () => {
    const [searchBook, setSearchBook] = useState<Book[] | null>(null);
    const [search, setSeach] = useState("");
    const [token, setToken] = useState<string | null>(null);
    const user = Selector(selectUser);

    //Vérification du token pour vérifier l'autorisation d'afficher les livres
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        }
    }, [token]);

    const handleSearch = async () => {
        try {
            const result = await axios.get(Url.getBooks + `?search=${search}`, {
                headers: {
                    Authorization: `Bearer ${token as string}`
                }
            });
            setSearchBook(result.data.data.allBook);
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <div className='flex flex-row w-[30%] mb-14'>
                <>
                    <Input type='search' className='rounded' onChange={e => setSeach(e.target.value)} value={search} />
                    <Button className='rounded' onClick={handleSearch}><FaSearch /></Button>
                </>
                <>
                    <p>Filtre</p>
                </>
            </div>

            <>
                {searchBook?.map((book) => (
                    <Card key={book.id} className='flex flex-row items-center justify-between w-[95%] h-[50px] hover:scale-[101%] '>
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
            </>
        </>
    )
}

export default SearchPage
