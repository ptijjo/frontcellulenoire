import axios from "axios";
import Url from "./Url";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export const downloadBook = async (bookId: string) => {
    try {

        const response = await axios.get(`${Url.downloadBook}/${bookId}`, {
            withCredentials:true,
            responseType:'blob' //Convertir la réponse en Blob(fichier binaire) au lieu de json
        });

        const livre = await axios.get(`${Url.getBooks}/${bookId}`, {
            withCredentials:true,
        });

        // Récupérer le nom du fichier depuis les headers si possible
        const contentDisposition = response.headers["content-disposition"];
        const filename = contentDisposition ? contentDisposition.split("filename=")[1] : `${livre.data.data.title}.pdf`; // Nom par défaut si non trouvé

        // Créer un lien pour télécharger le fichier
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        a.download = filename.replace(/"/g, ""); // Nettoyer le nom du fichier
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);    
    } catch (error) {
        console.error("Erreur : ", error)
        toast.error(`${error?.message}`)
    }
}