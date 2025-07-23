import React, { useState } from 'react';
import axios from './axios';
import { useNavigate } from 'react-router-dom';
import './AddBook.css';

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
        <div className="addbook-wrapper">
            <div className="addbook-card shadow">
                <h3 className="text-center mb-4 text-primary">📖 Add a New Book</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control mb-3"
                        placeholder="Title"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                    <input
                        className="form-control mb-3"
                        placeholder="Author"
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        required
                    />
                    <input
                        className="form-control mb-3"
                        placeholder="Genre"
                        value={genre}
                        onChange={e => setGenre(e.target.value)}
                        required
                    />
                    <input
                        className="form-control mb-4"
                        type="file"
                        accept="image/*"
                        onChange={e => setImage(e.target.files[0])}
                        required
                    />
                    <button className="btn w-100 text-white" type="submit" style={{ backgroundColor: '#4A6CF7' }}>
                        ➕ Add Book
                    </button>
                </form>
            </div>
        </div>
    );
}

export default AddBook;
