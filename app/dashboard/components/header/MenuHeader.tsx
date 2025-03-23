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
                    <FaShield className={(role === 'admin') ? 'absolute bottom-0 left-[30%] text-red-700' : "hidden"} />
                    <FaShield className={(role === "modo") ? 'absolute bottom-0 left-[30%] text-blue-700' : "hidden"} />
                </MenubarTrigger>
                <MenubarContent className="border-none">

                    <MenubarItem className=" flex flex-col justify-center items-center w-1/2 relative left-12">
                        <button className='hover:bg-blue-500 rounded px-2.5 text-black' onClick={() => HandleProfil(id)}>Profil</button>
                    </MenubarItem>

                    <MenubarItem className={(role !== "user" && role!=="new" ? "flex flex-col justify-center items-center w-1/2 relative left-12" : "hidden")}>
                        <Link href="/dashboard/invitation" className="hover:bg-blue-500 rounded px-2.5 text-black"><p className='text-black'>Invitation</p></Link>
                    </MenubarItem>

                    <MenubarItem className={(role !== "user" && role!=="new" ? "flex flex-col justify-center items-center w-1/2 relative left-12" : "hidden")}>
                        <Link href="/dashboard/users" className="hover:bg-blue-500 rounded px-2.5 text-black"><p className='text-black'>Utilisateurs</p></Link>
                    </MenubarItem>

                    <MenubarItem className={(role !== "user" && role!=="new" ? "flex flex-col justify-center items-center w-1/2 relative left-12 " : "hidden")}>
                        <Link href="/dashboard/ajout" className="hover:bg-blue-500 rounded"><p className='text-black'>Ajout livre</p></Link>
                    </MenubarItem>

                    <MenubarItem className=" flex flex-col justify-center items-center w-1/2 relative left-12">
                        <button className='hover:bg-blue-500 rounded px-2.5 text-black' onClick={HandleDeconnection}>Déconnection</button>
                    </MenubarItem>

                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default MenuHeader
