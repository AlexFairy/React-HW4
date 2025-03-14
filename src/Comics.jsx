import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { generateMd5Hash } from './md5';
import './Marvel.css';

const Comics = () => {
    const { id } = useParams();
    const [comics, setComics] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const publicKey = 'cb13431c44c454c29ea2f9d34304ee34';
        const privateKey = '0b674935eecfca9f8779da7e5700748f1b715d61';
        const ts = '1';
        const hash = generateMd5Hash(ts + privateKey + publicKey);
        const url = `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

        axios.get(url)
            .then((response) => {
                setComics(response.data.data.results);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
                console.error(error);
            });
    }, [id]);

    if (loading) {
        return <div>Loading comics...</div>;
    }

    if (error) {
        return <div>Error loading comics: {error.message}</div>;
    }

    if (comics.length === 0) {
        return <div>No comics found for this character.</div>;
    }

    return (
        <div className="comics-grid">
            {comics.map((comic) => (
                <div key={comic.id} className="comic-card">
                    <h2>{comic.title}</h2>
                    <img 
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} 
                        alt={comic.title} 
                    />
                    <p>{comic.description || "No description available."}</p>
                </div>
            ))}
        </div>
    );
};

export default Comics;