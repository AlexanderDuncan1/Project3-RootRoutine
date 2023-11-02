const plantsResolver = require('./plantsResolver');
const userResolver = require('./userResolver');

const rootResolver = {
  ...plantsResolver,
  ...userResolver,

};

module.exports = rootResolver;
