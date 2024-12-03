"use client"
import { selectUser } from '@/lib/features/users/userSlice';
import { Dispatch, Selector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';;
import { getBooks, selectBokkStatus, selectBook } from '@/lib/features/books/bookSlice';
import { Book } from '@/lib/Interface/book.interface';
import { Input } from '@/components/ui/input';
import ConvertisseurID from '@/lib/ConvertisseurID';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { FaDownload } from 'react-icons/fa';
import { MdDeleteForever, MdMode } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from './loading';


const Dashboard = () => {
    const [token, setToken] = useState<string | null>(null);
    const user = Selector(selectUser);
    const books: Book[] = Selector(selectBook);
    const statusBook: string = Selector(selectBokkStatus);
    const [search, setSearch] = useState<string>("");
    const [filtre, setFiltre] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState<number>(20);
    const navigate = useRouter();

    const dispatch = Dispatch();

    const handleCategoryFiltre = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltre(event.target.value);
    };

    //Vérification du token pour vérifier l'autorisation d'afficher les livres
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            dispatch(getBooks({ token, search, filtre, page, itemPerPage }));
        };

    }, [token, search, filtre, page, dispatch, itemPerPage]);


    const handleDelete = (id: string) => {
        navigate.push("/dashboard/deleteBook/" + id)
    };

    const handleUpdate = (id: string) => {
        navigate.push("/dashboard/updateBook/" + id)
    };

    const handleNext = () => {
        setPage(page + 1);
    };

    const handleBefore = () => {
        setPage(page - 1);

        if (page == 1) setPage(1);
    };

    console.log('====================================');
    console.log(books.length,itemPerPage);
    console.log('====================================');

    return (
        <>
            {/* Affichagede la barre de recherche */}
            <div className='flex flex-row items-center justify-center w-[80%] lg:w-[60%]'>
                <Input type='search' className='w-[80%] lg:w-[60%] rounded' value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
            </div>
            {/* Barre de filtrage */}
            <div className='flex flex-row w-[90%] lg:w-[60%] text-[10px] lg:text-lg'>
                <fieldset className='flex flex-col w-full'>
                    <legend className='hidden lg:flex'>Catégorie : </legend>
                    <div className='flex flex-row w-full'>
                        <label className='flex items-center justify-center w-[20%]'>
                            <input type="radio" id="" name="categorie" value="" defaultChecked={true} onChange={handleCategoryFiltre} />
                            Tout
                        </label>
                        <label className='flex items-center justify-center w-[20%]'>
                            <input type="radio" name="categorie" value="histoire" onChange={handleCategoryFiltre} />
                            Histoire
                        </label>

                        <label className='flex items-center justify-center w-[20%]'>
                            <input type="radio" name="categorie" value="spiritualite" onChange={handleCategoryFiltre} />
                            Spiritualité
                        </label>

                        <label className='flex items-center justify-center w-[20%]'>
                            <input type="radio" name="categorie" value="religion" onChange={handleCategoryFiltre} />
                            Religion
                        </label>

                        <label className='flex items-center justify-center w-[20%]'>
                            <input type="radio" name="categorie" value="philosophie" onChange={handleCategoryFiltre} />
                            Philosophie
                        </label>
                    </div>
                </fieldset>

            </div>
            {(statusBook === "loading" || statusBook === "idle") && <Loading />}
            {(books?.length === 0 && statusBook === "success") && <div className='mt-[20px]'>Pas de livres disponibles ! </div>}

            <div className='flex flex-row flex-wrap w-full gap-3.5 p-2.5 items-center justify-center'>
                {books?.map((book: Book) => (
                    <Card className='flex flex-col  items-center w-[40%] h-[230px] lg:w-[18%] lg:h-[200px] hover:scale-[105%] shadow-lg  cursor-pointer bg-purple-100 transition-all relative overflow-hidden' key={book.id}>
                        <CardHeader className='flex h-[80%]'>
                            <CardTitle className='text-md flex text-center h-[80%]'>
                                {book.title}
                            </CardTitle>
                            <CardDescription className='flex flex-col text-center text-sm '>
                                <span>{book.author}</span>
                                <span>Catégorie :  <ConvertisseurID id={book.categoryId} token={token as string} /></span>
                            </CardDescription>
                        </CardHeader>
                        <CardFooter className='flex flex-row h-[40px] m-0 p-0 text-xl items-center justify-center'>
                            <Link href={book.url} download={book.title} className='' aria-label={book.title}><FaDownload />
                            </Link>
                            {(user?.role !== "user") && <div className='flex flex-row items-center justify-center h-full gap-2.5 m-2.5'>
                                <MdMode className='text-blue-700 hover:cursor-pointer' onClick={() => handleUpdate(book.id)} />
                                <MdDeleteForever className='text-red-700 hover:cursor-pointer' onClick={() => handleDelete(book.id)} />
                            </div>}
                        </CardFooter>
                    </Card >
                ))}
            </div>

            {/* Pagination */}
            <div className={(books.length !== 0) ? 'flex gap-3.5' : "hidden"}>
                <p onClick={handleBefore} className={(page === 1) ? "hidden" : 'cursor-pointer'}>Precedent</p>
                <p>---</p>
                <p onClick={handleNext} className={(books.length === itemPerPage) ? 'cursor-pointer' : "hidden"} >Suivant</p>
            </div>

        </>
    )
}

export default Dashboard
