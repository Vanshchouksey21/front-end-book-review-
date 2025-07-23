import React, { useEffect, useState } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';

function BookList() {
    const [books, setBooks] = useState([]);
    const [genre, setGenre] = useState('');
    const [author, setAuthor] = useState('');

    const fetchBooks = async () => {
        const params = {};
        if (genre) params.genre = genre;
        if (author) params.author = author;
        const res = await axios.get('/books', { params });
        setBooks(res.data);
    };

    useEffect(() => {
        fetchBooks();
    }, [genre, author]);

    return (
        <div>
            <h2>Books</h2>
            <div>
                <input type="text" placeholder="Filter by Genre" value={genre} onChange={e => setGenre(e.target.value)} />
                <input type="text" placeholder="Filter by Author" value={author} onChange={e => setAuthor(e.target.value)} />
                <Link to="/add-book"><button>Add Book</button></Link>
                <Link to="/login"><button>Login</button></Link>
            </div>
            <ul>
                {books.map(book => (
                    <li key={book._id}>
                        <Link to={`/book/${book._id}`}>{book.title} by {book.author}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;
