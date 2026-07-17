"use client"
import React, { useEffect, useState } from 'react';
import Url from './Url';
import apiClient from './apiClient';

interface idCategory {
    id: string;
}

const ConvertisseurID: React.FC<idCategory> = ({ id }) => {
    const [nom, setNom] = useState("");

    useEffect(() => {
        apiClient.get(`${Url.getCategory}/${id}`).then(response => {
            setNom(response.data.data.type);
        }).catch(() => undefined);
    }, [id]);

    return <>{nom}</>;
};

export const fonctionConvertisseur = async (id: string): Promise<string> => {
    const categorie = await apiClient.get(`${Url.getCategory}/${id}`);
    return categorie.data.data.type;
};

export default ConvertisseurID;
