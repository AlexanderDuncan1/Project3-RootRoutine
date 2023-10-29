import React, { useState } from 'react';
import PlantList from '../components/PlantList';
import SignupModal from '../components/signupModal';
import { Button } from 'react-bootstrap';

function Home() {
  const [showSignup, setShowSignup] = useState(false);
  const plants = [];

  const handleShowSignup = () => setShowSignup(true);
  const handleCloseSignup = () => setShowSignup(false);

  return (
    <div className="home-page">
      <h1>Welcome to RootRoutine</h1>
      <Button variant="primary" onClick={handleShowSignup}>Sign Up</Button> {/* Signup Button */}
      <PlantList plants={plants} />

      <SignupModal show={showSignup} handleClose={handleCloseSignup} /> {/* Signup Modal */}
    </div>
  );
}

export default Home;
