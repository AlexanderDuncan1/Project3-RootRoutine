import React from 'react';
import PlantItem from './PlantItem';

function PlantList() {
  // Mock data for now
  const plants = [
    { id: 1, name: 'Fern' },
    { id: 2, name: 'Cactus' },
  ];

  return (
    <div>
      <h2>My Plants</h2>
      {plants.map(plant => <PlantItem key={plant.id} plant={plant} />)}
    </div>
  );
}

export default PlantList;
