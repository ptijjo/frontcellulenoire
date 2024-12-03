"use client"
import React from 'react';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dispatch } from '@/lib/hooks';
import { logout } from '@/lib/features/users/userSlice';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaShield } from "react-icons/fa6";


interface HeaderProps {
    pseudo: string;
    id: string;
    avatar: string;
    role: string;
}

const MenuHeader: React.FC<HeaderProps> = ({ pseudo, id, avatar, role }) => {
    const dispatch = Dispatch();
    const router = useRouter();

    const HandleDeconnection = () => {
        dispatch(logout());
        router.push("/");

    };


    const HandleProfil = (id: string) => {
        router.push(`/dashboard/profil/${id}`)
    }

    return (
        <Menubar className="border-none text-black -mx-3 shadow-none">
            <MenubarMenu>
                <MenubarTrigger className="text-lg gap-3 relative" value="bouton_menu" tabIndex={-1} aria-label="bouton_menu" id="bouton_menu" title="bouton_menu">
                    <Avatar className="cursor-pointer">
                        <AvatarImage src={avatar} alt="image de profil" className='' />
                        <AvatarFallback>avatar</AvatarFallback>
                    </Avatar>
                    <p>{pseudo}</p>
                    {(role === "admin") && <FaShield className='absolute bottom-0 left-[35%] text-red-700' />}
                    {(role === "modo") && <FaShield className='absolute bottom-0 left-[35%] text-blue-700' />}
                </MenubarTrigger>
                <MenubarContent className="border-none">

                    <MenubarItem className=" flex flex-col justify-center items-center w-1/2 relative left-12">
                        <button className='bg-slate-600 rounded px-2.5 text-white' onClick={() => HandleProfil(id)}>Profil</button>
                    </MenubarItem>

                    <MenubarItem className={(role !== "user" ? "flex flex-col justify-center items-center w-1/2 relative left-12" : "hidden")}>
                        <Link href="/dashboard/invitation" className="bg-slate-600 rounded px-2.5 text-white"><p className='text-white'>Invitation</p></Link>
                    </MenubarItem>

                    <MenubarItem className={(role !== "user" ? "flex flex-col justify-center items-center w-1/2 relative left-12" : "hidden")}>
                        <Link href="/dashboard/users" className="bg-slate-600 rounded px-2.5 text-white"><p className='text-white'>Utilisateurs</p></Link>
                    </MenubarItem>

                    <MenubarItem className={(role !== "user" ? "flex flex-col justify-center items-center w-1/2 relative left-12 " : "hidden")}>
                        <Link href="/dashboard/ajout" className="bg-slate-600 rounded px-2.5 "><p className='text-white'>ajout de livre</p></Link>
                    </MenubarItem>

                    <MenubarItem className=" flex flex-col justify-center items-center w-1/2 relative left-12">
                        <button className='bg-slate-600 rounded px-2.5 text-white' onClick={HandleDeconnection}>Déconnection</button>
                    </MenubarItem>

                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default MenuHeader
