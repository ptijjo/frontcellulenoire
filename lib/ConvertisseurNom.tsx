"use Client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Url from './Url';

interface idBook {
    id: string;
    token: string;
}

const ConvertisseurNom: React.FC<idBook> = ({ id, token }) => {

    const [nom, setNom] = useState("");

    useEffect(() => {

        if (token) axios.get(`${Url.getBooks}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setNom(response.data.data.title);
        })
            .catch(error => console.log(error))

    }, [id, token]);

    return (
        <>
            {nom}
        </>
    )
};

export default ConvertisseurNom
