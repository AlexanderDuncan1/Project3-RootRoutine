const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    password: String! # For a real-world app, never store plain-text passwords!
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
  }
`;

module.exports = typeDefs;
