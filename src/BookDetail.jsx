import React, { useEffect, useState } from 'react';
import axios from './axios';
import { useParams } from 'react-router-dom';
import './BookDetail.css';

function BookDetail() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            const resBook = await axios.get(`/books/${id}`);
            setBook(resBook.data);
            const resReviews = await axios.get(`/reviews/${id}`);
            setReviews(resReviews.data.reviews);
            setAvgRating(resReviews.data.avgRating);
        };
        fetchData();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/reviews/${id}`, { reviewText, rating });
            setReviewText('');
            setRating(1);
            const updated = await axios.get(`/reviews/${id}`);
            setReviews(updated.data.reviews);
            setAvgRating(updated.data.avgRating);
        } catch {
            alert('Add review failed. Are you logged in?');
        }
    };

    if (!book) return <div className="container py-5 text-center">📘 Loading book details...</div>;

    return (
        <div className="container py-5">
            <div className="text-center mb-5">
                {book.image ? (
                    <img
                        src={`http://localhost:5000/uploads/${book.image}`}
                        alt={book.title}
                        className="img-fluid rounded shadow-sm mb-3"
                        style={{ height: '320px', objectFit: 'contain', maxWidth: '220px' }}
                    />
                ) : (
                    <div className="bg-light text-muted text-center p-5 rounded mb-3">
                        No Image Available
                    </div>
                )}

                <h2 className="fw-bold" style={{ color: '#4A6CF7' }}>{book.title}</h2>
                <p><strong>Author:</strong> <span style={{ color: '#333333' }}>{book.author}</span></p>
                <p><strong>Genre:</strong> <span className="badge bg-secondary">{book.genre}</span></p>
                <p><strong>Average Rating:</strong> ⭐ {avgRating}</p>
            </div>

            {/* 📝 Write a Review */}
            <div className="card shadow-sm p-4 mb-5 mx-auto" style={{ maxWidth: '600px' }}>
                <h5 className="mb-3 text-center" style={{ color: '#FF7F50' }}>📝 Write a Review</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            placeholder="Write your thoughts about this book..."
                            value={reviewText}
                            onChange={e => setReviewText(e.target.value)}
                            rows={4}
                            required
                        />
                    </div>
                    <div className="mb-3 d-flex align-items-center">
                        <label className="me-2 fw-semibold" style={{ color: '#333333' }}>Rating:</label>
                        <input
                            className="form-control w-auto"
                            type="number"
                            min="1"
                            max="5"
                            value={rating}
                            onChange={e => setRating(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn w-100" style={{ backgroundColor: '#4A6CF7', color: '#fff' }}>
                        Submit Review
                    </button>
                </form>
            </div>

            {/* 📋 Reader Reviews */}
            <div className="mx-auto" style={{ maxWidth: '600px' }}>
                <h4 className="mb-3 text-center" style={{ color: '#4A6CF7' }}>📋 Reader Reviews</h4>
                {reviews.length > 0 ? (
                    <ul className="list-group">
                        {reviews.map((rev, i) => (
                            <li className="list-group-item" key={i}>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div>
                                        <p className="mb-1" style={{ color: '#333333' }}>{rev.reviewText}</p>
                                        <small className="text-muted">by {rev.reviewer}</small>
                                    </div>
                                    <span className="badge bg-warning text-dark">⭐ {rev.rating}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-muted text-center">No reviews yet. Be the first to write one!</p>
                )}
            </div>
        </div>
    );
}

export default BookDetail;
