"use client";

import React from "react";
import { Book, BookHomeOverview } from "@/lib/Interface/book.interface";
import BookCard from "./BookCard";
import { downloadBook } from "@/lib/downloadBook";
import { FaDownload } from "react-icons/fa";
import { trackEvent } from "@/lib/analytics";
import { categoryLabels } from "@/lib/categoryColors";
import { Button } from "@/components/ui/button";

interface HomeOverviewProps {
    overview: BookHomeOverview | null;
    onCategorySelect: (category: string) => void;
    activeCategory?: string;
}

const HomeOverviewSection = ({ overview, onCategorySelect, activeCategory = "" }: HomeOverviewProps) => {
    if (!overview) return null;

    const featured = overview.featuredBook;

    return (
        <div className="flex w-full max-w-5xl flex-col gap-5 sm:gap-6">
            {featured && (
                <section className="surface-card overflow-hidden p-4 sm:p-6">
                    <p className="text-xs uppercase tracking-widest text-primary">Sélection du moment</p>
                    <div className="mt-4 flex flex-col items-center gap-5 sm:flex-row sm:items-start sm:gap-8">
                        <BookCard
                            title={featured.title}
                            author={featured.author}
                            category={featured.category?.type}
                            compact
                        />
                        <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                            <h2 className="font-serif text-xl sm:text-2xl">{featured.title}</h2>
                            <p className="mt-1 text-sm text-muted-foreground">par {featured.author}</p>
                            <Button
                                type="button"
                                className="mt-4 gap-2"
                                onClick={() => downloadBook(featured.id, featured.title, featured.category?.type)}
                            >
                                <FaDownload /> Télécharger
                            </Button>
                        </div>
                    </div>
                </section>
            )}

            {overview.categoryCounts.length > 0 && (
                <section>
                    <p className="mb-3 text-sm font-medium text-muted-foreground">Explorer par catégorie</p>
                    <div className="flex flex-wrap justify-center gap-2 sm:justify-start">
                        {overview.categoryCounts.map((category) => (
                            <button
                                key={category.type}
                                type="button"
                                className={`category-pill ${activeCategory === category.type ? "category-pill-active" : ""}`}
                                onClick={() => {
                                    trackEvent("category_filter", { category: category.type });
                                    onCategorySelect(category.type);
                                }}
                            >
                                {categoryLabels[category.type] ?? category.type} ({category.count})
                            </button>
                        ))}
                    </div>
                </section>
            )}

            {overview.recentBooks.length > 0 && (
                <section>
                    <p className="mb-3 text-sm font-medium text-muted-foreground">Nouveautés</p>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                        {overview.recentBooks.map((book: Book) => (
                            <div key={book.id} className="surface-muted p-3 text-center">
                                <p className="truncate text-sm font-medium">{book.title}</p>
                                <p className="truncate text-xs text-muted-foreground">{book.author}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
};

export default HomeOverviewSection;
