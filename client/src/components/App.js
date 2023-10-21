import React from 'react';
import PlantList from './PlantList';
import AddPlant from './AddPlant';

function App() {
  return (
    <div className="App">
      <h1>Plant Caring App</h1>
      <AddPlant />
      <PlantList />
    </div>
  );
}

export default App;
