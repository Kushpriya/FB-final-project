import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import LOGOUT_MUTATION from '../graphql/LogoutMutation';
import { FaSignOutAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import './style.css';
import { APP_URL } from '../../../constants/APP_URL';

function Logout({ className }) {
    const navigate = useNavigate();
    const [logout, { loading }] = useMutation(LOGOUT_MUTATION);

    const handleSignOut = async () => {
        const token = localStorage.getItem('token');

        if (!token) {
            toast.info('You are already logged out.');
            navigate(APP_URL.LOGIN);
            return;
        }

        try {
            const { data, errors } = await logout();

            if (errors) {
                toast.error('Sign out failed due to server error.');
                return;
            }

            if (data?.logout?.success) {
                localStorage.removeItem('token');
                toast.success('Successfully signed out!');
                navigate(APP_URL.LOGIN);
            } else {
                toast.error('Sign out failed: ' + data?.logout?.message);
            }
        } catch (err) {
            handleLogoutError(err);
        }
    };

    const handleLogoutError = (err) => {
        if (err.networkError) {
            toast.error('Network issue. Please check your connection.');
        } else if (err.graphQLErrors) {
            const userNotLoggedIn = err.graphQLErrors.some(e => e.message.includes('User not logged in'));
            if (userNotLoggedIn) {
                toast.info('You were already logged out.');
            } else {
                toast.error('Server error: ' + err.graphQLErrors.map(e => e.message).join(', '));
            }
        } else {
            toast.error('Sign out failed. Please try again later.');
        }
    };

    return (
        <li className={className} onClick={handleSignOut} disabled={loading}>
            <FaSignOutAlt className="sidebar-icon" />
            <span>Sign out</span>
        </li>
    );
}

export default Logout;
