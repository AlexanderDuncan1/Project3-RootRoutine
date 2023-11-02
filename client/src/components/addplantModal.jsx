// import React, { useState } from 'react';
// import { Modal, Button, InputGroup, FormControl } from 'react-bootstrap';

// function PlantModal({ show, onHide, onSelect, currentUser }) {
//   const [inputValue, setInputValue] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

//   const fetchPlants = async (query) => {
//     try {
//       const response = await fetch(`https://perenual.com/api/species-list?query=${query}&key=${process.env.PLANT_DOC_API_KEY}`);
//       const data = await response.json();
//       return data.data;
//     } catch (error) {
//       console.error("Error fetching plants:", error);
//     }
//   };

//   const handleInputChange = async (event) => {
//     setInputValue(event.target.value);
//     const results = await fetchPlants(event.target.value);
//     setSuggestions(results);
//   };

//   const handlePlantSelect = async (plant) => {
//     setSuggestions([]);
//     onSelect(plant);

//     try {
//       const response = await fetch('/api/plants/savePlant', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: currentUser.id,
//           plantData: plant,
//         }),
//       });

//       if (!response.ok) {
//         throw new Error("Error saving plant");
//       }
//     } catch (error) {
//       console.error("Error saving plant:", error);
//     }
//   };

//   return (
//     <Modal show={show} onHide={onHide} centered>
//       <Modal.Header closeButton>
//         <Modal.Title>Add a Plant</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <InputGroup className="mb-3">
//           <FormControl
//             placeholder="Search for a plant..."
//             aria-label="Search for a plant"
//             value={inputValue}
//             onChange={handleInputChange}
//           />
//         </InputGroup>
//         {suggestions.length > 0 && (
//           <div className="suggestions-dropdown">
//             {suggestions.map(plant => (
//               <div key={plant.id} onClick={() => handlePlantSelect(plant)}>
//                 {plant.common_name}
//               </div>
//             ))}
//           </div>
//         )}
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onHide}>
//           Close
//         </Button>
//         <Button variant="primary">Save Changes</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }

// export default PlantModal;
