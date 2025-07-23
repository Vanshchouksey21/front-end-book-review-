import React, { useEffect, useState } from 'react';
import axios from './axios';
import './AllReviews.css';

function AllReviews() {
    const [books, setBooks] = useState([]);

    const fetchBooksWithReviews = async () => {
        const res = await axios.get('/books');
        const booksWithReviews = await Promise.all(
            res.data.map(async (book) => {
                const reviewRes = await axios.get(`/reviews/${book._id}`);
                return {
                    ...book,
                    reviews: reviewRes.data.reviews,
                    avgRating: reviewRes.data.avgRating
                };
            })
        );
        setBooks(booksWithReviews);
    };

    useEffect(() => {
        fetchBooksWithReviews();
    }, []);

    return (
        <div className="container py-5">
            <h2 className="text-center fw-bold mb-5 text-primary">📖 All Book Reviews</h2>

            {books.length > 0 ? (
                books.map((book) => (
                    <div className="card review-card shadow-sm mb-4" key={book._id}>
                        <div className="card-body">
                            <h4 className="text-primary fw-semibold mb-2">{book.title}</h4>
                            <p className="mb-1 text-dark"><strong>Author:</strong> {book.author}</p>
                            <p className="mb-1 text-dark"><strong>Genre:</strong> <span className="badge bg-secondary">{book.genre}</span></p>
                            <p className="mb-3"><strong>Average Rating:</strong> ⭐ {book.avgRating || '0.0'}</p>

                            {book.reviews.length > 0 ? (
                                <ul className="list-group list-group-flush">
                                    {book.reviews.map((rev, i) => (
                                        <li className="list-group-item" key={i}>
                                            <p className="mb-1">{rev.reviewText}</p>
                                            <small className="text-muted">⭐ {rev.rating} | by {rev.reviewer}</small>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted">No reviews yet.</p>
                            )}
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-center text-muted">Loading reviews...</p>
            )}
        </div>
    );
}

export default AllReviews;
