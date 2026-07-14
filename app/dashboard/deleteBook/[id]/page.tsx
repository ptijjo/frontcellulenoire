"use client"
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ConvertisseurID from '@/lib/ConvertisseurID';
import { deleteBook } from '@/lib/features/books/bookSlice';
import { Dispatch } from '@/lib/hooks';
import { Book } from '@/lib/Interface/book.interface';
import { getAxiosErrorMessage } from '@/lib/getAxiosErrorMessage';
import Url from '@/lib/Url';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DeleteBook = ({ params }: { params: { id: string } }) => {
  const [book, setBook] = useState<Book | null>(null);
  const id = params.id as string;
  const navigate = useRouter();
  const dispatch = Dispatch();

  useEffect(() => {
    const getUpdateBook = async (bookId: string) => {
      try {
        const getBook = await axios.get(`${Url.getBooks}/${bookId}`, {
          withCredentials: true,
        });
        setBook(getBook.data.data);
      } catch (error) {
        toast.error(getAxiosErrorMessage(error));
      }
    };

    getUpdateBook(id);
  }, [id]);

  const handleCancel = () => {
    navigate.back();
  };

  const handleConfirm = () => {
    dispatch(deleteBook({ id }));
    navigate.push("/dashboard");
  };

  if (!book) return null;

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-6 py-8 text-center">
      <h2 className="font-serif text-xl sm:text-2xl">Supprimer ce livre ?</h2>

      <Card className="w-full max-w-xs">
        <CardHeader>
          <CardTitle className="text-base">{book.title}</CardTitle>
          <CardDescription>
            <span>{book.author}</span><br />
            <span>Catégorie : <ConvertisseurID id={book.categoryId as string} /></span>
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex w-full flex-col gap-2 sm:flex-row sm:justify-center">
        <Button type="button" variant="outline" onClick={handleCancel}>Annuler</Button>
        <Button type="button" variant="destructive" onClick={handleConfirm}>Confirmer</Button>
      </div>
    </div>
  );
}

export default DeleteBook;
