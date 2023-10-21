const resolvers = {
    Query: {
      plants: () => {
        // Mock data for now
        return [
          { id: 1, name: 'Fern', owner: { id: 1, username: 'Alice' } },
          { id: 2, name: 'Cactus', owner: { id: 1, username: 'Alice' } },
        ];
      },
    },
  };
  
  module.exports = resolvers;
  