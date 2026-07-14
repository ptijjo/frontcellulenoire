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
        e.preventDefault();
        setOpen(false);
    };

    return (
        <div className="flex w-full max-w-md flex-col items-center gap-6 py-8">
            <h1 className="font-serif text-2xl sm:text-3xl">Mon profil</h1>

            <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-border sm:h-24 sm:w-24">
                    <Image src={user?.avatar ?? ""} alt="avatar" fill sizes="96px" priority className="object-cover" />
                    {(user?.role === "admin") && <FaShield className="absolute -bottom-1 -right-1 text-xl text-red-500" />}
                    {(user?.role === "modo") && <FaShield className="absolute -bottom-1 -right-1 text-xl text-primary" />}
                </div>
                <button
                    type="button"
                    className="font-serif text-2xl transition-colors hover:text-primary"
                    onClick={handleOpen}
                >
                    {user?.pseudo}
                </button>
            </div>

            <form className={(!open && user) ? "hidden" : "surface-card flex w-full flex-col gap-4 p-6"}>
                <Label className="text-center">Pseudo</Label>
                <Input type="text" value={pseudo} onChange={(e) => setPseudo(e.target.value)} />
                {statusUser === "failed" && (
                    <p className="text-center text-sm text-destructive">Pseudo déjà existant</p>
                )}
                <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
                    <Button type="button" variant="outline" onClick={(e) => handleCancel(e)}>Annuler</Button>
                    <Button type="button" onClick={(e) => handleSubmit(e)}>Valider</Button>
                </div>
            </form>
        </div>
    );
}

export default Profil;
