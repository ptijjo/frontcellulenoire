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
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FaShield } from "react-icons/fa6";
import { logout } from '@/lib/features/users/userSlice';

interface HeaderProps {
    pseudo: string;
    id: string;
    avatar: string;
    role: string;
}

const MenuHeader: React.FC<HeaderProps> = ({ pseudo, id, avatar, role }) => {
    const dispatch = Dispatch();
    const router = useRouter();
    const isStaff = role !== "user" && role !== "new";

    const HandleDeconnection = () => {
        dispatch(logout());
        router.push("/");
    };

    const HandleProfil = (userId: string) => {
        router.push(`/dashboard/profil/${userId}`)
    }

    return (
        <Menubar className="border-none bg-transparent shadow-none">
            <MenubarMenu>
                <MenubarTrigger className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-secondary/50 px-2 py-1.5 text-sm sm:gap-3 sm:px-3">
                    <Avatar className="h-8 w-8 sm:h-9 sm:w-9">
                        <AvatarImage src={avatar} alt="Profil" />
                        <AvatarFallback className="bg-muted text-muted-foreground">CN</AvatarFallback>
                    </Avatar>
                    <p className="max-w-[100px] truncate sm:max-w-[160px]">{pseudo}</p>
                    {role === 'admin' && <FaShield className="shrink-0 text-red-500" />}
                    {role === 'modo' && <FaShield className="shrink-0 text-primary" />}
                </MenubarTrigger>
                <MenubarContent className="border-border bg-card text-foreground">
                    <MenubarItem className="focus:bg-secondary">
                        <button type="button" className="w-full text-left" onClick={() => HandleProfil(id)}>Profil</button>
                    </MenubarItem>

                    {isStaff && (
                        <>
                            <MenubarItem className="focus:bg-secondary">
                                <Link href="/dashboard/admin" className="w-full">Tableau de bord</Link>
                            </MenubarItem>
                            <MenubarItem className="focus:bg-secondary">
                                <Link href="/dashboard/invitation" className="w-full">Invitation</Link>
                            </MenubarItem>
                            <MenubarItem className="focus:bg-secondary">
                                <Link href="/dashboard/users" className="w-full">Utilisateurs</Link>
                            </MenubarItem>
                            <MenubarItem className="focus:bg-secondary">
                                <Link href="/dashboard/ajout" className="w-full">Ajouter un livre</Link>
                            </MenubarItem>
                        </>
                    )}

                    <MenubarItem className="focus:bg-secondary">
                        <button type="button" className="w-full text-left text-destructive" onClick={HandleDeconnection}>
                            Déconnexion
                        </button>
                    </MenubarItem>
                </MenubarContent>
            </MenubarMenu>
        </Menubar>
    )
}

export default MenuHeader
