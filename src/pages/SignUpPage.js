import { Helmet } from 'react-helmet-async';import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css';

import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
// components
import Logo from '../components/logo';
// sections
import { LoginForm } from '../sections/auth/login';

export default function SignUpPage() {
  const navigate = useNavigate(); // Add the useNavigate hook

  const handleSignUpClick = () => {
    navigate('/login'); // Redirect to the sign-up page
  };
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [database, setDatabase] = useState([
    { username: 'user1', password: 'pass1' },
    { username: 'user2', password: 'pass2' },
  ]);

  const errors = { uname: 'Username already exists.' };

const handleSubmit = (event) => {
  event.preventDefault();
  const { uname, pass } = event.target.elements;
  if (database.find((user) => user.username === uname.value)) {
    setErrorMessages({ name: 'uname', message: errors.uname });
  } else {
    setDatabase((prevDatabase) => [
      ...prevDatabase,
      { username: uname.value, password: pass.value },
    ]);
    setIsSubmitted(true);
  }
};

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="btn-check5" className="btn btn-primary-border">
            <input placeholder="email" type="text" name="uname" required />
          </label>
          {renderErrorMessage('uname')}
        </div>
        <div className="input-container">
          <label htmlFor="btn-check5" className="btn btn-primary-border">
            <input placeholder="password" type="password" name="pass" required />
          </label>
          {renderErrorMessage('pass')}
        </div>
        <div className="button-container">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );

  return (
  
    <div className="app">

            <Typography variant="body2" sx={{ mb: 5 }}>
              Already have an account? {''}
              <Button onClick={handleSignUpClick}>
                Login
              </Button>
            </Typography>

      <div className="login-form">
        <div className="title">Sign Up</div>
        {isSubmitted ? (
          navigate('/dashboard')
          // <div>User is successfully signed up</div>
        ) : (
          renderForm
        )}
      </div>
    </div>
  );
}
