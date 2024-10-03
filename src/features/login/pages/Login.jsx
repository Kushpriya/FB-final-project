import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import LOGIN_MUTATION from '../graphql/LoginMutation';
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from 'react-icons/fa';
import ReusableForm from '../../../components/FormWrapper';
import ReusableInput from '../../../components/FormWrapper/ReusableInput';
import { useLoginHandlers } from '../hooks/useloginHandlers ';
import './style.css';
import { APP_URL } from '../../../constants/APP_URL';

const Login = () => {
  const dispatch = useDispatch();
  const authError = useSelector((state) => state.auth.error);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const { errors, validateLogin } = useLoginHandlers(dispatch, login);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-logo-container">
        <img src="/src/assets/Images/signup.png" alt="Logo" className="signin-logo" />
      </div>
      <ReusableForm
        title="SignIn"
        onSubmit={(e) => validateLogin(e, email, password)}
        submitText="SignIn"
        loading={loading}
        authError={authError}
      >
        <ReusableInput
          type="email"
          id="signin-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          // label="Email"
          placeholder="Email"
          icon={<FaEnvelope />}
          error={errors.email}
        />

        <ReusableInput
          type={isPasswordVisible ? 'text' : 'password'}
          id="signin-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          icon={<FaLock />}
          error={errors.password}
          toggleVisibilityIcon={isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
          togglePasswordVisibility={togglePasswordVisibility}

        />
        <div className="remember-forgot">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </ReusableForm>
      <div className="register-box">
        <p>Don't have an account? <a href={APP_URL.SIGNUP} className="toggle-form">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
