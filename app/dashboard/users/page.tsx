"use client"
import { Input } from '@/components/ui/input'
import { Dispatch } from '@/lib/hooks';
import React, { useEffect, useState } from 'react'
import { Book } from '../../../lib/Interface/book.interface';
import axios from 'axios';
import Url from '@/lib/Url';
import { User } from '@/lib/Interface/user.interface';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';

const Users = () => {
    const [token, setToken] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [itemPerPage, setItemPerPage] = useState<number>(20);
    const [users, setUsers] = useState<User[] | []>([]);
    const dispatch = Dispatch();


    //Vérification du token pour vérifier l'autorisation d'afficher les livres
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        }
    }, [token]);

    useEffect(() => {
        if (token) {
            const allBook = async (token: string, search: string, page: number, itemPerpage: number): Promise<Book[]> => {

                const response = await axios.get(Url.userById, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                    params: { search, page, itemPerPage }
                })
                setUsers(response.data.data);
                return response.data.data;
            };

            allBook(token, search, page, itemPerPage);
        };

    }, [token, search, page]);

    const handleNext = () => {
        setPage(page + 1);
    };

    const handleBefore = () => {
        setPage(page - 1)

        if (page == 1) setPage(1)
    };

    const handleClick = (e: string) => {
        console.log(e)

    }

    return (
        <>
            {/* Affichagede la barre de recherche */}
            <div className='flex flex-row items-center justify-center w-[80%] lg:w-[60%]'>
                <Input type='search' placeholder="Recherche utilisateur" className='w-[80%] lg:w-[60%] rounded' value={search} onChange={(e) => setSearch(e.target.value)} aria-label="Search" />
            </div>

            {(users?.length === 0) && <div className='mt-[20px]'>Aucun utilisateur ! </div>}

            <div className='flex flex-row flex-wrap w-full gap-3.5 p-2.5 items-center justify-center'>
                {users?.map((user: User) => (
                    <Link href={`/dashboard/users/${user.id}`} className='flex- flex-col items-center w-[40%] h-[230px] lg:w-[18%] lg:h-[200px]'>
                        <Card className='flex flex-col  items-center w-full h-[280px] hover:scale-[105%] shadow-lg gap-3.5 text-ellipsis overflow-hidden transition-all' key={user.id}>
                            <CardHeader className='flex flex-col w-full p-0'>
                                <CardTitle className=' flex flex-col w-full'>
                                    <p className='text-md text-start w-full p-1'>{user.pseudo}</p>
                                    <p className='text-xs text-center'>{user.email}</p>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className='rounded-full w-[150px] h-[150px] flex justify-center items-center border relative overflow-hidden'>
                                <Image src={user.avatar}
                                    alt={user.pseudo}
                                    fill
                                    priority
                                />
                            </CardContent>
                            <CardFooter className='flex flex-row h-[40px] m-0 p-0 text-xl items-center justify-center'>
                                <div className='flex flex-row items-center justify-center h-full gap-2.5 m-2.5'>
                                    {user.role}
                                </div>
                            </CardFooter>
                        </Card >
                    </Link>
                ))}

            </div>

            {/* Pagination */}
            <div className={(users.length !== 0) ? 'flex gap-3.5 mt-32' : "hidden"}>
                <p onClick={handleBefore} className={(page === 1) ? "hidden" : 'cursor-pointer'}>Precedent</p>
                <p>---</p>
                <p onClick={handleNext} className={(users.length==itemPerPage) ? 'cursor-pointer' : "hidden"} >Suivant</p>
            </div>
        </ >
    )
}

export default Users