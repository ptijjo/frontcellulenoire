"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Url from '@/lib/Url'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast, ToastContainer } from 'react-toastify'


type Inputs = {
    title: string
    url: string
    categoryName: string
}
const FormBook = () => {
    const navigate = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            const fileInput = document.getElementById('url') as HTMLInputElement;
            if (fileInput.files && fileInput.files[0]) {
                formData.append("url", fileInput.files[0]); // Ajoutez le fichier
            };
            formData.append("categoryName", data.categoryName);

            const response = await axios.post(Url.addBooks, formData);
            console.log(response.data);
        } catch (error: any) {
            const message = error.response?.data?.message || "Une erreur s'est produite";
            toast.error(message);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-1.5 w-4/5 m-auto">
            <Label htmlFor='titre'>Tite du livre</Label>
            <Input type="text" placeholder="titre de l'ouvrage" id="titre" autoComplete="false" className="rounded-none placeholder-red-400 pl-4" {...register("title", { required: true })} />
            {errors.title && errors.title.type === "required" && <span>Title Obligatoire</span>}

            <Input type="file" id="url" autoComplete="false" className="rounded-none" {...register("url", { required: true })} accept='application/pdf' />
            {errors.url && errors.url.type === "required" && <span>Fichier  obligatoire</span>}

            <Label htmlFor='categoryName'>Choisir le genre : </Label>
            <select id='categoryName' {...register("categoryName", { required: true })}>
                <option value="">--Choisir une catégorie--</option>
                <option value="histoire">Histoire</option>
                <option value="religion">Religion</option>
                <option value="spiritualite">Spiritualité</option>
                <option value="philosophie">Philosophie</option>
            </select>
            {errors.categoryName && errors.categoryName.type === "required" && <span>Categorie  obligatoire</span>}

            <Button type="submit" className="mt-2.5 bg-blue-400">Se connecter</Button>

            <ToastContainer autoClose={2000} />
        </form>
    )

}

export default FormBook
