"use Client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Url from './Url';

interface idCategory {
    id: string;
    token: string;
}

const ConvertisseurID: React.FC<idCategory> = ({ id, token }) => {

    const [nom, setNom] = useState("");

    useEffect(() => {

        if (token) axios.get(`${Url.getCategory}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            setNom(response.data.data.type);
        })
            .catch(error => console.log(error))

    }, [id, token]);

    return (
        <>
            {nom}
        </>
    )
};

export const fonctionConvertisseur = async (id: string, token: string): Promise<string> => {
    const catgeorie = await axios.get(`${Url.getCategory}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return catgeorie.data.data.type;
}


export default ConvertisseurID
