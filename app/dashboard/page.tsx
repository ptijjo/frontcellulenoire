"use client"
import { selectUser } from '@/lib/features/users/userSlice';
import { Dispatch, Selector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react';
import { getBooks, selectBokkStatus, selectBook, selectBookPagination } from '@/lib/features/books/bookSlice';
import { Book, BookHomeOverview } from '@/lib/Interface/book.interface';
import { Input } from '@/components/ui/input';
import { FaDownload, FaEye, FaEyeSlash, FaStar } from 'react-icons/fa';
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
import axios from 'axios';
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

    const handleCategoryFiltre = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFiltre(event.target.value);
        setPage(1);
        trackEvent("category_filter", { category: event.target.value || "all" });
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1);
    };

    const handleCategoryFromOverview = (category: string) => {
        setFiltre(category);
        setPage(1);
        const radio = document.querySelector(`input[name="categorie"][value="${category}"]`) as HTMLInputElement | null;
        if (radio) radio.checked = true;
    };

    useEffect(() => {
        dispatch(getBooks({ search: debouncedSearch, filtre, page, itemPerPage }));
    }, [debouncedSearch, filtre, page, dispatch, itemPerPage]);

    useEffect(() => {
        const fetchOverview = async () => {
            try {
                const response = await axios.get(Url.booksHome, { withCredentials: true });
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
            await axios.patch(`${Url.booksPublish}/${bookId}`, { isPublished: !isPublished }, { withCredentials: true });
            toast.success(!isPublished ? "Livre republié" : "Livre masqué");
            dispatch(getBooks({ search: debouncedSearch, filtre, page, itemPerPage }));
        } catch (error) {
            toast.error(getAxiosErrorMessage(error));
        }
    };

    const handleSetFeatured = async (bookId: string) => {
        try {
            await axios.patch(`${Url.booksFeatured}/${bookId}`, {}, { withCredentials: true });
            toast.success("Sélection du moment mise à jour");
            const response = await axios.get(Url.booksHome, { withCredentials: true });
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
        <div className="flex w-full max-w-5xl flex-col items-center gap-5 sm:gap-6">
            <h1 className="text-center font-serif text-2xl sm:text-3xl">Bibliothèque cellule noire</h1>

            {user && <WelcomeBanner user={user} />}

            {showOverview && (
                <HomeOverviewSection
                    overview={overview}
                    onCategorySelect={handleCategoryFromOverview}
                    activeCategory={filtre}
                />
            )}

            <Input
                type="search"
                placeholder="Rechercher un ouvrage…"
                className="w-full max-w-md"
                value={search}
                onChange={handleSearchChange}
                aria-label="Recherche"
            />

            <fieldset className="filter-radio flex w-full max-w-2xl flex-wrap justify-center gap-2">
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

            {(statusBook === "loading" || statusBook === "idle") && <Loading />}
            {(books?.length === 0 && statusBook === "success") && (
                <p className="text-muted-foreground">Pas de livres disponibles.</p>
            )}

            <div className="grid w-full grid-cols-2 place-items-center gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-6">
                {books?.map((book: Book) => (
                    <div
                        className={`group relative flex flex-col items-center pb-10 ${book.isPublished === false ? "opacity-60" : ""}`}
                        key={book.id}
                    >
                        {book.isPublished === false && (
                            <span className="badge-hidden absolute right-0 top-0 z-10">Masqué</span>
                        )}
                        {book.isFeatured && (
                            <span className="badge-featured absolute left-0 top-0 z-10">Sélection</span>
                        )}
                        <BookCard title={book.title} author={book.author} category={getCategoryLabel(book)} />
                        <div className="absolute bottom-0 flex items-center gap-2 text-lg text-muted-foreground">
                            {book.isPublished !== false && (
                                <button
                                    type="button"
                                    onClick={() => downloadBook(book.id, book.title, getCategoryLabel(book))}
                                    className="rounded p-1 transition-colors hover:text-primary"
                                    aria-label={`Télécharger ${book.title}`}
                                >
                                    <FaDownload />
                                </button>
                            )}
                            {isStaff && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => handleTogglePublish(book.id, book.isPublished !== false)}
                                        className="rounded p-1 transition-colors hover:text-primary"
                                        aria-label="Modérer"
                                    >
                                        {book.isPublished === false ? <FaEye className="text-green-500" /> : <FaEyeSlash className="text-orange-400" />}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleSetFeatured(book.id)}
                                        className="rounded p-1 transition-colors hover:text-primary"
                                        aria-label="Mettre en avant"
                                    >
                                        <FaStar className={book.isFeatured ? "text-primary" : "text-muted-foreground"} />
                                    </button>
                                    <button type="button" onClick={() => handleUpdate(book.id)} className="rounded p-1 transition-colors hover:text-primary" aria-label="Modifier">
                                        <MdMode />
                                    </button>
                                    <button type="button" onClick={() => handleDelete(book.id)} className="rounded p-1 transition-colors hover:text-destructive" aria-label="Supprimer">
                                        <MdDeleteForever />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
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
