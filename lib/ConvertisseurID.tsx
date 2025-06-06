"use Client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Url from './Url';

interface idCategory {
    id: string;
}

const ConvertisseurID: React.FC<idCategory> = ({ id }) => {

    const [nom, setNom] = useState("");

    useEffect(() => {

        axios.get(`${Url.getCategory}/${id}`, {
           withCredentials:true,
        }).then(response => {
            setNom(response.data.data.type);
        })
            .catch(error => console.log(error))

    }, [id]);

    return (
        <>
            {nom}
        </>
    )
};

export const fonctionConvertisseur = async (id: string): Promise<string> => {
    const catgeorie = await axios.get(`${Url.getCategory}/${id}`, {
        withCredentials: true,
    });

    return catgeorie.data.data.type;
}


export default ConvertisseurID
