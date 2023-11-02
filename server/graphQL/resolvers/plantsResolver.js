const { Plant, User } = require('../../models');

const plantsResolver = {
  Query: {
    plants: async () => {
      try {
        const plants = await Plant.find().populate('owner');
        return plants.map(plant => ({
          id: plant.id,
          name: plant.name,
          owner: plant.owner ? {
            id: plant.owner.id,
            username: plant.owner.username
          } : null
        }));
      } catch (error) {
        console.error('Error fetching plants:', error);
        throw new Error('Error fetching plants');
      }
    },

    // Removed searchPlant query as it was incomplete and related to Axios code
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

    savePlant: async (_, { userId, name, type }) => {  // Updated parameters
      try {
        const user = await User.findById(userId);
        if (!user) {
          throw new Error('User not found');
        }

        const plant = new Plant({ 
          name,  // Updated
          type,  // Updated
          owner: user._id
        });

        await plant.save();

        user.plants.push(plant._id);
        await user.save();

        return {
          success: true,
          message: 'Plant saved successfully',
          plant: {
            id: plant.id,
            name: plant.name,
            owner: {
              id: user.id,
              username: user.username
            }
          }
        };
      } catch (error) {
        console.error('Error saving plant:', error);
        throw new Error('There was an error saving the plant');
      }
    },
  }
};

module.exports = plantsResolver;
