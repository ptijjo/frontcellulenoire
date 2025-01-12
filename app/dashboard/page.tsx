"use client"
import { selectUser } from '@/lib/features/users/userSlice';
import { Dispatch, Selector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';;
import { getBooks, selectBokkStatus, selectBook } from '@/lib/features/books/bookSlice';
import { Book } from '@/lib/Interface/book.interface';
import { Input } from '@/components/ui/input';
import { FaDownload } from 'react-icons/fa';
import { MdDeleteForever, MdMode } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from './loading';
import BookCard from './components/BookCard';
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";

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
        setPage(1);
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
            (search !== "") && page == 1;
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
        // Faire défiler vers le haut de la page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleBefore = () => {
        setPage(page - 1);
        // Faire défiler vers le haut de la page
        window.scrollTo({ top: 0, behavior: 'smooth' });

        if (page == 1) setPage(1);
    };

    const handleBegin = () => {
        setPage(1);
        // Faire défiler vers le haut de la page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }


    return (
        <>
            <h1 className='text-2xl font-bold text-gray-700'>Bibliothèque cellule noire</h1>
            {/* Affichagede la barre de recherche */}
            <div className='flex flex-row items-center justify-center w-[80%] lg:w-[60%]'>
                <Input type='search' placeholder="Recherche ouvrage" className='w-[80%] lg:w-[60%] rounded' value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
            </div>
            {/* Barre de filtrage */}
            <div className='flex flex-row w-[90%] lg:w-[60%] text-[10px] lg:text-lg'>
                <fieldset className='flex flex-col w-full'>

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

            <div className='flex flex-row flex-wrap w-full gap-3.5 items-center justify-center'>
                {books?.map((book: Book) => (
                    <div className='flex flex-col w-[220px] h-[250px] lg:h-[320px] rounded-md items-center justify-center relative' key={book.id} >
                        <BookCard title={book.title} author={book.author} />
                        <div className='flex flex-row h-[40px] m-0 p-0 text-xl items-center justify-center absolute bottom-[0px] lg:bottom-[20px] left-[60%] transform translate-x-[-50%]'>
                            <Link href={book.url} download={book.title} target='_blank' className='' aria-label={book.title}><FaDownload />
                            </Link>
                            {(user?.role !== "user") && <div className='flex flex-row items-center justify-center h-full gap-2.5 m-2.5'>
                                <MdMode className='text-blue-700 hover:cursor-pointer' onClick={() => handleUpdate(book.id)} />
                                <MdDeleteForever className='text-red-700 hover:cursor-pointer' onClick={() => handleDelete(book.id)} />
                            </div>}
                        </div>
                    </div >
                ))}
            </div >

            {/* Pagination */}
            <div className={(books.length !== 0) ? 'flex gap-3.5 my-3.5' : "hidden"}>
                <MdOutlineKeyboardDoubleArrowLeft className={(page === 1) ? "hidden" : 'cursor-pointer hover:text-gray-700 text-2xl'} onClick={handleBegin} />
                <p onClick={handleBefore} className={(page === 1) ? "hidden" : 'cursor-pointer hover:text-gray-700'}>Precedent</p>
                <p>---</p>
                <p onClick={handleNext} className={(books.length === itemPerPage) ? 'cursor-pointer hover:text-gray-700' : "hidden"} >Suivant</p>
            </div >
        </>
    )
}

export default Dashboard
