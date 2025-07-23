import React, { useEffect, useState } from 'react';
import axios from './axios';
import { useParams } from 'react-router-dom';

function BookDetail() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(1);

    const fetchReviews = async () => {
        const res = await axios.get(`/reviews/${id}`);
        setReviews(res.data.reviews);
        setAvgRating(res.data.avgRating);
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`/reviews/${id}`, { reviewText, rating });
            setReviewText('');
            setRating(1);
            fetchReviews();
        } catch {
            alert('Add review failed. Are you logged in?');
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-3">Book Reviews</h2>
            <p><strong>Average Rating:</strong> ⭐ {avgRating}</p>

            <ul className="list-group mb-4">
                {reviews.map((rev, i) => (
                    <li className="list-group-item" key={i}>
                        <p className="mb-1">{rev.reviewText} - {rev.rating}⭐</p>
                        <small>by {rev.reviewer}</small>
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <textarea className="form-control" placeholder="Write a review..." value={reviewText} onChange={e => setReviewText(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <input className="form-control" type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} required />
                </div>
                <button className="btn btn-success w-100" type="submit">Submit Review</button>
            </form>
        </div>
    );
}

export default BookDetail;
