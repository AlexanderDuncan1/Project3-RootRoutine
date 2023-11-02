import React, { useState } from 'react';
import LoginModal from '../components/loginModal';
import SignupModal from '../components/signupModal';
import { Button } from 'react-bootstrap';

function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleShowSignup = () => setShowSignup(true);
  const handleCloseSignup = () => setShowSignup(false);
  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  return (
    <div>
      <div className="background-image"></div>
      <div className="home-page">
        <h1>Welcome to RootRoutine</h1>
        <Button variant="primary" onClick={handleShowSignup}>Sign Up</Button>
        <Button variant="secondary" onClick={handleShowLogin}>Log In</Button>
        <SignupModal show={showSignup} handleClose={handleCloseSignup} />
        <LoginModal show={showLogin} handleClose={handleCloseLogin} />
      </div>
    </div>
  );
}

export default Home;
