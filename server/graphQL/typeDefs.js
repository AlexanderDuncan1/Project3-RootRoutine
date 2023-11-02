const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
  }

  type PlantSearchResult {
    name: String
    type: String
  }

  type Plant {
    id: ID!
    name: String!
    owner: User!
  }

  type AuthData {
    userId: ID!
    token: String!
    email: String!
}


  type PlantResponse {
    success: Boolean!
    message: String
    plant: Plant
  }

  input PlantInput {
    name: String!
    type: String!
  }

  type Query {
    plants: [Plant!]!
    searchPlant(query: String!): [PlantSearchResult]!
    getUserPlants(userId: ID!): [Plant]!
    user(id: ID!): User
    plant(id: ID!): Plant
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): AuthData!
    login(email: String!, password: String!): AuthData!
    addPlant(name: String!, ownerId: ID!): Plant
    savePlant(userId: ID!, plantInput: PlantInput!): PlantResponse!
    updatePlant(id: ID!, name: String): Plant
    deletePlant(id: ID!): PlantResponse
  }
`;

module.exports = typeDefs;
