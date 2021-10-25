const Likes = require("../models/Likes");
const Post = require("../models/Post");
const User = require("../models/User");

const resolvers = {
    Query: {
      users: async () => {
        return await User.findAll()
      },
      posts: async () => {
        return await Post.findAll()
      },
      likes: async () => {
        return await Likes.findAll()
      },
    },
    Mutation: {
      createUser: async (parent, {username, first_name, last_name, email, password}) => {
        return await User.create(username, first_name, last_name, email, password)
      },
      createPost: async (parent, {author, post_text}) => {
        return await Post.create(author, post_text)
      },
      addLikes: async (parent, {users_likes_by, post_id}) => {
        return await Likes.create(users_likes_by, post_id)
      }
    }
};

module.exports = resolvers;
