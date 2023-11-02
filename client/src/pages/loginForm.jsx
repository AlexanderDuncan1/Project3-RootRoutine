import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth.jsx';

const LOGIN_USER = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      username
      email
      token
    }
  }
`;
function LoginForm() {
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      console.log('Login successful', data);
      if (data.login.token) {
        setToken(data.login.token);
        navigate('/account'); 
      } else {
        setErrorMessage("Invalid credentials.");
      }
    },
    onError: (error) => {
      setErrorMessage(error.message || "An error occurred while logging in.");
      console.error('Login error', error);
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    loginUser({ variables: formData });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setErrorMessage("");
  };

  return (
    <Form onSubmit={handleLogin}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          name="email" 
          placeholder="Enter email" 
          value={formData.email} 
          onChange={handleChange}
          aria-label="Email Address"
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={formData.password} 
          onChange={handleChange}
          aria-label="Password"
        />
      </Form.Group>

      <Button variant="primary" type="submit" disabled={loading}>
        Login
      </Button>

      {errorMessage && <Alert variant="danger" className="mt-2">{errorMessage}</Alert>}
    </Form>
  );
}

export default LoginForm;
