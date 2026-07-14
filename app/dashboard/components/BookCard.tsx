import React from "react";
import { getCategoryColor } from "@/lib/categoryColors";
import { cn } from "@/lib/utils";

interface BookProps {
  title: string;
  author: string;
  category?: string;
  compact?: boolean;
}

const BookCard: React.FC<BookProps> = ({ title, author, category, compact = false }) => {
  const coverColor = getCategoryColor(category);

  return (
    <div
      className={cn(
        "group flex cursor-pointer overflow-hidden rounded-lg shadow-lg shadow-black/30 transition-transform duration-300 hover:scale-[1.03]",
        compact ? "h-[220px] w-[150px] sm:h-[260px] sm:w-[170px]" : "h-[240px] w-[160px] sm:h-[300px] sm:w-[200px] lg:h-[320px] lg:w-[220px]"
      )}
      style={{ backgroundColor: coverColor }}
    >
      <div className="flex w-8 shrink-0 items-center justify-center bg-[#1a1814] sm:w-10">
        <p
          className="text-[9px] font-bold uppercase tracking-wide text-[#c4a57b] sm:text-[10px]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {author}
        </p>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center p-3 sm:p-4">
        <h2 className="font-serif text-center text-sm font-semibold leading-snug text-[#f0ebe3] sm:text-base lg:text-lg line-clamp-4">
          {title}
        </h2>
        {category && (
          <span className="mt-2 rounded-full bg-black/25 px-2 py-0.5 text-[10px] uppercase tracking-wider text-[#e8e4dc] sm:text-xs">
            {category}
          </span>
        )}
      </div>
    </div>
  );
};

export default BookCard;
