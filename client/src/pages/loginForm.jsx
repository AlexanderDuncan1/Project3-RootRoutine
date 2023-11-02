import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    navigate('/account');
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

      <Button variant="primary" type="submit">
        Login
      </Button>

      {errorMessage && <Alert variant="danger" className="mt-2">{errorMessage}</Alert>}
    </Form>
  );
}

export default LoginForm;
