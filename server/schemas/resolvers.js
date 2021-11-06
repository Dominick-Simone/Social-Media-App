const {User, Likes, Post, Follows} = require("../models/index.js");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        const users = await User.findAll(
          {
          include: [Post, 'followers', 'following']
        }
        )
        console.log(users)
        return users
      },
      user: async (parent, { username }) => {
        const params = username ? { username } : {};
        const user = await User.findOne({ where: { username: params.username }, include: [
          {
            model: Post
          }
        ] });
        return user;
      },
      getLikes: async (parent, { post_id }) => {
        const likes = await Likes.findAndCountAll({ where: { post_id: post_id }})
        
        return likes.count;
      },
      posts: async () => {

        const posts = await Post.findAll(
        {
          include: [
          {
            model: User
          }
        ]
        }
        )
        console.log(posts)
        return posts;
      },
      likes: async () => {
        const likes = await Likes.findAll(
          {
          include: [
              {
                  model: User,
              },
              {
                  model: Post,
              },
          ]
        }
        )
        console.log(likes)
        return likes;
      },
      follows: async () => {
        const follows = await Follows.findAll()
        console.log(follows)
        return follows;
      },
    },
    Mutation: {
      createUser: async (parent, {username, first_name, last_name, email, password}) => {
        const user = await User.create({username, first_name, last_name, email, password})
        const token = signToken(user)
        return {token, user}
      },
      createPost: async (parent, {post_text}, context) => {
        return await Post.create({user_id: context.user.id, post_text})
      },
      addLike: async (parent, {post_id}, context) => {
        return await Likes.create({user_liked_by: context.user.id, post_id})
      },
      addFollow: async (parent, {followed}, context) => {
        return await Follows.create({followed_id: followed, follower_id: context.user.id})
      },
      login: async (parent, { username, password }) => {
        const user = await User.findOne({where: { username: username }});
        console.log(user)
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = await user.isCorrectPassword(password);
  
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      }
    }
};

module.exports = resolvers;
