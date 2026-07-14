import axios from "axios";
import Url from "./Url";
import { toast } from "react-toastify";
import { getAxiosErrorMessage } from "./getAxiosErrorMessage";
import { trackEvent } from "./analytics";

export const downloadBook = async (bookId: string, bookTitle?: string, category?: string) => {
    try {
        const response = await axios.get(`${Url.downloadBook}/${bookId}`, {
            withCredentials: true,
            responseType: "blob",
        });

        trackEvent("book_download", {
            book_id: bookId,
            book_title: bookTitle ?? "unknown",
            category: category ?? "unknown",
        });

        const contentDisposition = response.headers["content-disposition"];
        const filenameMatch = contentDisposition?.match(/filename="?([^"]+)"?/);
        const filename = filenameMatch?.[1] ?? "livre.pdf";

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = filename.replace(/"/g, "");
        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);
        window.URL.revokeObjectURL(url);
    } catch (error) {
        toast.error(getAxiosErrorMessage(error, "Erreur lors du téléchargement"));
    }
};
