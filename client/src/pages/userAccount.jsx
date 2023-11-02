import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Auth.jsx';
import { Navigate } from 'react-router-dom';
import PlantModal from '../components/addplantModal';
import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';

const GET_USER_PLANTS = gql`
  query GetUserPlants($userId: ID!) {
    userPlants(userId: $userId) {
      id
      name
      owner {
        id
        username
      }
    }
  }
`;

function UserAccount() {
  const { isLoggedIn, currentUser } = useContext(AuthContext);
  const [userPlants, setUserPlants] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  const { loading, error, data } = useQuery(GET_USER_PLANTS, {
    variables: { userId: currentUser?.id },
    skip: !currentUser,
  });

  useEffect(() => {
    if (data) {
      setUserPlants(data.userPlants);
    }
  }, [data]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching user's plants: {error.message}</p>;

  const handlePlantSelection = (plant) => {
    setSelectedPlant(plant);
    setModalShow(false);
  };

  return (
    <div className="account-page">
      <h1>User Account</h1>
      <button onClick={() => setModalShow(true)}>Add A Plant</button>
      <PlantModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onSelect={handlePlantSelection}
      />
      <div className="plants-list">
        {userPlants.map(plant => (
          <div key={plant.id} className="plant-card">
            <h2>{plant.name}</h2>
            <p>Owner: {plant.owner.username}</p>
          </div>
        ))}
      </div>
      {selectedPlant && (
        <div className="selected-plant-info">
          <h2>Plant Information</h2>
          <p>Name: {selectedPlant.name}</p>
          <p>Owner: {selectedPlant.owner.username}</p>
        </div>
      )}
    </div>
  );
}

export default UserAccount;
