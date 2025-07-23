import React, { useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/books', { title, author, genre });
            alert('Book Added!');
            navigate('/');
        } catch (err) {
            alert('Error adding book. Are you logged in?');
        }
    };

    return (
        <div>
            <h2>Add Book</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <input type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
                <input type="text" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} required />
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
}

export default AddBook;
