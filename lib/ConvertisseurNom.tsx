"use Client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Url from './Url';

interface idBook {
    id: string;
}

const ConvertisseurNom: React.FC<idBook> = ({ id }) => {

    const [nom, setNom] = useState<string>("");

    useEffect(() => {

        axios.get(`${Url.getBooks}/${id}`, {
            withCredentials: true,
        }).then(response => {
            setNom(response.data.data.title);
        })
            .catch(error => console.log(error))

    }, [id]);

    return (
        <>
            {nom}
        </>
    )
};

export default ConvertisseurNom
