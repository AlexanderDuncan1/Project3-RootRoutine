import React from 'react';

function AddPlant() {
  return (
    <div>
      <h2>Add a Plant</h2>
      <form>
        <input type="text" placeholder="Plant name" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddPlant;
