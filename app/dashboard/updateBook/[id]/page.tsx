"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fonctionConvertisseur } from '@/lib/ConvertisseurID';
import { Book } from '@/lib/Interface/book.interface';
import { getAxiosErrorMessage } from '@/lib/getAxiosErrorMessage';
import Url from '@/lib/Url';
import { toast } from 'react-toastify';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UpdateBook = ({ params }: { params: { id: string } }) => {
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const id = params.id as string;
  const navigate = useRouter();

  useEffect(() => {
    const getUpdateBook = async (bookId: string) => {
      try {
        const getBook = await axios.get(`${Url.getBooks}/${bookId}`, {
          withCredentials: true,
        });
        setTitle(getBook.data.data.title);
        setAuthor(getBook.data.data.author);
        const convertion = await fonctionConvertisseur(getBook.data.data.categoryId);
        setCategory(convertion);
      } catch (error) {
        toast.error(getAxiosErrorMessage(error));
      }
    };
    getUpdateBook(id);
  }, [id]);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {
      await axios.put(`${Url.getBooks}/${id}`, {
        title,
        author,
        categorie: category,
      }, {
        withCredentials: true,
      });

      navigate.push("/dashboard");
    } catch (error) {
      toast.error(getAxiosErrorMessage(error));
    }
  };

  return (
    <form className="mx-auto flex w-full max-w-lg flex-col gap-4 py-8">
      <h1 className="font-serif text-2xl text-center">Modifier le livre</h1>

      <div>
        <Label htmlFor="title">Titre de l&apos;ouvrage</Label>
        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} className="mt-1.5" />
      </div>

      <div>
        <Label htmlFor="author">Nom de l&apos;auteur</Label>
        <Input id="author" value={author} onChange={e => setAuthor(e.target.value)} className="mt-1.5" />
      </div>

      <div>
        <Label htmlFor="categoryName">Catégorie</Label>
        <select id="categoryName" className="form-select mt-1.5" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="histoire">Histoire</option>
          <option value="religion">Religion</option>
          <option value="spiritualite">Spiritualité</option>
          <option value="philosophie">Philosophie</option>
          <option value="langue">Langues</option>
          <option value="roman">Roman</option>
        </select>
      </div>

      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <Button type="button" variant="outline" asChild>
          <Link href="/dashboard">Annuler</Link>
        </Button>
        <Button type="button" onClick={(e) => handleSubmit(e)}>Valider</Button>
      </div>
    </form>
  );
}

export default UpdateBook
