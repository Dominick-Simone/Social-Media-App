const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    username: String
    first_name: String
    last_name: String
    email: String
    password: String
    followers: [User]!
    posts: [Post]!
  }
  type Post {
    id: ID
    author: [User]!
    post_text: String
    likes: [Likes]
  }
  type Likes {
      likes: Int
      users_likes_by: [User]
      post_id: [Post]
  }
  type Query {
    users: [User]
    posts: [Post]
    likes: [Likes]
  }
`;

module.exports = typeDefs;
