"use client"
import { selectUser } from '@/lib/features/users/userSlice';
import { Dispatch, Selector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';;
import { getBooks, selectBokkStatus, selectBook, selectNbBook, totalBook } from '@/lib/features/books/bookSlice';
import { Book } from '@/lib/Interface/book.interface';
import { Input } from '@/components/ui/input';
import { FaDownload } from 'react-icons/fa';
import { MdDeleteForever, MdMode } from 'react-icons/md';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Loading from './loading';
import BookCard from './components/BookCard';
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { downloadBook } from '@/lib/downloadBook';
import { User } from '@/lib/Interface/user.interface';
import { ToastContainer, toast } from 'react-toastify';





const Dashboard = () => {
    const [token, setToken] = useState<string | null>(null);
    const user: User = Selector(selectUser);
    const books: Book[] = Selector(selectBook);
    const nbBooks: number = Selector(selectNbBook);
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

    useEffect(() => {
        
            (search !== "") && page == 1;
            dispatch(getBooks({search, filtre, page, itemPerPage }));
            dispatch(totalBook());
        

    }, [ search, filtre, page, dispatch, itemPerPage]);

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);


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
    };

    const getDisplayedBooksCount = (): number => {
        const pageBook = Math.min(page * itemPerPage, nbBooks);
        return pageBook;
    };

    const handleEnd = () => {
        setPage(Math.ceil(nbBooks / itemPerPage));
        // Faire défiler vers le haut de la page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDownload = (bookId: string) => {
        if (user?.role === "new" && user?.download >= 1) {
            toast.info("Vous ne pouvez pas télécharger plus d'un livre");
        } else {
            downloadBook(bookId);
        }

    };

    return (
        <>
            <h1 className='text-2xl font-bold text-gray-700'>Bibliothèque cellule noire</h1>
            {/* Affichagede la barre de recherche */}
            <div className='flex flex-col items-center justify-center w-[80%] lg:w-[60%]'>
                <Input type='search' placeholder="Recherche ouvrage" className='w-[80%] lg:w-[60%] rounded mb-3.5' value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search" />

                {isClient && user?.role === "new" && user?.download === 0 && (<span className='text-xl font-semibold text-blue-700'> Vous ne pouvez télécharger qu'un seul livre</span>)}
                {(isClient && user?.role === "new" && user?.download >= 1) && <span className='text-xl font-semibold text-red-700'> Vous ne pouvez plus télécharger de livres </span>}
            </div>

            {/* Barre de filtrage */}
            <div className='flex flex-row w-full text-[10px] lg:text-lg justify-center'>
                <fieldset className='flex flex-col w-[90%] justify-center items-center'>
                    <div className='flex flex-row w-full flex-wrap justify-around items-center gap-1.5 px-1.5' >
                        <label className='flex items-center justify-center w-[%]'>
                            <input type="radio" id="" name="categorie" value="" defaultChecked={true} onChange={handleCategoryFiltre} className='' />
                            Tout
                        </label>
                        <label className='flex items-center justify-center'>
                            <input type="radio" name="categorie" value="histoire" onChange={handleCategoryFiltre} />
                            Histoire
                        </label>

                        <label className='flex items-center justify-center'>
                            <input type="radio" name="categorie" value="spiritualite" onChange={handleCategoryFiltre} />
                            Spiritualité
                        </label>

                        <label className='flex items-center justify-center w-[%]'>
                            <input type="radio" name="categorie" value="religion" onChange={handleCategoryFiltre} />
                            Religion
                        </label>

                        <label className='flex items-center justify-center w-[%]'>
                            <input type="radio" name="categorie" value="philosophie" onChange={handleCategoryFiltre} />
                            Philosophie
                        </label>

                        <label className='flex items-center justify-center w-[%]'>
                            <input type="radio" name="categorie" value="roman" onChange={handleCategoryFiltre} />
                            Roman
                        </label>

                        {/*<label className='flex items-center justify-center w-[%]'>
                            <input type="radio" name="categorie" value="sciences" onChange={handleCategoryFiltre} />
                            Sciences
                        </label>*/}

                        <label className='flex items-center justify-center w-[%]'>
                            <input type="radio" name="categorie" value="langue" onChange={handleCategoryFiltre} />
                            Langues
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
                            <div onClick={() => handleDownload(book.id)} className='cursor-pointer hover:text-gray-700' aria-label={book.title}><FaDownload />
                            </div>
                            {(user?.role !== "user" && user?.role !== "new") && <div className='flex flex-row items-center justify-center h-full gap-2.5 m-2.5'>
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
                <p className={(nbBooks) ? 'border' : 'hidden'}>{getDisplayedBooksCount()} - {nbBooks}</p>
                <p onClick={handleNext} className={(books.length === itemPerPage) ? 'cursor-pointer hover:text-gray-700' : "hidden"} >Suivant</p>
                <MdOutlineKeyboardDoubleArrowRight onClick={handleEnd} className={(books.length === itemPerPage) ? 'cursor-pointer hover:text-gray-700 text-2xl' : "hidden"} />
            </div >
            <ToastContainer autoClose={2000} />
        </>
    )
};

export default Dashboard;
