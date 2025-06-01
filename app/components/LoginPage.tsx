"use client"
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { useRouter } from 'next/navigation';
import Url from "@/lib/Url";


type Inputs = {
    identifiant: string
    password: string
}
const LoginPage = () => {

    const navigate = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const connectUser = await axios.post(Url.connection, data, {
                withCredentials: true,
            });

            toast.success(`${connectUser.data}`);
            setTimeout(() => {
                navigate.push("/dashboard")
            }, 2000);

        } catch (error: any) {
            toast.error(`Une erreur est survenue !`)
        }

    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-1.5 w-4/5 m-auto">
            <Input type="text" placeholder="e-mail or pseudo" id="identifiant" autoComplete="off" className="rounded-none placeholder-red-400 pl-4" {...register("identifiant", { required: true })} />
            {errors.identifiant && errors.identifiant.type === "required" && <span className="text-center text-red-700">Identifiant Obligatoire ! </span>}

            <Input type="password" placeholder="password" id="password" autoComplete="false" className="rounded-none" {...register("password", { required: true })} />
            {errors.password && errors.password.type === "required" && <span className="text-center text-red-700">Mot de passe obligatoire !</span>}

            <Button type="submit" className="mt-2.5 bg-blue-400 hover:bg-blue-300 text-black w-[80%] mx-auto">Se connecter</Button>

            <ToastContainer autoClose={2000} />
        </form>
    )
}

export default LoginPage