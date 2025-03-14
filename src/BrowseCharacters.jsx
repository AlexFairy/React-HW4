import axios from "axios";
import React, { useEffect, useState } from "react";
import { generateMd5Hash } from './md5';
import { Link } from "react-router-dom";
import './Marvel.css';

const CharacterList = () => {
    const [characterlist, setCharacterlist] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const publicKey = 'cb13431c44c454c29ea2f9d34304ee34';
        const privateKey = '0b674935eecfca9f8779da7e5700748f1b715d61';
        const ts = '1';
        const hash = generateMd5Hash(ts + privateKey + publicKey);
        const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

        axios.get(url)
            .then((response) => {
                setCharacterlist(response.data.data.results);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                console.error(error);
            });
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!characterlist) {
        return <div>No characters found.</div>;
    }

    return (
        <div>
            <h1>Marvel Character List</h1>
            <div className="character-grid">
                {characterlist.map((character) => (
                    <div className="character-card" key={character.id}>
                        <h2>{character.name}</h2>
                        <Link to={`/character/${character.id}`}>
                          <img 
                            src={`${character.thumbnail.path}.${character.thumbnail.extension}`} 
                            alt={character.name} 
                          />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CharacterList;
