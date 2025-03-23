import axios from "axios";
import Url from "./Url";


export const downloadBook = async (bookId: string,token:string) => {
    try {

        const livre = await axios.get(`${Url.getBooks}/${bookId}`, {
            headers: {
        Authorization:`Bearer ${token}`
    }
})

        const response = await axios.get(`${Url.downloadBook}/${bookId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
            responseType:'blob' //Convertir la réponse en Blob(fichier binaire) au lieu de json
        });

        // Récupérer le nom du fichier depuis les headers si possible
        const contentDisposition = response.headers["content-disposition"];
        const filename = contentDisposition ? contentDisposition.split("filename=")[1] : livre.data.data.title as string; // Nom par défaut si non trouvé

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
    }
}