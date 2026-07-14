import { PaginationMeta } from "@/lib/Interface/pagination.interface";
import { MdOutlineKeyboardDoubleArrowLeft, MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
import { cn } from "@/lib/utils";

interface PaginationControlsProps {
    pagination: PaginationMeta;
    onPrevious: () => void;
    onNext: () => void;
    onBegin: () => void;
    onEnd: () => void;
    className?: string;
}

function getDisplayedRange(pagination: PaginationMeta): string {
    if (pagination.total === 0) return "0 résultat";
    const start = (pagination.page - 1) * pagination.itemPerPage + 1;
    const end = Math.min(pagination.page * pagination.itemPerPage, pagination.total);
    return `${start} - ${end} sur ${pagination.total}`;
}

export default function PaginationControls({
    pagination,
    onPrevious,
    onNext,
    onBegin,
    onEnd,
    className,
}: PaginationControlsProps) {
    if (pagination.total === 0) return null;

    const navBtn = "cursor-pointer text-muted-foreground transition-colors hover:text-primary";

    return (
        <div className={cn("flex flex-wrap items-center justify-center gap-2 sm:gap-4", className)}>
            <MdOutlineKeyboardDoubleArrowLeft
                className={(!pagination.hasPreviousPage) ? "hidden" : cn(navBtn, "text-2xl")}
                onClick={onBegin}
            />
            <button
                type="button"
                onClick={onPrevious}
                className={(!pagination.hasPreviousPage) ? "hidden" : navBtn}
            >
                Précédent
            </button>
            <span className="rounded-md border border-border bg-secondary/50 px-3 py-1.5 text-sm text-foreground">
                {getDisplayedRange(pagination)}
            </span>
            <button
                type="button"
                onClick={onNext}
                className={(!pagination.hasNextPage) ? "hidden" : navBtn}
            >
                Suivant
            </button>
            <MdOutlineKeyboardDoubleArrowRight
                className={(!pagination.hasNextPage) ? "hidden" : cn(navBtn, "text-2xl")}
                onClick={onEnd}
            />
        </div>
    );
}
