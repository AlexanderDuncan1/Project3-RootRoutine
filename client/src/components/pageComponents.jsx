import React, { useState } from 'react';
import LoginModal from './loginModal';
import { Button } from 'react-bootstrap';

function ParentComponent() {
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleShowLoginModal = () => setShowLoginModal(true);
  const handleCloseLoginModal = () => setShowLoginModal(false);

  return (
    <>
      <Button onClick={handleShowLoginModal}>Login</Button>
      <LoginModal show={showLoginModal} handleClose={handleCloseLoginModal} />
    </>
  );
}

export default ParentComponent;
