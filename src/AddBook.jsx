import React, { useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router-dom';

function AddBook() {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('author', author);
        formData.append('genre', genre);
        formData.append('image', image);

        try {
            await axios.post('/books', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            alert('Book added!');
            navigate('/');
        } catch {
            alert('Add book failed.');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Add Book</h2>
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <input className="form-control mb-3" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
                <input className="form-control mb-3" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} required />
                <input className="form-control mb-3" placeholder="Genre" value={genre} onChange={e => setGenre(e.target.value)} required />
                <input className="form-control mb-4" type="file" accept="image/*" onChange={e => setImage(e.target.files[0])} required />
                <button className="btn btn-primary w-100" type="submit">Add Book</button>
            </form>
        </div>
    );
}

export default AddBook;
