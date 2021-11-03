const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    first_name: String!
    last_name: String!
    email: String!
    createdAt: String!
    posts: [Post]
    followers: [User]
    following: [User]
  }
  type Post {
    id: ID!
    user_id: String!
    post_text: String!
    createdAt: String!
    likes: String
    user: User
  }
  type Likes {
    id: ID!
    user_liked_by: ID!
    post_id: ID!
    user: User
    post: Post
  }
  type Follows {
    id: ID!
    followed_id: ID!
    follower_id: ID!
  }
  type Query {
    users: [User]!
    user(username: String!): User!
    posts: [Post]!
    likes: [Likes]!
    follows: [Follows]!
  }
  type Mutation {
    createUser(username: String!, first_name: String!, last_name: String!, email: String!, password: String!): User
    createPost(user_id: ID!, post_text: String!): Post
    addLike(user_liked_by: ID!, post_id: ID!): Likes
    addFollow(followed: ID!, follower: ID!): Follows
  }
`;

module.exports = typeDefs;
