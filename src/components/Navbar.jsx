import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg shadow-sm" style={{ backgroundColor: '#4A6CF7' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold text-white" to="/" style={{ fontSize: '1.4rem' }}>
                    📚 BookVerse
                </Link>
                <button className="navbar-toggler text-white" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto align-items-center">
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/add-book">Add Book</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/books">See Book</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-white" to="/all-reviews">See Book Reviews</Link>
                        </li>
                        <li className="nav-item ms-3">
                            {localStorage.getItem('token') ? (
                                <button
                                    className="btn"
                                    onClick={handleLogout}
                                    style={{
                                        backgroundColor: '#FF7F50',
                                        border: 'none',
                                        color: '#fff',
                                        padding: '6px 16px',
                                        borderRadius: '5px'
                                    }}
                                >
                                    Logout
                                </button>
                            ) : (
                                <div className="d-flex gap-2">
                                    <Link
                                        className="btn"
                                        to="/login"
                                        style={{
                                            backgroundColor: '#D5E6FB',
                                            color: '#333333',
                                            fontWeight: '500'
                                        }}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        className="btn btn-outline-light"
                                        to="/signup"
                                        style={{
                                            borderColor: '#fff',
                                            color: '#fff'
                                        }}
                                    >
                                        Signup
                                    </Link>
                                </div>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
