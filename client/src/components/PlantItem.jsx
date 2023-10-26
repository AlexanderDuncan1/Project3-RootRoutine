import React from 'react';

function PlantItem({ plant }) {
  return (
    <div className="plant-item">
      <h3>{plant.name}</h3>
      {/* Display additional plant details here */}
    </div>
  );
}

export default PlantItem;
