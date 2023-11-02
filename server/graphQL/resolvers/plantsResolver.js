// const { Plant, User } = require('../../models');

// const plantsResolver = {
//   Query: {
//     userPlants: async (_, { userId }) => {
//       try {
//         const user = await User.findById(userId).populate('plants');
//         if (!user) {
//           throw new Error('User not found');
//         }
//         return user.plants.map(plant => ({
//           id: plant.id,
//           name: plant.name,
//           owner: {
//             id: user.id,
//             username: user.username
//           }
//         }));
//       } catch (error) {
//         console.error('Error fetching user plants:', error);
//         throw new Error('Error fetching user plants');
//       }
//     },
//   },

//   Mutation: {
//     addPlant: async (_, { name, ownerId }) => {
//       try {
//         const user = await User.findById(ownerId);
//         if (!user) {
//           throw new Error('User not found');
//         }
//         const plant = new Plant({ name, owner: user._id });
//         await plant.save();
//         return {
//           id: plant.id,
//           name: plant.name,
//           owner: {
//             id: user.id,
//             username: user.username
//           }
//         };
//       } catch (error) {
//         console.error(error);
//         throw new Error('Error adding plant');
//       }
//     },

//     savePlant: async (_, { userId, name, type }) => {  // Updated parameters
//       try {
//         const user = await User.findById(userId);
//         if (!user) {
//           throw new Error('User not found');
//         }

//         const plant = new Plant({ 
//           name,
//           type,
//           owner: user._id
//         });

//         await plant.save();

//         user.plants.push(plant._id);
//         await user.save();

//         return {
//           success: true,
//           message: 'Plant saved successfully',
//           plant: {
//             id: plant.id,
//             name: plant.name,
//             owner: {
//               id: user.id,
//               username: user.username
//             }
//           }
//         };
//       } catch (error) {
//         console.error('Error saving plant:', error);
//         throw new Error('There was an error saving the plant');
//       }
//     },
//   }
// };

// module.exports = plantsResolver;
