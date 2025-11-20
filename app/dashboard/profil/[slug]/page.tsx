"use client"
import React, { useState } from 'react'
import { FaShield } from "react-icons/fa6";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Selector } from '@/lib/hooks';
import { selectUser, selectUserError, selectUserStatus, updatePseudo } from '@/lib/features/users/userSlice';
import { Dispatch } from '../../../../lib/hooks';
import Image from 'next/image';



const Profil = ({ params }: { params: { slug: string } }) => {

    const user = Selector(selectUser);
    const [open, setOpen] = useState<boolean>(false);
    const [pseudo, setPseudo] = useState<string>("");
    const dispatch = Dispatch();
    const statusUser = Selector(selectUserStatus);
    const statusUserError = Selector(selectUserError);


    const handleOpen = () => {
        setOpen(!open);
        if (!open && user) {
            setPseudo(user.pseudo);
        }
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            dispatch(updatePseudo({ id: params.slug, data: pseudo }));
            (statusUser !== "success" && statusUser !== "loading" && statusUserError) ? setOpen(true) : setOpen(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleCancel = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        setOpen(false)
    };

    console.log(open)
    return (
        <>
            <h1 className='m-12 items-center text-2xl font-medium'>Mon profil</h1>
            <div className='flex items-center gap-1.5'>
                <div className='w-[80px] h-[80px] rounded-full relative'>
                    <Image src={user?.avatar} alt="avatar" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" priority className='w-full h-full rounded-full' />
                    {(user?.role === "admin") && <FaShield className='absolute bottom-[-5px] right-[-10%] text-red-700 text-3xl' />}
                    {(user?.role === "modo") && <FaShield className='absolute bottom-[-5px] right-[-10%] text-blue-700 text-3xl' />}
                </div>
                <p className='text-3xl hover:text-red-700 hover:cursor-pointer' onClick={handleOpen}>{user?.pseudo}</p>
            </div>

            <form className={(!open && user) ? "hidden" : 'flex flex-col items-center justify-center w-[40%] gap-2.5'}>
                <Label className='text-center'>Pseudo</Label>
                <Input type='text' value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                <p className={(statusUser === "failed") ? 'text-red-700' : "hidden"}>Pseudo déja existant !!</p>
                <div className='flex flex-row items-center justify-center gap-3.5'>
                    <Button onClick={(e) => handleCancel(e)} className='bg-red-500 hover:bg-red-400'>Annuler</Button>
                    <Button onClick={(e) => handleSubmit(e)} className='bg-blue-500 hover:bg-blue-400'>Valider</Button>
                </div>
            </form>
        </>
    )
}

export default Profil;
