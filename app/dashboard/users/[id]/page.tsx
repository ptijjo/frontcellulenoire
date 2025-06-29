"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Download } from '@/lib/Interface/user.interface';
import Url from '@/lib/Url';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';
import { Selector } from '@/lib/hooks';
import { selectUser } from '@/lib/features/users/userSlice';
import dayjs from "dayjs";
import ConvertisseurNom from '@/lib/ConvertisseurNom';


const Userid = ({ params }: { params: { id: string } }) => {
    const id = params.id as string;
    const [user, setUser] = useState<User | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [role, setRole] = useState<string>("");
    const connected = Selector(selectUser);

    const navigate = useRouter();


    useEffect(() => {

        const user = async (id: string): Promise<User> => {
            const response = await axios.get(Url.userById + "/" + id, {
                withCredentials: true,
                params: { id }
            })
            setUser(response.data.data);
            setRole(response.data.data.role);
            return response.data.data;
        };

        user(id);


    }, [id]);


    const handleClick = () => {
        setOpen(!open);
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setOpen(false);
    };



    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            await axios.put(Url.updateRole + "/" + id, {
                role: role
            }, {
                withCredentials: true,
            });
            navigate.push("/dashboard/users");
        } catch (error: any) {
            const message = error.response?.data?.message || "Une erreur s'est produite";
            console.log(message);
        }
    };

    console.log(user)

    if (user) return (
        <div className='flex flex-col items-center justify-center w-full relative top-[-50%] transform translate-y-1/2'>
            <Card className='flex flex-col  items-center w-[40%] h-[280px] shadow-lg gap-3.5 text-ellipsis overflow-hidden'>
                <CardHeader className='flex flex-col w-full p-0'>
                    <CardTitle className=' flex flex-col w-full'>
                        <p className='text-md text-start w-full p-1'>{user?.pseudo}</p>
                        <p className='text-xs text-center'>{user?.email}</p>
                    </CardTitle>
                </CardHeader>
                <CardContent className='rounded-full w-[150px] h-[150px] flex justify-center items-center border relative overflow-hidden'>
                    <Image src={user?.avatar as string}
                        alt={user?.pseudo as string}
                        fill
                        priority
                        sizes="150px"
                    />
                </CardContent>
                <CardFooter className={(connected.role === "admin") ? 'flex flex-row h-[40px] m-0 p-0 text-xl items-center justify-center cursor-pointer' : "hidden"} onClick={() => handleClick()}>
                    <div className='flex flex-row items-center justify-center h-full gap-2.5 m-2.5'>
                        {user?.role}
                    </div>
                </CardFooter>
            </Card >
            <form className={(open) ? 'flex flex-col items-center justify-center w-[40%]' : "hidden"}>

                <Label htmlFor='role' className='flex justify-center mt-3.5'>Choisir le genre : </Label>
                <select id='role' className='w-[40%] mx-auto mb-3.5' value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="modo">Modo</option>
                    <option value="user">User</option>
                    <option value="new">New User</option>

                </select>
                <div className='flex flex-row items-center justify-center w-full gap-3.5'>
                    <button className='bg-red-500 text-white p-2.5 rounded mt-5 w-[40%]' onClick={(e) => handleCancel(e)}>annuler</button>
                    <button className='bg-blue-500 text-white p-2.5 rounded mt-5 w-[40%]' onClick={(e) => handleSubmit(e)}>Valider</button>
                </div>
            </form >
            <div>
                {user?.downloaded.map((downloadBook: Download) => (
                    <ul key={downloadBook.id}>
                        <li>
                            <ConvertisseurNom id={downloadBook.bookId} />  - {dayjs(downloadBook.createdAt).format("DD/MM/YYYY HH:mm:ss")}
                        </li>
                    </ul>
                ))}
            </div>
        </div >
    );
}


export default Userid
