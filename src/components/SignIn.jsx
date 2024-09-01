import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaBuilding } from 'react-icons/fa';
import '../assets/css/SignIn.css';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [organization, setOrganization] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateSignIn = (event) => {
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
            handleSignIn(email, password);
        }
    };

    const handleSignIn = (email, password) => {
        const storedEmail = localStorage.getItem('userEmail');
        const storedPassword = localStorage.getItem('userPassword');

        if (email === storedEmail && password === storedPassword) {
            alert('SignIn successful!');
            window.location.href = '/slider'; 
        } else {
            alert('Incorrect Email or Password');
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div className="signin-wrapper">
            <div className="signin-logo-container">
                <img src="/src/assets/Images/signup.png" alt="Logo" className="signin-logo" /> {/* Adjust the path to your logo */}
            </div>
            <div className="signin-form-box">
                <h2>SignIn</h2>
                <form id="signin-form" onSubmit={validateSignIn}>
                    <div className="signin-input-box">
                        <span className="signin-icon"><FaEnvelope /></span>
                        <input
                            type="email"
                            id="signin-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="signin-email">Email</label>
                        {errors.email && <div className="signin-error-message">{errors.email}</div>}
                    </div>
                    <div className="signin-input-box">
                        <span className="signin-icon">< FaLock /></span>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="signin-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="signin-eye-icon" onClick={togglePasswordVisibility}>
                            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                        </span>
                        <label htmlFor="signin-password">Password</label>
                        {errors.password && <div className="signin-error-message">{errors.password}</div>}
                    </div>
                    <div className="signin-input-box">
                        <span className="signin-icon"><FaBuilding /></span>
                        <select
                            id="signin-organization"
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

                    <div className="signin-remember-forgot">
                        <label>
                            <input type="checkbox" /> Remember me
                        </label>
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>
                    <button type="submit" className="signin-btn">SignIn</button>
                    <div className="signin-register">
                        <p>Don't have an account? <a href="/signup" className="signin-toggle-form">Sign up</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignIn;
