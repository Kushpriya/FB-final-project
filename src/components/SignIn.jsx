import React, { useState } from 'react';
import '../assets/css/SignIn.css';

const SignIn = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Username:', username);
        console.log('Password:', password);
    };

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h1>Sign in to GitHub</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Username or email address" 
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                    <button type="submit">Sign in</button>
                </form>
                <div className="options">
                    <a href="#">Forgot password?</a>
                    <p>
                        New to GitHub? <a href="#">Create an account</a>
                    </p>
                    <a href="#">Sign in with a passkey</a>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
