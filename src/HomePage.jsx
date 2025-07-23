import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div
            className="d-flex align-items-center justify-content-center min-vh-100"
            style={{ backgroundColor: '#D5E6FB' }}
        >
            <div className="text-center px-4">
                <h1 className="display-4 fw-bold mb-3" style={{ color: '#4A6CF7' }}>
                    📚 Welcome to BookVerse
                </h1>
                <p className="lead mb-4" style={{ color: '#333333' }}>
                    Discover, review, and rate your favorite books. <br />
                    Join a community of passionate readers!
                </p>
                <div className="d-flex justify-content-center flex-wrap gap-3">
                    <Link
                        to="/books"
                        className="btn btn-lg text-white"
                        style={{
                            backgroundColor: '#4A6CF7',
                            borderRadius: '8px',
                            padding: '12px 24px',
                        }}
                    >
                        Get Started
                    </Link>
                   
                </div>
            </div>
        </div>
    );
}

export default HomePage;
