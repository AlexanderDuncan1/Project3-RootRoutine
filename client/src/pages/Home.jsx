import React from 'react';
import PlantList from '../components/PlantList';

function Home() {
  const plants = []; // This will be fetched from your API in the future

  return (
    <div className="home-page">
      <h1>Welcome to RootRoutine</h1>
      <PlantList plants={plants} />
    </div>
  );
}

export default Home;
