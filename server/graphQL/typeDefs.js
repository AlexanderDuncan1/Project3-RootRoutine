const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    token: String
  }

  type Plant {
    id: ID!
    name: String!
    owner: User!
  }

  type Query {
    plants: [Plant!]!
  }

  type Mutation {
    addPlant(name: String!, ownerId: ID!): Plant
    updatePlant(id: ID!, name: String): Plant
    deletePlant(id: ID!): Plant
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
  }
`;

module.exports = typeDefs;
