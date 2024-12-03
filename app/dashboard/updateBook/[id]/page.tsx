"use client"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fonctionConvertisseur } from '@/lib/ConvertisseurID';
import { Book } from '@/lib/Interface/book.interface';
import Url from '@/lib/Url';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const UpdateBook = ({ params }: { params: { id: string } }) => {
  const [book, setBook] = useState<Book | null>(null)
  const [token, setToken] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const id = params.id as string;
  const navigate = useRouter();

  //Vérification du token pour vérifier l'autorisation d'afficher les livres
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken as string);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const getUpdateBook = async (id: string, token: string) => {
        try {
          const getBook = await axios.get(`${Url.getBooks}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setBook(getBook.data.data);
          setTitle(getBook.data.data.title);
          setAuthor(getBook.data.data.author);
          const convertion = await fonctionConvertisseur(getBook.data.data.categoryId, token);
          setCategory(convertion);
        } catch (error) {
          console.log(error)
        }
      };

      getUpdateBook(id, token)
    };

  }, [token, id]);

  const handleCancel = () => {
    navigate.back();
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    try {

      const updateBook = await axios.put(`${Url.getBooks}/${id}`, {
        title: title,
        author: author,
        categorie: category,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      navigate.push("/dashboard")

    } catch (error) {
      console.error(error)
    }

  }


  return (
    <>

      <form className='flex flex-col justify-center items-center gap-3.5 w-[40%] border p-3.5'>
        <div className='w-full flex flex-col items-center justify-center'>
          <Label><h2>Titre de l'ouvrage</h2></Label>
          <Input value={title as string} onChange={e => setTitle(e.target.value)} />
        </div>
        <div className='w-full flex flex-col items-center justify-center'>
          <Label><h2>Nom de l'auteur</h2></Label>
          <Input value={author as string} onChange={e => setAuthor(e.target.value)} />
        </div>
        <div className='w-full flex flex-col items-center justify-center'>
          <Label htmlFor='categoryName'>Choisir le genre : </Label>
          <select id='categoryName' value={category} onChange={e => setCategory(e.target.value)}>
            <option value="histoire" >Histoire</option>
            <option value="religion">Religion</option>
            <option value="spiritualite">Spiritualité</option>
            <option value="philosophie">Philosophie</option>
          </select>
        </div>

        <div className='w-full flex flex-row items-center justify-center gap-3.5'>
          <Button onClick={handleCancel}>Annuler</Button>
          <Button onClick={(e) => handleSubmit(e)}>Valider</Button>
        </div>
      </form>

    </>
  )
}

export default UpdateBook
