"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Selector } from '@/lib/hooks'
import Url from '@/lib/Url'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'


type Inputs = {
    title: string;
    url: string;
    categoryName: string;
    author: string;
}
const FormBook = () => {
    const navigate = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();

    const [token, setToken] = useState<string | null>(null);
    const errorLogin = Selector(state => state.user.error);

    //Vérification du token pour vérifier l'autorisation d'afficher les livres
    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        };
    }, [token]);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            const fileInput = document.getElementById('url') as HTMLInputElement;
            if (fileInput.files && fileInput.files[0]) {
                formData.append("url", fileInput.files[0]); // Ajoutez le fichier
            };
            formData.append("categoryName", data.categoryName);

            formData.append("author", data.author);

            await axios.post(Url.addBooks, formData, {
                headers: {
                    Authorization: `Bearer ${token as string}`
                }
            });
            navigate.push("/dashboard");
        } catch (error: any) {
            const message = error.response?.data?.message || "Une erreur s'est produite";
            toast.error(message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-1.5 w-4/5 m-auto">
            <Label htmlFor='titre' className='text-center'>Tite du livre</Label>
            <Input type="text" placeholder="titre de l'ouvrage" id="titre" autoComplete="false" className="rounded-none placeholder-red-400 pl-4 mb-3.5" {...register("title", { required: true })} aria-label="Title" />
            {errors.title && errors.title.type === "required" && <span>Title Obligatoire</span>}

            <Label htmlFor='author' className='text-center'>Auteur du livre</Label>
            <Input type="text" placeholder="auteur de l'ouvrage" id="titre" autoComplete="false" className="rounded-none placeholder-red-400 pl-4 mb-3.5" {...register("author", { required: true })} aria-label="Author" />
            {errors.author && errors.author.type === "required" && <span>Auteur Obligatoire</span>}

            <Input type="file" id="url" autoComplete="false" className="rounded-none" {...register("url", { required: true })} accept='application/pdf' aria-label="File" />
            {errors.url && errors.url.type === "required" && <span>Fichier  obligatoire</span>}

            <Label htmlFor='categoryName' className='flex justify-center mt-3.5'>Choisir le genre : </Label>
            <select id='categoryName' {...register("categoryName", { required: true })} className='w-[40%] mx-auto mb-3.5'>
                <option value="">--Choisir une catégorie--</option>
                <option value="histoire">Histoire</option>
                <option value="religion">Religion</option>
                <option value="spiritualite">Spiritualité</option>
                <option value="philosophie">Philosophie</option>
                <option value="langue">Langues</option>
                <option value="roman">Roman</option>
            </select>
            {errors.categoryName && errors.categoryName.type === "required" && <span>Categorie  obligatoire</span>}

            <Button type="submit" className="mt-3.5 bg-blue-500 hover:bg-blue-400 w-[40%] mx-auto">Ajouter</Button>

            <div className={(errorLogin === null) ? 'hidden' : "flex text-center text-red-600 text-2xl"}>{errorLogin}</div>

            <ToastContainer autoClose={2000} />
        </form>
    )

}

export default FormBook
