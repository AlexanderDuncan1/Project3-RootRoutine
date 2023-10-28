const { Plant, User } = require('../models');

const resolvers = {
    Query: {
      plants: async () => {
        try {          
          const plants = await Plant.find().populate('owner');
          return plants.map(plant => ({
            id: plant.id,
            name: plant.name,
            owner: {
              id: plant.owner.id,
              username: plant.owner.username
            }
          }));
        } catch (error) {
          console.error(error);
          throw new Error('Error fetching plants');
        }
      },
    },
    Mutation: {
      addPlant: async (_, { name, ownerId }) => {
        try {
          const user = await User.findById(ownerId);
          if (!user) {
            throw new Error('User not found');
          }
          const plant = new Plant({ name, owner: user._id });
          await plant.save();
          return {
            id: plant.id,
            name: plant.name,
            owner: {
              id: user.id,
              username: user.username
            }
          };
        } catch (error) {
          console.error(error);
          throw new Error('Error adding plant');
        }
      },
      updatePlant: async (_, { id, name }) => {
        try {
          const plant = await Plant.findById(id).populate('owner');
          if (!plant) {
            throw new Error('Plant not found');
          }
          plant.name = name;
          await plant.save();
          return {
            id: plant.id,
            name: plant.name,
            owner: {
              id: plant.owner.id,
              username: plant.owner.username
            }
          };
        } catch (error) {
          console.error(error);
          throw new Error('Error updating plant');
        }
      },
      deletePlant: async (_, { id }) => {
        try {
          const plant = await Plant.findById(id);
          if (!plant) {
            throw new Error('Plant not found');
          }
          await plant.remove();
          return plant; // potential confirmation msg
        } catch (error) {
          console.error(error);
          throw new Error('Error deleting plant');
        }
      }
    }
};

module.exports = resolvers;
