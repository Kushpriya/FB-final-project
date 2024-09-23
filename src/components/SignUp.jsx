import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaTimes, FaBuilding } from 'react-icons/fa';
import '../assets/css/SignUp.css'; 

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // const [organization, setOrganization] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [termsAgreed, setTermsAgreed] = useState(false);

    const validateSignup = (event) => {
        event.preventDefault();

        const regxUsername = /^[A-Za-z0-9._-]{3,20}$/;
        const regxEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        const regxPassword = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;

        let isValid = true;
        let usernameError = '';
        let emailError = '';
        let passwordError = '';
        let confirmPasswordError = '';

        if (!regxUsername.test(username)) {
            usernameError = 'Username is invalid';
            isValid = false;
        }

        if (!regxEmail.test(email)) {
            emailError = 'Email is invalid';
            isValid = false;
        }

        if (!regxPassword.test(password)) {
            passwordError = 'Password is invalid';
            isValid = false;
        }

        if (password !== confirmPassword) {
            confirmPasswordError = 'Passwords do not match';
            isValid = false;
        }

        setErrors({ username: usernameError, email: emailError, password: passwordError, confirmPassword: confirmPasswordError });

        if (isValid && termsAgreed && organization) {
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userPassword', password);
            // localStorage.setItem('userOrganization', organization); 
            alert(`New account created successfully with ${organization}. You can now log in.`);
            // window.location.href = `/signin?organization=${organization}`; 
        } else if (!termsAgreed) {
            alert('You must agree to the terms and conditions before signing up.');
        }
        // } else if (!organization) {
        //     alert('You must select an organization.');
        // }
    };

    const togglePasswordVisibility = (field) => {
        if (field === 'password') {
            setIsPasswordVisible(!isPasswordVisible);
        } else {
            setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
        }
    };

    return (
        <div className="signup-wrapper">
            <span id="icon-close" className="icon-close" onClick={() => window.location.href = '/signin'}>
                <FaTimes />
            </span>
            
            <div className="logo-container">
                <img src="/src/assets/Images/signup.png" alt="Logo" className="logo" /> {/* Adjust the path to your logo */}
            </div>

            <div className="signup-form-box">
                <h2>Sign Up</h2>
                <form id="signup-form" onSubmit={validateSignup}>
                    <div className="input-box">
                        <span className="icon"><FaUser /></span>
                        <input
                            type="text"
                            id="signup-username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        <label htmlFor="signup-username">Username</label>
                        {errors.username && <span id="usernameError" className="error-message">{errors.username}</span>}
                    </div>
                    <div className="input-box">
                        <span className="icon"><FaEnvelope /></span>
                        <input
                            type="email"
                            id="signup-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <label htmlFor="signup-email">Email</label>
                        {errors.email && <span id="emailError" className="error-message">{errors.email}</span>}
                    </div>
                    <div className="input-box">
                        <span className="icon"><FaLock /></span>
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="signup-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <span className="eye-icon" onClick={() => togglePasswordVisibility('password')}>
                            {isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                        </span>
                        <label htmlFor="signup-password">Password</label>
                        {errors.password && <span id="passwordError" className="error-message">{errors.password}</span>}
                    </div>
                    <div className="input-box">
                        <span className="icon"><FaLock /></span>
                        <input
                            type={isConfirmPasswordVisible ? 'text' : 'password'}
                            id="signup-confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                        <span className="eye-icon" onClick={() => togglePasswordVisibility('confirmPassword')}>
                            {isConfirmPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                        </span>
                        <label htmlFor="signup-confirm-password">Confirm Password</label>
                        {errors.confirmPassword && <span id="confirmPasswordError" className="error-message">{errors.confirmPassword}</span>}
                    </div>

                    {/* <div className="input-box">
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
                    </div> */}
                    
                    <div className="remember-forgot">
                        <label>
                            <input
                                type="checkbox"
                                id="terms"
                                checked={termsAgreed}
                                onChange={() => setTermsAgreed(!termsAgreed)}
                            /> 
                            I agree to the terms & conditions
                        </label>
                    </div>
                    <button type="submit" className="signup-btn">Sign Up</button>
                    <div className="login-register">
                        <p>Already have an account? <a href="/signin" className="toggle-form">SignIn</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;