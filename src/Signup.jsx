import React, { useState } from 'react';
import axios from './axios';
import { useNavigate, Link } from 'react-router-dom';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/signup', { username, password });
            alert('Signup successful! Please login.');
            navigate('/login');
        } catch {
            alert('Signup failed');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center text-success mb-3">Create an Account</h3>
                <p className="text-center text-muted mb-4">Join and start reviewing your favorite books 📚</p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button className="btn btn-success w-100" type="submit">Sign Up</button>
                </form>

                <div className="text-center mt-3">
                    <small className="text-muted">
                        Already have an account? <Link to="/login">Login here</Link>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Signup;
