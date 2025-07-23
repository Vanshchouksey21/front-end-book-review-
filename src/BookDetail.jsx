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
        } catch (err) {
            alert('Add review failed. Are you logged in?');
        }
    };

    return (
        <div>
            <h2>Book Detail</h2>
            <p>Average Rating: ⭐ {avgRating}</p>
            <ul>
                {reviews.map((rev, index) => (
                    <li key={index}>
                        {rev.reviewText} - {rev.rating}⭐ by {rev.reviewer}
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <textarea placeholder="Write a review..." value={reviewText} onChange={e => setReviewText(e.target.value)} required />
                <input type="number" min="1" max="5" value={rating} onChange={e => setRating(e.target.value)} required />
                <button type="submit">Add Review</button>
            </form>
        </div>
    );
}

export default BookDetail;
