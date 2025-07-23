import React, { useEffect, useState } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
import './BookList.css';

function BookList() {
    const [books, setBooks] = useState([]);
    const [sortField, setSortField] = useState('');
    const [ratings, setRatings] = useState({});

    const fetchBooks = async () => {
        const res = await axios.get('/books');
        let bookList = res.data;

        // Optional Sorting
        if (sortField === 'genre') {
            bookList.sort((a, b) => a.genre.localeCompare(b.genre));
        } else if (sortField === 'author') {
            bookList.sort((a, b) => a.author.localeCompare(b.author));
        }

        setBooks(bookList);
    };

    useEffect(() => {
        fetchBooks();
    }, [sortField]);

    useEffect(() => {
        const fetchRatings = async () => {
            const newRatings = {};
            for (let book of books) {
                const res = await axios.get(`/reviews/${book._id}`);
                newRatings[book._id] = res.data.avgRating || 0;
            }
            setRatings(newRatings);
        };
        if (books.length > 0) fetchRatings();
    }, [books]);

    const renderStars = (rating) => {
        const fullStars = Math.round(rating);
        return '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);
    };

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-primary mb-1">📚 Explore Books</h2>
                    <small className="text-muted">Sort and browse through your favorite reads.</small>
                </div>
                <Link to="/add-book" className="btn btn-primary">+ Add Book</Link>
            </div>

            <div className="row mb-4">
                <div className="col-md-4 offset-md-8">
                    <select
                        className="form-select custom-input"
                        value={sortField}
                        onChange={(e) => setSortField(e.target.value)}
                    >
                        <option value="">Sort By</option>
                        <option value="genre">Genre</option>
                        <option value="author">Author</option>
                    </select>
                </div>
            </div>

            <div className="row">
                {books.length > 0 ? (
                    books.map(book => (
                        <div className="col-md-4 mb-4" key={book._id}>
                            <div className="card custom-card h-100 shadow-sm border-0">
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-primary">{book.title}</h5>
                                    <h6 className="card-subtitle text-muted mb-2">by {book.author}</h6>
                                    <span className="badge bg-info text-dark mb-2">{book.genre}</span>
                                    <div className="mb-3 text-warning fw-bold">
                                        {renderStars(ratings[book._id] || 0)} <small className="text-muted">({ratings[book._id] || 0})</small>
                                    </div>
                                    <Link to={`/book/${book._id}`} className="btn btn-outline-primary mt-auto">View / Review</Link>
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
