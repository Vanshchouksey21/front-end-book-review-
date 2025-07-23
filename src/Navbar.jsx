import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">📚 BookVerse</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/add-book">Add Book</Link>
                        </li>
                        <li className="nav-item">
                            {localStorage.getItem('token') ? (
                                <button className="btn btn-outline-light ms-3" onClick={handleLogout}>Logout</button>
                            ) : (
                                <>
                                    <Link className="btn btn-light me-2" to="/login">Login</Link>
                                    <Link className="btn btn-outline-light" to="/signup">Signup</Link>
                                </>
                            )}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
