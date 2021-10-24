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
};

module.exports = resolvers;
