"use client"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Download } from '@/lib/Interface/user.interface';
import Url from '@/lib/Url';
import apiClient from '@/lib/apiClient';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Selector } from '@/lib/hooks';
import { selectUser } from '@/lib/features/users/userSlice';
import dayjs from "dayjs";
import { getAxiosErrorMessage } from '@/lib/getAxiosErrorMessage';
import { toast } from 'react-toastify';
import ConvertisseurNom from '@/lib/ConvertisseurNom';

const Userid = ({ params }: { params: { id: string } }) => {
    const id = params.id as string;
    const [user, setUser] = useState<User | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [role, setRole] = useState<string>("");
    const connected = Selector(selectUser);
    const navigate = useRouter();

    useEffect(() => {
        const fetchUser = async (userId: string): Promise<User> => {
            const response = await apiClient.get(Url.userById + "/" + userId, {
                params: { id: userId }
            });
            setUser(response.data.data);
            setRole(response.data.data.role);
            return response.data.data;
        };

        fetchUser(id);
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
            await apiClient.put(Url.updateRole + "/" + id, { role });
            navigate.push("/dashboard/users");
        } catch (error: unknown) {
            toast.error(getAxiosErrorMessage(error));
        }
    };

    if (!user) return null;

    return (
        <div className="flex w-full max-w-lg flex-col items-center gap-6 py-8">
            <Card className="flex w-full max-w-xs flex-col items-center gap-3 overflow-hidden">
                <CardHeader className="w-full p-4 pb-0">
                    <CardTitle className="text-center">
                        <p className="truncate">{user.pseudo}</p>
                        <p className="mt-1 truncate text-xs font-normal text-muted-foreground">{user.email}</p>
                    </CardTitle>
                </CardHeader>
                <CardContent className="relative h-[120px] w-[120px] overflow-hidden rounded-full border border-border">
                    <Image src={user.avatar as string} alt={user.pseudo as string} fill priority sizes="120px" className="object-cover" />
                </CardContent>
                {connected.role === "admin" && (
                    <CardFooter className="cursor-pointer pb-4 capitalize text-muted-foreground hover:text-primary" onClick={() => handleClick()}>
                        Rôle : {user.role}
                    </CardFooter>
                )}
            </Card>

            {open && (
                <form className="surface-card flex w-full max-w-xs flex-col gap-4 p-6">
                    <Label htmlFor="role">Modifier le rôle</Label>
                    <select id="role" className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="modo">Modo</option>
                        <option value="user">User</option>
                        <option value="new">New User</option>
                    </select>
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Button type="button" variant="outline" className="flex-1" onClick={(e) => handleCancel(e)}>Annuler</Button>
                        <Button type="button" className="flex-1" onClick={(e) => handleSubmit(e)}>Valider</Button>
                    </div>
                </form>
            )}

            {user.downloaded.length > 0 && (
                <section className="surface-card w-full p-4 sm:p-5">
                    <h2 className="mb-3 font-serif text-lg">Historique des téléchargements</h2>
                    <ul className="space-y-2 text-sm">
                        {user.downloaded.map((downloadBook: Download) => (
                            <li key={downloadBook.id} className="flex flex-col gap-0.5 border-b border-border/60 pb-2 sm:flex-row sm:justify-between">
                                <ConvertisseurNom id={downloadBook.bookId} />
                                <span className="text-muted-foreground">{dayjs(downloadBook.createdAt).format("DD/MM/YYYY HH:mm")}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}

export default Userid
