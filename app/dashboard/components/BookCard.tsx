import React from "react";
import { getCategoryColor } from "@/lib/categoryColors";
import { cn } from "@/lib/utils";

interface BookProps {
  title: string;
  author: string;
  category?: string;
  compact?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const BookCard: React.FC<BookProps> = ({
  title,
  author,
  category,
  compact = false,
  onClick,
  disabled = false,
}) => {
  const coverColor = getCategoryColor(category);
  const interactive = Boolean(onClick) && !disabled;

  return (
    <div
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? onClick : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      className={cn(
        "group flex overflow-hidden rounded-lg shadow-lg shadow-black/30 transition-transform duration-300",
        interactive && "cursor-pointer hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
        disabled && "cursor-not-allowed opacity-60",
        compact
          ? "h-[220px] w-[150px] sm:h-[260px] sm:w-[170px]"
          : "h-[240px] w-[160px] sm:h-[300px] sm:w-[200px] lg:h-[320px] lg:w-[220px]",
      )}
      style={{ backgroundColor: coverColor }}
      aria-label={interactive ? `Télécharger ${title}` : title}
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
        {interactive && (
          <span className="mt-3 text-[10px] uppercase tracking-wider text-[#e8e4dc]/opacity-80">
            Télécharger
          </span>
        )}
      </div>
    </div>
  );
};

export default BookCard;
