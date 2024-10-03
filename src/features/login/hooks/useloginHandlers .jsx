import { loginSuccess, loginFailure } from '../../../store/authSlice';
import { APP_URL } from '../../../constants/APP_URL';
import { useState } from 'react';
import { toast } from 'react-toastify'; 

export const useLoginHandlers = (dispatch, login) => {
  const [errors, setErrors] = useState({});

  const handleLogin = async (loginData) => {
    try {
      const { data } = await login({ variables: { loginData } });
      if (data?.login?.token) {
        // console.log('Login successful!');  
        localStorage.setItem('token', data.login.token);
        dispatch(loginSuccess({
          token: data.login.token,
          user: data.login.user,
        }));
        
        toast.success(`Welcome, ${data.login.user.name}!`);
        setTimeout(() => {
          window.location.href = APP_URL.DASHBOARD;
        }, 1500);
      } else {
        dispatch(loginFailure('SignIn failed. Please check your credentials.'));
        toast.error('SignIn failed. Please check your credentials.'); 
      }
    } catch (err) {
      dispatch(loginFailure('SignIn failed. Please try again later.'));
      console.error('Error during sign-in:', err);
      toast.error('SignIn failed. Please try again later.'); 
    }
  };

  const validateLogin = (event, email, password) => {
    event.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let isValid = true;
    let emailError = '';
    let passwordError = '';

    if (!email) {
      emailError = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(email)) {
      emailError = 'Invalid email address format';
      isValid = false;
    }

    if (!password) {
      passwordError = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      passwordError = 'Password must be at least 6 characters long';
      isValid = false;
    }

    setErrors({ email: emailError, password: passwordError });

    if (isValid) {
      handleLogin({ email, password });
    }
  };


  return {
    errors,
    setErrors,
    handleLogin,
    validateLogin,
    
  };
};
