"use client";

import React from "react";
import { Book, BookHomeOverview } from "@/lib/Interface/book.interface";
import BookCard from "./BookCard";
import { downloadBook } from "@/lib/downloadBook";
import { Button } from "@/components/ui/button";

interface HomeOverviewProps {
    overview: BookHomeOverview | null;
}

const HomeOverviewSection = ({ overview }: HomeOverviewProps) => {
    if (!overview) return null;

    const featured = overview.featuredBook;

    return (
        <div className="flex w-full flex-col gap-10">
            {featured && (
                <section className="flex flex-col gap-6 border-b border-border pb-10 sm:flex-row sm:items-end">
                    <BookCard
                        title={featured.title}
                        author={featured.author}
                        category={featured.category?.type}
                        compact
                    />
                    <div className="min-w-0">
                        <h2 className="font-serif text-3xl leading-tight sm:text-4xl">{featured.title}</h2>
                        <p className="mt-2 text-sm text-muted-foreground">par {featured.author}</p>
                        <Button
                            type="button"
                            className="mt-5"
                            onClick={() => downloadBook(featured.id, featured.title, featured.category?.type)}
                        >
                            Télécharger
                        </Button>
                    </div>
                </section>
            )}

            {overview.recentBooks.length > 0 && (
                <section>
                    <h2 className="font-serif text-xl">Arrivés récemment</h2>
                    <ul className="mt-3 divide-y divide-border border-y border-border">
                        {overview.recentBooks.map((book: Book) => (
                            <li key={book.id} className="flex min-w-0 items-baseline justify-between gap-4 py-2.5">
                                <span className="min-w-0 truncate text-sm">{book.title}</span>
                                <span className="shrink-0 truncate text-sm text-muted-foreground" title={book.author}>
                                    {book.author}
                                </span>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
};

export default HomeOverviewSection;
