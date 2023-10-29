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
  }
};

module.exports = plantsResolver;
