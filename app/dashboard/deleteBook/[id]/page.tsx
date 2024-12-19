"use client"
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import ConvertisseurID from '@/lib/ConvertisseurID';
import { deleteBook } from '@/lib/features/books/bookSlice';
import { Dispatch } from '@/lib/hooks';
import { Book } from '@/lib/Interface/book.interface';
import Url from '@/lib/Url';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


const DeleteBook = ({ params }: { params: { id: string } }) => {

  const [book, setBook] = useState<Book | null>(null)
  const [token, setToken] = useState<string | null>(null);
  const id = params.id as string;
  const navigate = useRouter();
  const dispatch = Dispatch();

  //Vérification du token pour vérifier l'autorisation d'afficher les livres
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const getDeletedBook = async (id: string, token: string) => {
        try {
          const deleteBook = await axios.get(`${Url.getBooks}/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setBook(deleteBook.data.data);
        } catch (error) {
          console.log(error)
        }
      };
      getDeletedBook(id, token)
    };
  }, [id, token]);

  const handleCancel = () => {
    navigate.back();
  };

  const handleConfirm = () => {
    if (token) {
      dispatch(deleteBook({ id, token }));
      navigate.push("/dashboard");
    }

  };

  if (book) return (
    <>

      <h2>Etes-vous sûre de vouloir supprimer ce livre? : </h2>

      <Card className='flex flex-row w-[230px] h-[180px] hover:scale-[101%]'>
        <CardHeader className='flex'>
          <CardTitle className='text-md flex h-[80%] gap-2.5'>
            {book?.title}
          </CardTitle>
          <CardDescription>
            <span>{book?.author}</span><br />
            <span>Catégorie :  <ConvertisseurID id={book?.categoryId as string} token={token as string} /></span>
          </CardDescription>
        </CardHeader>
      </Card >

      <div className='flex flex-row items-center justify-center gap-3.5'>
        <Button type="button" onClick={handleCancel} className='bg-red-500 hover:bg-red-400'>Annuler</Button>
        <Button type="button" onClick={handleConfirm} className='bg-blue-500 hover:bg-blue-400'>Confirmer</Button>
      </div>


    </>
  )
}

export default DeleteBook;
