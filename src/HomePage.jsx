import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="bg-light min-vh-100 d-flex align-items-center justify-content-center">
            <div className="text-center">
                <h1 className="display-4 fw-bold mb-3 text-primary">📚 Book Review Platform</h1>
                <p className="lead text-secondary mb-4">
                    Discover, review, and rate your favorite books. <br />
                    Join the community and share your thoughts with fellow readers.
                </p>
                <div className="d-flex justify-content-center gap-3">
                    <Link to="/signup" className="btn btn-success btn-lg">Get Started</Link>
                    <Link to="/books" className="btn btn-outline-primary btn-lg">Browse Books</Link>
                </div>
            </div>
        </div>
    );
}

export default HomePage;
