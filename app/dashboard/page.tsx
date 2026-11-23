"use client"
import { selectUser } from '@/lib/features/users/userSlice';
import { Dispatch, Selector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';
import { getBooks, selectBokkStatus, selectBook, selectBookPagination } from '@/lib/features/books/bookSlice';
import { Book, BookHomeOverview } from '@/lib/Interface/book.interface';
import { Input } from '@/components/ui/input';
import { FaEye, FaEyeSlash, FaStar } from 'react-icons/fa';
import { MdDeleteForever, MdMode } from 'react-icons/md';
import { useRouter } from 'next/navigation';
import Loading from './loading';
import BookCard from './components/BookCard';
import WelcomeBanner from './components/WelcomeBanner';
import HomeOverviewSection from './components/HomeOverview';
import { downloadBook } from '@/lib/downloadBook';
import { User } from '@/lib/Interface/user.interface';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaginationControls from '@/components/PaginationControls';
import { useDebounce } from '@/lib/hooks/useDebounce';
import apiClient from '@/lib/apiClient';
import Url from '@/lib/Url';
import { getAxiosErrorMessage } from '@/lib/getAxiosErrorMessage';
import { trackEvent } from '@/lib/analytics';
import { categoryLabels } from '@/lib/categoryColors';

const isStaffRole = (role?: string) => role === "admin" || role === "modo";

const categoryFilters = ["", "histoire", "spiritualite", "religion", "philosophie", "roman", "langue"] as const;

const Dashboard = () => {
    const user: User = Selector(selectUser);
    const books: Book[] = Selector(selectBook);
    const pagination = Selector(selectBookPagination);
    const statusBook: string = Selector(selectBokkStatus);
    const [search, setSearch] = useState<string>("");
    const [filtre, setFiltre] = useState<string>("");
    const [page, setPage] = useState<number>(1);
    const [overview, setOverview] = useState<BookHomeOverview | null>(null);
    const itemPerPage = 20;
    const debouncedSearch = useDebounce(search);
    const navigate = useRouter();
    const dispatch = Dispatch();
    const isStaff = isStaffRole(user?.role);
    const canDownload = !(user?.role === "new" && user?.download >= 1);

    const handleCategoryFiltre = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltre(event.target.value);
        setPage(1);
        trackEvent("category_filter", { category: event.target.value || "all" });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1);
    };

    useEffect(() => {
        dispatch(getBooks({ search: debouncedSearch, filtre, page, itemPerPage }));
    }, [debouncedSearch, filtre, page, dispatch, itemPerPage]);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const response = await apiClient.get(Url.booksHome);
                setOverview(response.data.data);
            } catch {
                setOverview(null);
            }
        };
        fetchOverview();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "auto" });
    };

    const handleDelete = (id: string) => {
        navigate.push("/dashboard/deleteBook/" + id);
    };

    const handleUpdate = (id: string) => {
        navigate.push("/dashboard/updateBook/" + id);
    };

    const handleTogglePublish = async (bookId: string, isPublished: boolean) => {
        try {
            await apiClient.patch(`${Url.booksPublish}/${bookId}`, { isPublished: !isPublished });
            toast.success(!isPublished ? "Livre republié" : "Livre masqué");
            dispatch(getBooks({ search: debouncedSearch, filtre, page, itemPerPage }));
        } catch (error) {
            toast.error(getAxiosErrorMessage(error));
        }
    };

    const handleSetFeatured = async (bookId: string) => {
        try {
            await apiClient.patch(`${Url.booksFeatured}/${bookId}`, {});
            toast.success("Sélection du moment mise à jour");
            const response = await apiClient.get(Url.booksHome);
            setOverview(response.data.data);
        } catch (error) {
            toast.error(getAxiosErrorMessage(error));
        }
    };

    const getCategoryLabel = (book: Book): string | undefined => {
        return book.category?.type;
    };

    const showOverview = !debouncedSearch && !filtre && page === 1;

    return (
        <div className="flex w-full max-w-6xl flex-col items-stretch gap-8">
            <div className="flex flex-col gap-2">
                <h1 className="font-serif text-3xl sm:text-4xl">La bibliothèque</h1>
                {user && <WelcomeBanner user={user} />}
            </div>

            {showOverview && <HomeOverviewSection overview={overview} />}

            <div className="flex flex-col gap-4">
                <label className="flex w-full max-w-xl flex-col gap-1.5 text-sm text-muted-foreground" htmlFor="book-search">
                    Recherche
                    <Input
                        id="book-search"
                        type="search"
                        placeholder="Titre ou auteur"
                        className="w-full"
                        value={search}
                        onChange={handleSearchChange}
                    />
                </label>

                <fieldset className="filter-radio flex w-full flex-wrap gap-1">
                    <legend className="sr-only">Catégorie</legend>
                    {categoryFilters.map((value) => (
                        <label key={value || "all"}>
                            <input
                                type="radio"
                                name="categorie"
                                value={value}
                                defaultChecked={value === ""}
                                onChange={handleCategoryFiltre}
                            />
                            {value === "" ? "Tout" : (categoryLabels[value] ?? value)}
                        </label>
                    ))}
                </fieldset>
            </div>

            {(statusBook === "loading" || statusBook === "idle") && <Loading />}
            {(books?.length === 0 && statusBook === "success") && (
                <p className="text-sm text-muted-foreground">Aucun livre ne correspond à cette recherche.</p>
            )}

            <div className="grid w-full grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {books?.map((book: Book) => {
                    const published = book.isPublished !== false;
                    return (
                        <div
                            className={`flex min-w-0 flex-col gap-2 ${!published ? "opacity-60" : ""}`}
                            key={book.id}
                        >
                            <div className="relative">
                                {!published && (
                                    <span className="badge-hidden absolute right-2 top-2 z-10">Masqué</span>
                                )}
                                {book.isFeatured && (
                                    <span className="badge-featured absolute left-2 top-2 z-10">Sélection</span>
                                )}
                                <BookCard
                                    title={book.title}
                                    author={book.author}
                                    category={getCategoryLabel(book)}
                                    onClick={
                                        published && canDownload
                                            ? () => downloadBook(book.id, book.title, getCategoryLabel(book))
                                            : undefined
                                    }
                                    disabled={published && !canDownload}
                                />
                            </div>
                            {isStaff && (
                                <div className="flex items-center justify-center gap-1 text-base text-muted-foreground">
                                    <button
                                        type="button"
                                        onClick={() => handleTogglePublish(book.id, published)}
                                        className="rounded p-1 transition-colors hover:text-primary"
                                        aria-label={published ? "Masquer le livre" : "Publier le livre"}
                                        title={published ? "Masquer" : "Publier"}
                                    >
                                        {!published ? <FaEye className="text-primary" /> : <FaEyeSlash />}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSetFeatured(book.id)}
                                        className="rounded p-1 transition-colors hover:text-primary"
                                        aria-label="Mettre en avant"
                                        title="Sélection du moment"
                                    >
                                        <FaStar className={book.isFeatured ? "text-primary" : "text-muted-foreground"} />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleUpdate(book.id)}
                                        className="rounded p-1 transition-colors hover:text-primary"
                                        aria-label="Modifier"
                                        title="Modifier"
                                    >
                                        <MdMode />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleDelete(book.id)}
                                        className="rounded p-1 transition-colors hover:text-destructive"
                                        aria-label="Supprimer"
                                        title="Supprimer"
                                    >
                                        <MdDeleteForever />
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {books.length > 0 && (
                <PaginationControls
                    pagination={pagination}
                    className="mt-4"
                    onPrevious={() => { if (pagination.hasPreviousPage) { setPage(page - 1); scrollToTop(); } }}
                    onNext={() => { if (pagination.hasNextPage) { setPage(page + 1); scrollToTop(); } }}
                    onBegin={() => { setPage(1); scrollToTop(); }}
                    onEnd={() => { if (pagination.totalPages > 0) { setPage(pagination.totalPages); scrollToTop(); } }}
                />
            )}
            <ToastContainer theme="dark" autoClose={2000} />
        </div>
    )
};

export default Dashboard;
