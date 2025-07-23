import React, { useState } from 'react';
import axios from '../axios';
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
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{ backgroundColor: '#D5E6FB' }}
        >
            <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px' }}>
                <h3 className="text-center mb-2" style={{ color: '#4A6CF7' }}>
                    Login to Your Account
                </h3>
                <p className="text-center text-muted mb-4" style={{ fontSize: '14px' }}>
                    Welcome back! Please enter your credentials.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            className="form-control"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required
                            style={{ borderRadius: '8px' }}
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
                            style={{ borderRadius: '8px' }}
                        />
                    </div>
                    <button
                        className="btn w-100"
                        type="submit"
                        style={{
                            backgroundColor: '#4A6CF7',
                            color: 'white',
                            borderRadius: '8px'
                        }}
                    >
                        Login
                    </button>
                </form>

                <div className="text-center mt-3">
                    <small style={{ color: '#333333' }}>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ color: '#FF7F50', textDecoration: 'none' }}>
                            Sign up here
                        </Link>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Login;
