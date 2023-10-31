import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const REGISTER_USER = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(username: $username, email: $email, password: $password) {
      id
      username
      email
      token
    }
  }
`;

function SignupForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      console.log('Signup successful', data);
      // Handle successful signup (e.g., redirect, store token)
    },
    onError: (error) => {
      // Handle signup error
      console.error('Signup error', error);
    }
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser({ variables: formData });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={formData.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
      />
      <button type="submit" disabled={loading}>
        Sign Up
      </button>
      {error && <p>Error: {error.message}</p>}
    </form>
  );
}

export default SignupForm;
