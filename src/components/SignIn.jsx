import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaTimes, FaBuilding } from 'react-icons/fa';
import '../assets/css/SignIn.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organization, setOrganization] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateLogin = (event) => {
        event.preventDefault();

        const regxEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        let isValid = true;
        let emailError = '';
        let passwordError = '';

        if (!regxEmail.test(email)) {
            emailError = 'Email is invalid';
            isValid = false;
        }

        if (password.length < 8) {
            passwordError = 'Password is too short';
            isValid = false;
        }

        setErrors({ email: emailError, password: passwordError });

        if (isValid) {
            handleLogin(email, password);
        }
    };

    const handleLogin = (email, password) => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        if (email === storedEmail && password === storedPassword) {
            alert('Login successful!');
            window.location.href = '/'; 
        } else {
            alert('Incorrect Email or Password');
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="login-wrapper">
            <div className="form-box login active">
                <h2>Login</h2>
                <form id="login-form" onSubmit={validateLogin}>
                    <div className="input-box">
                        <span className="icon"><FaEnvelope /></span>
                        <input
                            type="email"
                            id="login-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="login-email">Email</label>
                        {errors.email && <div className="error-message">{errors.email}</div>}
                    </div>
                    <div className="input-box">
                        <span className="icon">< FaLock /></span>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="login-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="eye-icon" onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                        </span>
                        <label htmlFor="login-password">Password</label>
                        {errors.password && <div className="error-message">{errors.password}</div>}
                    </div>
                    <div className="input-box">
                        <span className="icon"><FaBuilding /></span>
                        <select
                            id="signup-organization"
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            required
                        >
                            <option value="">Select Organization</option>
                            <option value="Flipkart">Flipkart</option>
                            <option value="Amazon">Amazon</option>
                            <option value="Google">Google</option>
                            <option value="Microsoft">Microsoft</option>
                        </select>
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>
                    <button type="submit" className="btn">Login</button>
                    <div className="login-register">
                        <p>Don't have an account? <a href="/signup" className="toggle-form">Sign up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
