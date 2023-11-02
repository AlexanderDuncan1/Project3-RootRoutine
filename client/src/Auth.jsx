import React, { createContext, useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';

export const AuthContext = createContext();

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      id
    }
  }
`;

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId');
    if (authToken && userId) {
      setIsLoggedIn(true);
      setCurrentUser({ id: userId });
    }
  }, []);

  const [loginUser] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.login) {
        localStorage.setItem('authToken', data.login.token);
        localStorage.setItem('userId', data.login.id);
        setIsLoggedIn(true);
        setCurrentUser({ id: data.login.id });
      }
    },
    onError: (error) => {
      console.error('Login error', error);
    }
  });

  const login = async (credentials) => {
    try {
      await loginUser({ variables: credentials });
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
