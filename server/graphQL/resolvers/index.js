const plantsResolver = require('./plantsResolver');
const userResolver = require('./userResolver');

const rootResolver = {
  ...plantsResolver,
  ...userResolver,
  // Any other resolvers you create can be spread here in the future.
};

module.exports = rootResolver;
