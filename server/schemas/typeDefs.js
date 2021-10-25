const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String!
    first_name: String!
    last_name: String!
    email: String!
    createdAt: String!
    followers: [User]
    posts: [Post]
  }
  type Post {
    id: ID!
    author: [User]!
    post_text: String!
    createdAt: String!
    likes: [Likes]
  }
  type Likes {
      likes: Int
      users_liked_by: [User]
      post_id: [Post]
  }
  type Query {
    users: [User]!
    posts: [Post]!
    likes: [Likes]
  }
  type Mutation {
    createUser(username: String!, first_name: String!, last_name: String!, email: String!, password: String!): User
    createPost(id: ID!, author: String!, post_text: String!): Post
    addLike(users_liked_by: String!, post_id: ID!): Likes
  }
`;

module.exports = typeDefs;
