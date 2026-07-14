"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Selector } from '@/lib/hooks'
import Url from '@/lib/Url'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
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
        formState: { errors },
    } = useForm<Inputs>();

    const errorLogin = Selector(state => state.user.error);

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            const fileInput = document.getElementById('url') as HTMLInputElement;
            if (fileInput.files && fileInput.files[0]) {
                formData.append("url", fileInput.files[0]);
            }
            formData.append("categoryName", data.categoryName);
            formData.append("author", data.author);

            await axios.post(Url.addBooks, formData, {
                withCredentials: true,
            });
            navigate.push("/dashboard");
        } catch (error: unknown) {
            const message = axios.isAxiosError(error)
                ? (error.response?.data?.message as string) || "Une erreur s'est produite"
                : "Une erreur s'est produite";
            toast.error(message);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto flex w-full max-w-lg flex-col gap-4 py-8">
            <div>
                <Label htmlFor="titre">Titre du livre</Label>
                <Input
                    type="text"
                    placeholder="Titre de l'ouvrage"
                    id="titre"
                    className="mt-1.5"
                    {...register("title", { required: true })}
                    aria-label="Title"
                />
                {errors.title?.type === "required" && (
                    <span className="text-sm text-destructive">Titre obligatoire</span>
                )}
            </div>

            <div>
                <Label htmlFor="author">Auteur</Label>
                <Input
                    type="text"
                    placeholder="Auteur de l'ouvrage"
                    id="author"
                    className="mt-1.5"
                    {...register("author", { required: true })}
                    aria-label="Author"
                />
                {errors.author?.type === "required" && (
                    <span className="text-sm text-destructive">Auteur obligatoire</span>
                )}
            </div>

            <div>
                <Label htmlFor="url">Fichier PDF</Label>
                <Input
                    type="file"
                    id="url"
                    className="mt-1.5"
                    {...register("url", { required: true })}
                    accept="application/pdf"
                    aria-label="File"
                />
                {errors.url?.type === "required" && (
                    <span className="text-sm text-destructive">Fichier obligatoire</span>
                )}
            </div>

            <div>
                <Label htmlFor="categoryName">Catégorie</Label>
                <select id="categoryName" {...register("categoryName", { required: true })} className="form-select mt-1.5">
                    <option value="">— Choisir une catégorie —</option>
                    <option value="histoire">Histoire</option>
                    <option value="religion">Religion</option>
                    <option value="spiritualite">Spiritualité</option>
                    <option value="philosophie">Philosophie</option>
                    <option value="langue">Langues</option>
                    <option value="roman">Roman</option>
                </select>
                {errors.categoryName?.type === "required" && (
                    <span className="text-sm text-destructive">Catégorie obligatoire</span>
                )}
            </div>

            <Button type="submit" className="mt-2 w-full sm:w-auto sm:self-center">Ajouter le livre</Button>

            {errorLogin != null && (
                <p className="text-center text-destructive">{String(errorLogin)}</p>
            )}

            <ToastContainer theme="dark" autoClose={2000} />
        </form>
    )
}

export default FormBook
