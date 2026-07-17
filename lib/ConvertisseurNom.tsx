"use client"
import React, { useEffect, useState } from 'react';
import Url from './Url';
import apiClient from './apiClient';

interface idBook {
    id: string;
}

const ConvertisseurNom: React.FC<idBook> = ({ id }) => {
    const [nom, setNom] = useState<string>("");

    useEffect(() => {
        apiClient.get(`${Url.getBooks}/${id}`).then(response => {
            setNom(response.data.data.title);
        }).catch(() => undefined);
    }, [id]);

    return <>{nom}</>;
};

export default ConvertisseurNom;
