"use client";

import React, { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";
import Url from "@/lib/Url";
import { AdminDashboardStats } from "@/lib/Interface/admin.interface";
import { getAxiosErrorMessage } from "@/lib/getAxiosErrorMessage";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Selector } from "@/lib/hooks";
import { selectUser } from "@/lib/features/users/userSlice";
import Loading from "../loading";
import { categoryLabels } from "@/lib/categoryColors";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
    const user = Selector(selectUser);
    const router = useRouter();
    const [stats, setStats] = useState<AdminDashboardStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user.role !== "admin" && user.role !== "modo") {
            router.push("/dashboard");
        }
    }, [user, router]);

    const fetchStats = async () => {
        try {
            const response = await apiClient.get(Url.adminDashboard);
            setStats(response.data.data);
        } catch (error) {
            toast.error(getAxiosErrorMessage(error, "Impossible de charger le tableau de bord"));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const handleTogglePublish = async (bookId: string, isPublished: boolean) => {
        try {
            await apiClient.patch(`${Url.booksPublish}/${bookId}`, { isPublished });
            toast.success(isPublished ? "Livre republié" : "Livre masqué");
            fetchStats();
        } catch (error) {
            toast.error(getAxiosErrorMessage(error));
        }
    };

    const handleSetFeatured = async (bookId: string) => {
        try {
            await apiClient.patch(`${Url.booksFeatured}/${bookId}`, {});
            toast.success("Sélection du moment mise à jour");
            fetchStats();
        } catch (error) {
            toast.error(getAxiosErrorMessage(error));
        }
    };

    if (loading) return <Loading />;
    if (!stats) return <p className="mt-8 text-muted-foreground">Aucune donnée disponible.</p>;

    return (
        <div className="flex w-full max-w-5xl flex-col gap-6 pb-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="font-serif text-2xl sm:text-3xl">Tableau de bord admin</h1>
                    <p className="text-sm text-muted-foreground">Vue d&apos;ensemble de l&apos;activité de la bibliothèque</p>
                </div>
                <Button asChild>
                    <Link href="/dashboard/ajout">Ajouter un livre</Link>
                </Button>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                <StatCard label="Livres publiés" value={stats.totals.publishedBooks} />
                <StatCard label="Livres masqués" value={stats.totals.unpublishedBooks} />
                <StatCard label="Utilisateurs" value={stats.totals.users} />
                <StatCard label="Téléchargements ce mois" value={stats.totals.downloadsThisMonth} />
                <StatCard label="Nouveaux utilisateurs" value={stats.totals.newUsersThisMonth} />
                <StatCard label="Total livres" value={stats.totals.books} />
            </div>

            <section className="surface-card p-4 sm:p-5">
                <h2 className="mb-3 font-serif text-lg">Top 5 des livres téléchargés</h2>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-sm">
                        <thead>
                            <tr className="border-b border-border text-left text-muted-foreground">
                                <th className="py-2 pr-2">Titre</th>
                                <th className="py-2 pr-2">Auteur</th>
                                <th className="py-2 pr-2">Catégorie</th>
                                <th className="py-2 pr-2">Tél.</th>
                                <th className="py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stats.topDownloadedBooks.map((book) => (
                                <tr key={book.id} className="border-b border-border/60">
                                    <td className="py-2 pr-2">{book.title}</td>
                                    <td className="py-2 pr-2">{book.author}</td>
                                    <td className="py-2 pr-2">{categoryLabels[book.category] ?? book.category}</td>
                                    <td className="py-2 pr-2">{book.downloadCount}</td>
                                    <td className="py-2">
                                        <div className="flex flex-wrap gap-2">
                                            <button
                                                type="button"
                                                className="rounded border border-border px-2 py-1 text-xs transition-colors hover:bg-secondary"
                                                onClick={() => handleTogglePublish(book.id, !book.isPublished)}
                                            >
                                                {book.isPublished ? "Masquer" : "Publier"}
                                            </button>
                                            <button
                                                type="button"
                                                className={`rounded border border-border px-2 py-1 text-xs transition-colors hover:bg-secondary ${book.isFeatured ? "border-primary bg-primary/15 text-primary" : ""}`}
                                                onClick={() => handleSetFeatured(book.id)}
                                            >
                                                {book.isFeatured ? "Sélection actuelle" : "Mettre en avant"}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            <div className="grid gap-4 lg:grid-cols-2">
                <section className="surface-card p-4 sm:p-5">
                    <h2 className="mb-3 font-serif text-lg">Utilisateurs actifs (30 jours)</h2>
                    {stats.activeUsers.length === 0 && <p className="text-sm text-muted-foreground">Aucune activité récente.</p>}
                    <ul className="space-y-2">
                        {stats.activeUsers.map((activeUser) => (
                            <li key={activeUser.id} className="flex justify-between gap-2 border-b border-border/60 pb-1 text-sm">
                                <Link href={`/dashboard/users/${activeUser.id}`} className="truncate text-primary hover:underline">{activeUser.pseudo}</Link>
                                <span className="shrink-0 text-muted-foreground">{activeUser.downloadCount} tél.</span>
                            </li>
                        ))}
                    </ul>
                </section>

                <section className="surface-card p-4 sm:p-5">
                    <h2 className="mb-3 font-serif text-lg">Catégories vides</h2>
                    {stats.emptyCategories.length === 0 && (
                        <p className="text-sm text-green-500">Toutes les catégories ont au moins un livre publié.</p>
                    )}
                    <ul className="space-y-1">
                        {stats.emptyCategories.map((category) => (
                            <li key={category.id} className="text-sm text-orange-400">
                                {categoryLabels[category.type] ?? category.type}
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {stats.unpublishedBooks.length > 0 && (
                <section className="surface-card p-4 sm:p-5">
                    <h2 className="mb-3 font-serif text-lg">Livres masqués (modération)</h2>
                    <ul className="space-y-2">
                        {stats.unpublishedBooks.map((book) => (
                            <li key={book.id} className="flex flex-col gap-2 border-b border-border/60 pb-2 text-sm sm:flex-row sm:items-center sm:justify-between">
                                <span>{book.title} — {book.author}</span>
                                <button
                                    type="button"
                                    className="rounded border border-border px-2 py-1 text-xs transition-colors hover:bg-secondary sm:shrink-0"
                                    onClick={() => handleTogglePublish(book.id, true)}
                                >
                                    Republier
                                </button>
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            <ToastContainer theme="dark" autoClose={2000} />
        </div>
    );
};

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="surface-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
            <p className="mt-1 font-serif text-2xl sm:text-3xl">{value}</p>
        </div>
    );
}

export default AdminDashboard;
