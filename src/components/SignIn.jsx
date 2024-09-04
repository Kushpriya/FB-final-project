import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import LOGIN_MUTATION from '../graphql/mutation/LoginMutation';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import '../assets/css/SignIn.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

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

    if (password.length < 6) {
      passwordError = 'Password is too short';
      isValid = false;
    }

    setErrors({ email: emailError, password: passwordError });

    if (isValid) {
      handleSignIn({ email, password });
    }
  };

  const handleSignIn = async (loginData) => {
    loginData.tenantId = 1; 
    try {
      const { data } = await login({ variables: { loginData } });
      if (data?.login?.token) {
        localStorage.setItem('token', data.login.token);
        alert(`Welcome, ${data.login.user.name}!`);
        window.location.href = '/slider';
      } else {
        alert('SignIn failed. Please check your credentials.');
      }
    } catch (err) {
      alert('SignIn failed. Please try again later.');
      console.error('Error during sign-in:', err);
    }
  };
  

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-logo-container">
        <img src="/src/assets/Images/signup.png" alt="Logo" className="signin-logo" />
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
            <span className="signin-icon"><FaLock /></span>
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
          <div className="signin-remember-forgot">
            <a href="/forgot-password">Forgot Password?</a>
          </div>
          <button type="submit" className="signin-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'SignIn'}
          </button>
          {error && <p className="signin-error-message">Error: {error.message}</p>}

          <div className="signin-register">
                <p>Don't have an account? <a href="/signup" className="signin-toggle-form">Sign up</a></p>
            </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
