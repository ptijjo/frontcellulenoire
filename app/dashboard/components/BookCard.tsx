import React from "react";
import { categoryLabels, getCategoryColor } from "@/lib/categoryColors";
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
  const label = category ? (categoryLabels[category] ?? category) : undefined;

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
        "book-cover flex overflow-hidden rounded-sm",
        interactive &&
          "cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        disabled && "cursor-not-allowed opacity-60",
        compact ? "h-52 w-36 sm:h-60 sm:w-40" : "aspect-[2/3] w-full",
      )}
      style={{ backgroundColor: coverColor }}
      aria-label={interactive ? `Télécharger ${title}` : title}
    >
      <div className="flex w-7 shrink-0 items-center justify-center overflow-hidden bg-[#161410] sm:w-8">
        <p
          className="max-h-[88%] overflow-hidden text-[10px] leading-tight text-[#cbb99a]"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          title={author}
        >
          {author}
        </p>
      </div>
      <div className="flex min-w-0 flex-1 flex-col items-center justify-center px-3 py-4 text-center">
        <h2 className="line-clamp-4 font-serif text-base font-medium leading-snug text-[#f4efe8] sm:text-lg">
          {title}
        </h2>
        {label && (
          <span className="mt-3 text-xs text-[#f4efe8]/75">{label}</span>
        )}
      </div>
    </div>
  );
};

export default BookCard;
