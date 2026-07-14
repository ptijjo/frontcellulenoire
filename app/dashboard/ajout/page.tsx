import React from 'react'
import FormBook from './components/FormBook'

const AjoutBook = () => {
    return (
        <div className="flex w-full max-w-lg flex-col items-center gap-4">
            <h1 className="font-serif text-2xl sm:text-3xl">Ajouter un livre</h1>
            <FormBook />
        </div>
    )
}

export default AjoutBook
