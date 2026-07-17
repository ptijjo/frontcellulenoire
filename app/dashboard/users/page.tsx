"use client"
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import apiClient from '@/lib/apiClient';
import Url from '@/lib/Url';
import { User } from '@/lib/Interface/user.interface';
import { PaginationMeta } from '@/lib/Interface/pagination.interface';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import PaginationControls from '@/components/PaginationControls';
import { useDebounce } from '@/lib/hooks/useDebounce';

const defaultPagination: PaginationMeta = {
    page: 1,
    itemPerPage: 20,
    total: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
};

const Users = () => {
    const [search, setSearch] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const itemPerPage = 20;
    const debouncedSearch = useDebounce(search);
    const [users, setUsers] = useState<User[]>([]);
    const [pagination, setPagination] = useState<PaginationMeta>(defaultPagination);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await apiClient.get(Url.userById, {
                params: { search: debouncedSearch, page, itemPerPage }
            });
            setUsers(response.data.data);
            setPagination(response.data.pagination ?? defaultPagination);
        };

        fetchUsers();
    }, [debouncedSearch, page, itemPerPage]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "auto" });
    };

    return (
        <div className="flex w-full max-w-5xl flex-col items-center gap-5">
            <h1 className="font-serif text-2xl sm:text-3xl">Utilisateurs</h1>

            <Input
                type="search"
                placeholder="Rechercher un utilisateur…"
                className="w-full max-w-md"
                value={search}
                onChange={handleSearchChange}
                aria-label="Recherche utilisateur"
            />

            {(users?.length === 0) && (
                <p className="text-muted-foreground">Aucun utilisateur trouvé.</p>
            )}

            <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:gap-4">
                {users?.map((user: User) => (
                    <Link href={`/dashboard/users/${user.id}`} key={user.id} className="group">
                        <Card className="flex h-full flex-col items-center gap-2 overflow-hidden transition-transform hover:scale-[1.02]">
                            <CardHeader className="w-full p-3 pb-0">
                                <CardTitle className="truncate text-center text-sm">{user.pseudo}</CardTitle>
                            </CardHeader>
                            <CardContent className="relative h-[100px] w-[100px] overflow-hidden rounded-full border border-border sm:h-[120px] sm:w-[120px]">
                                <Image
                                    src={user.avatar}
                                    alt={user.pseudo}
                                    fill
                                    priority
                                    sizes="120px"
                                    className="object-cover"
                                />
                            </CardContent>
                            <CardFooter className="flex w-full flex-col items-center gap-1 pb-4 text-xs text-muted-foreground">
                                <span className="rounded-full bg-secondary px-2 py-0.5 capitalize">{user.role}</span>
                                <span>{user.download} téléchargement(s)</span>
                            </CardFooter>
                        </Card>
                    </Link>
                ))}
            </div>

            {users.length > 0 && (
                <PaginationControls
                    pagination={pagination}
                    className="mt-4"
                    onPrevious={() => { if (pagination.hasPreviousPage) { setPage(page - 1); scrollToTop(); } }}
                    onNext={() => { if (pagination.hasNextPage) { setPage(page + 1); scrollToTop(); } }}
                    onBegin={() => { setPage(1); scrollToTop(); }}
                    onEnd={() => { if (pagination.totalPages > 0) { setPage(pagination.totalPages); scrollToTop(); } }}
                />
            )}
        </div>
    )
}

export default Users;
