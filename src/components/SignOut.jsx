import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import LOGOUT_MUTATION from '../graphql/mutation/LogoutMutation';
import { FaSignOutAlt } from 'react-icons/fa';

function SignOut({ className }) {
    const navigate = useNavigate();
    const [logout, { loading }] = useMutation(LOGOUT_MUTATION);

    const handleSignOut = async () => {
        const token = localStorage.getItem('token');

        console.log('Token before logout:', token);
        if (!token) {
            alert('You are already logged out.');
            navigate('/signin');
            return;
        }

        try {
            const { data, errors } = await logout();

            console.log('Logout response data:', data);
            console.log('Logout response errors:', errors);

            if (errors) {
                console.error("GraphQL error:", errors);
                alert('Sign out failed due to server error.');
                return;
            }

            if (data?.logout?.success) {
                localStorage.removeItem('token');
                alert('Successfully signed out!');
                navigate('/signin');
            } else {
                alert('Sign out failed: ' + data?.logout?.message);
            }
        } catch (err) {
            if (err.networkError) {
                alert('Network issue. Please check your connection.');
            } else if (err.graphQLErrors) {
                const userNotLoggedIn = err.graphQLErrors.some(e => e.message.includes('User not logged in'));

                if (userNotLoggedIn) {
                    alert('You were already logged out.');
                } else {
                    alert('Server error: ' + err.graphQLErrors.map(e => e.message).join(', '));
                }
            } else {
                alert('Sign out failed. Please try again later.');
            }

            console.error('Network error during sign-out:', err);
        }
    };

    return (
        <li className={className} onClick={handleSignOut} disabled={loading}>
            <FaSignOutAlt className="sidebar-icon" />
            <span>Sign out</span>
        </li>
    );
}

export default SignOut;
