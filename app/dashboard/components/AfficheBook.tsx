"use client"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import ConvertisseurID, { fonctionConvertisseur } from '@/lib/ConvertisseurID';
import { Book } from '@/lib/Interface/book.interface';
import { User } from '@/lib/Interface/user.interface';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaDownload } from 'react-icons/fa';
import { MdDeleteForever, MdMode } from 'react-icons/md';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger, } from "@/components/ui/alert-dialog"
import { Dispatch, Selector } from '@/lib/hooks';
import { deleteBook, selectBook } from '@/lib/features/books/bookSlice';
import { useRouter } from 'next/navigation';
import { selectUser } from '@/lib/features/users/userSlice';


interface HeaderProps {
    token: string;
    filtre: string
};
const AfficheBook: React.FC<HeaderProps> = ({ filtre, token }) => {

    const dispatch = Dispatch();
    const navigate = useRouter();
    const Books: Book[] = Selector(selectBook);
    const user: User = Selector(selectUser);
    const [livresFiltres, setLivresFiltres] = useState<Book[] | null>(null);

    useEffect(() => {
        const filtrerLivres = async () => {
            if (filtre !== "") {
                const livres = await Promise.all(
                    Books.map(async (book) => {
                        const categorie = await fonctionConvertisseur(book.categoryId, token as string);
                        return { ...book, categorie };
                    })
                );

                // Filtrer les livres ayant la catégorie correspondante
                const livresFiltrés = livres.filter((book) => book.categorie === filtre);
                setLivresFiltres(livresFiltrés);
            }
        };

        filtrerLivres();
    }, [filtre, , token]);

    const handleDelete = (id: string) => {
        console.log("delete " + id);
        dispatch(deleteBook({ id, token }));
        navigate.refresh();

    }

    console.log(Books)

    return (
        <></>
        // { Books.map(book:Book => (
        //     <Card className='flex flex-row items-center justify-between w-[95%] h-[80px] hover:scale-[101%]'>
        //         <CardHeader className='flex w-[80%] '>
        //             <CardTitle className='text-md flex gap-2.5'>
        //                 {book.title}
        //             </CardTitle>
        //             <CardDescription>
        //                 <span>{book.author}</span><br />
        //                 <span>Catégorie :  <ConvertisseurID id={book.categoryId} token={token as string} /></span>
        //             </CardDescription>
        //         </CardHeader>
        //         <CardFooter className='flex flex-row h-full gap-2.5 px-3.5 py-0 text-xl'>
        //             <Link href={book.url} download={book.url} className=''><FaDownload />
        //             </Link>
        //             {(user?.role !== "user") && <div className='flex flex-row items-center justify-center h-full gap-2.5 m-2.5'>
        //                 <MdMode className='text-blue-700 hover:cursor-pointer' />


        //                 <AlertDialog>
        //                     <AlertDialogTrigger><MdDeleteForever className='text-red-700 hover:cursor-pointer' /></AlertDialogTrigger>
        //                     <AlertDialogContent>
        //                         <AlertDialogHeader>
        //                             <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        //                             <AlertDialogDescription>
        //                                 This action cannot be undone. This will permanently delete your account
        //                                 and remove your data from our servers.
        //                             </AlertDialogDescription>
        //                         </AlertDialogHeader>
        //                         <AlertDialogFooter>
        //                             <AlertDialogCancel>Cancel</AlertDialogCancel>
        //                             <AlertDialogAction onClick={() => handleDelete(book.id)}>Continue</AlertDialogAction>
        //                         </AlertDialogFooter>
        //                     </AlertDialogContent>
        //                 </AlertDialog>




        //             </div>}
        //         </CardFooter>
        //     </Card >
        // ))}
    )
}

export default AfficheBook
