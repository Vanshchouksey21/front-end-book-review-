import React, { useState } from 'react';
import axios from './axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/login', { username, password });
            localStorage.setItem('token', res.data.token);
            alert('Login Successful');
            navigate('/');
        } catch {
            alert('Invalid credentials');
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center text-primary mb-3">Login to Your Account</h3>
                <p className="text-center text-muted mb-4">Welcome back! Please enter your credentials.</p>

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
                    <button className="btn btn-primary w-100" type="submit">Login</button>
                </form>

                <div className="text-center mt-3">
                    <small className="text-muted">
                        Don't have an account? <Link to="/signup">Sign up here</Link>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Login;
