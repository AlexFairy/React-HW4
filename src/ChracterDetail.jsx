import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { generateMd5Hash } from './md5';
import Comics from './Comics';
import './Marvel.css';

const CharacterDetail = () => {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const publicKey = 'cb13431c44c454c29ea2f9d34304ee34';
        const privateKey = '0b674935eecfca9f8779da7e5700748f1b715d61';
        const ts = '1';
        const hash = generateMd5Hash(ts + privateKey + publicKey);
        const url = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

        axios.get(url)
            .then((response) => {
                const fetchedCharacter = response.data.data.results[0];
                setCharacter(fetchedCharacter);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
                console.error(error);
            });
    }, [id]);

    if (loading) {
        return <div>Loading character details...</div>;
    }

    if (error) {
        return <div>Error loading character: {error.message}</div>;
    }

    if (!character) {
        return <div>No details available for this character.</div>;
    }

    return (
        <div className="character-detail">
            <button onClick={() => navigate('/')} className="back-button">
                HomePage!
            </button>
            <h1>{character.name}</h1>
            <img 
                src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                alt={character.name} 
            />
            <p>{character.description || "No description available."}</p>

            <Comics characterId={id} />
        </div>
    );
};

export default CharacterDetail;
