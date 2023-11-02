import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth.jsx';

export const SIGNUP_USER = gql`
    mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
            userId
            token
            tokenExpiration
        }
    }
`;


function SignupForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [customError, setCustomError] = useState("");

  const [signupUser, { loading, error }] = useMutation(SIGNUP_USER, {
    onCompleted: (data) => {
      console.log('Signup successful', data);
      login(data);
      navigate('/account'); 
    },
    onError: (error) => {
      console.error('Signup error', error);
      setCustomError(error.message || "An unknown error occurred during signup.");
    },
  });

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setCustomError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      setCustomError("Password must be at least 8 characters long.");
      return;
    }

    if (formData.password !== passwordConfirm) {
      setCustomError("Passwords do not match.");
      return;
    }

    try {
      console.log("Attempting to signup user:", formData);
      await signupUser({
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password
        }
      });
    } catch (signupError) {
      console.error("Error occurred during signupUser mutation:", signupError);
      setCustomError(signupError.message || "An error occurred during signup.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
        aria-label="Username"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        aria-label="Email"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        aria-label="Password"
      />
      <input
        type="password"
        name="passwordConfirm"
        placeholder="Confirm Password"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
        aria-label="Confirm Password"
      />
      <button type="submit" disabled={loading}>
        Sign Up
      </button>
      {customError && <p>Error: {customError}</p>}
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}

export default SignupForm;
