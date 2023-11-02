import React, { useState, useContext } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth.jsx';

function LoginForm() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await login(formData);

        if (response?.success) {
            navigate('/account');
        } else {
            setErrorMessage(response?.message || "Invalid credentials.");
        }
    } catch (error) {
        setErrorMessage("An error occurred during login. Please try again.");
    }
}


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

      <Button variant="primary" type="submit">
        Login
      </Button>

      {errorMessage && <Alert variant="danger" className="mt-2">{errorMessage}</Alert>}
    </Form>
  );
}

export default LoginForm;
