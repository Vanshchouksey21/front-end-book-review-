import React, { useEffect, useState } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
import './BookList.css';

function BookList() {
    const [books, setBooks] = useState([]);
    const [sortKey, setSortKey] = useState('');

    const fetchBooks = async () => {
        const res = await axios.get('/books');
        const booksWithRatings = await Promise.all(
            res.data.map(async (book) => {
                const ratingRes = await axios.get(`/reviews/${book._id}`);
                return { ...book, avgRating: parseFloat(ratingRes.data.avgRating || 0) };
            })
        );
        setBooks(booksWithRatings);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleSortChange = (e) => {
        const key = e.target.value;
        setSortKey(key);
        const sorted = [...books].sort((a, b) => {
            if (key === 'rating') return b.avgRating - a.avgRating;
            return a[key]?.localeCompare(b[key]);
        });
        setBooks(sorted);
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
                <div>
                    <h2 className="fw-bold" style={{ color: '#4A6CF7' }}>📚 Explore Books</h2>
                    <small className="text-muted">Sort and browse your favorite reads</small>
                </div>
                <Link to="/add-book" className="btn text-white" style={{ backgroundColor: '#FF7F50', borderRadius: '8px' }}>
                    + Add Book
                </Link>
            </div>

            <div className="row mb-4">
                <div className="col-md-4">
                    <select
                        className="form-select custom-input"
                        value={sortKey}
                        onChange={handleSortChange}
                    >
                        <option value="">🔽 Sort by</option>
                        <option value="title">Title</option>
                        <option value="author">Author</option>
                        <option value="genre">Genre</option>
                        <option value="rating">Average Rating</option>
                    </select>
                </div>
            </div>

            <div className="row">
                {books.length > 0 ? (
                    books.map(book => (
                        <div className="col-md-4 mb-4" key={book._id}>
                            <div className="card custom-card shadow-sm border-0 h-100">
                                {book.image ? (
                                    <img
                                        src={`http://localhost:5000/uploads/${book.image}`}
                                        alt={book.title}
                                        className="card-img-top book-cover"
                                    />
                                ) : (
                                    <div className="book-placeholder text-center py-4 bg-light text-muted">
                                        No Image Available
                                    </div>
                                )}

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title" style={{ color: '#4A6CF7' }}>
                                        📘 {book.title}
                                    </h5>
                                    <p className="text-muted mb-1">
                                        ✍️ <strong>Author:</strong> {book.author}
                                    </p>
                                    <p className="text-muted mb-2">
                                        📚 <strong>Genre:</strong> {book.genre}
                                    </p>
                                    <div className="mb-2">
                                        <span className="fw-bold text-warning">
                                            ⭐ {book.avgRating?.toFixed(1) || '0.0'}
                                        </span>
                                        <small className="text-muted ms-1">Avg Rating</small>
                                    </div>

                                    <Link
                                        to={`/book/${book._id}`}
                                        className="btn mt-auto text-white"
                                        style={{
                                            backgroundColor: '#4A6CF7',
                                            borderRadius: '6px'
                                        }}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center text-muted mt-4">
                        <p>No books found.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BookList;
