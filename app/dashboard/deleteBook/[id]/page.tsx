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
  const id = params.id as string;
  const navigate = useRouter();
  const dispatch = Dispatch();


  useEffect(() => {
    const getUpdateBook = async (id: string) => {
      try {
        const getBook = await axios.get(`${Url.getBooks}/${id}`, {
          withCredentials: true,
        });
        setBook(getBook.data.data);
      } catch (error) {
        console.log(error)
      }
    };

    getUpdateBook(id)

  }, [id]);

  const handleCancel = () => {
    navigate.back();
  };

  const handleConfirm = () => {

    dispatch(deleteBook({ id }));
    navigate.push("/dashboard");

  };


  if (book) return (
    <>
      <h2>Etes-vous sûre de vouloir supprimer ce livre? : </h2>

      <Card className='flex flex-row w-[230px] h-[180px] hover:scale-[101%]'>
        <CardHeader className='flex'>
          <CardTitle className='text-md flex h-[80%] gap-2.5'>
            {book?.title}
          </CardTitle>
          <CardDescription className='text-center'>
            <span>{book?.author}</span><br />
            <span>Catégorie :  <ConvertisseurID id={book?.categoryId as string} /></span>
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
