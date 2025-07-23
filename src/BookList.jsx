import React, { useEffect, useState } from 'react';
import axios from './axios';
import { Link } from 'react-router-dom';
import './BookList.css'; // custom CSS file

function BookList() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const res = await axios.get('/books');
        setBooks(res.data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="container py-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold text-primary mb-0">📚 Explore Books</h2>
                    <small className="text-muted">Browse latest books with images & details.</small>
                </div>
                <Link to="/add-book" className="btn btn-primary">+ Add Book</Link>
            </div>

            <div className="row">
                {books.length > 0 ? (
                    books.map(book => (
                        <div className="col-md-4 mb-4" key={book._id}>
                            <div className="card custom-card shadow-sm border-0 h-100">
                                {/* ✅ Book Image */}
                                {book.image && (
                                    <img
                                        src={`http://localhost:5000/uploads/${book.image}`}
                                        alt={book.title}
                                        className="card-img-top book-cover"
                                    />
                                )}

                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-primary">{book.title}</h5>
                                    <h6 className="card-subtitle text-muted mb-2">by {book.author}</h6>
                                    <span className="badge bg-info text-dark mb-2">{book.genre}</span>
                                    <Link to={`/book/${book._id}`} className="btn btn-outline-primary mt-auto">
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
