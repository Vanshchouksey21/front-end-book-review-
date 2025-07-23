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
            alert('Book added!');
            navigate('/');
        } catch {
            alert('Add book failed. Are you logged in?');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add Book</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <input className="form-control" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <input className="form-control" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <input className="form-control" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} required />
                </div>
                <button className="btn btn-primary w-100" type="submit">Add Book</button>
            </form>
        </div>
    );
}

export default AddBook;
