"use client"
import { selectUser } from '@/lib/features/users/userSlice';
import { Dispatch, Selector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';;
import { getBooks, selectBook } from '@/lib/features/books/bookSlice';
import { Book } from '@/lib/Interface/book.interface';
import AfficheBook from './components/AfficheBook';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import Url from '@/lib/Url';
import ConvertisseurID, { fonctionConvertisseur } from '@/lib/ConvertisseurID';
import { Label } from '@/components/ui/label';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaDownload } from 'react-icons/fa';
import { MdDeleteForever, MdMode } from 'react-icons/md';
import Link from 'next/link';


const Dashboard = () => {
    const [token, setToken] = useState<string | null>(null);
    const user = Selector(selectUser);
    const books = Selector(selectBook);
    const [search, setSearch] = useState<string>("");
    const [filtre, setFiltre] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState<number>(20);

    const dispatch = Dispatch();

    const handleCategoryFiltre = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltre(event.target.value);
        console.log(event.target.value)
    };

    //Vérification du token pour vérifier l'autorisation d'afficher les livres
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            dispatch(getBooks({ token, search, filtre, page, itemPerPage }))
        };

    }, [token, search, filtre, page, dispatch]);

    
    console.log("Recherche :", search);
    console.log("Filtre :", filtre);
    console.log("Livres :", books?.allBook);



    return (
        <main className='flex flex-col w-full justify-center items-center gap-3.5'>
            {/* Affichagede la barre de recherche */}
            <div className='flex flex-row items-center justify-center w-[60%]'>
                <Input type='search' className='w-[60%] rounded' value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            {/* Barre de filtrage */}
            <div className='flex w-[60%]'>
                <fieldset className='flex w-full'>
                    <legend>Catégorie : </legend>
                    <label className='flex items-center justify-center w-1/3 gap-2.5'>
                        <input type="radio" id="" name="categorie" value="" defaultChecked={true} onChange={handleCategoryFiltre} />
                        All
                    </label>

                    <label className='flex items-center justify-center w-1/3 gap-2.5'>
                        <input type="radio" name="categorie" value="histoire" onChange={handleCategoryFiltre} />
                        Histoire
                    </label>

                    <label className='flex items-center justify-center w-1/3 gap-2.5'>
                        <input type="radio" name="categorie" value="spiritualite" onChange={handleCategoryFiltre} />
                        Spiritualité
                    </label>

                    <label className='flex items-center justify-center w-1/3 gap-2.5'>
                        <input type="radio" name="categorie" value="religion" onChange={handleCategoryFiltre} />
                        Religion
                    </label>
                </fieldset>

            </div>

            {(books?.nbBookTotal === 0) && <div>Pas de livres disponibles ! </div>}

            {books?.allBook.map((book: Book) => (
                <Card className='flex flex-row items-center justify-between w-[95%] h-[80px] hover:scale-[101%]' key={book.id}>
                    <CardHeader className='flex w-[80%]'>
                        <CardTitle className='text-md flex gap-2.5'>
                            {book.title}
                        </CardTitle>
                        <CardDescription>
                            <span>{book.author}</span><br />
                            <span>Catégorie :  <ConvertisseurID id={book.categoryId} token={token as string} /></span>
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className='flex flex-row h-full gap-2.5 px-3.5 py-0 text-xl'>
                        <Link href={book.url} download={book.title} className=''><FaDownload />
                        </Link>
                        {(user?.role !== "user") && <div className='flex flex-row items-center justify-center h-full gap-2.5 m-2.5'>
                            <MdMode className='text-blue-700 hover:cursor-pointer' />
                            <MdDeleteForever className='text-red-700 hover:cursor-pointer' />

                        </div>}
                    </CardFooter>
                </Card >
            ))}



        </main>
    )
}

export default Dashboard
