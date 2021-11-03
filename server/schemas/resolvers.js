const {User, Likes, Post, Follows} = require("../models/index.js");

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
        return likes
      },
      follows: async () => {
        const follows = await Follows.findAll()
        console.log(follows)
        return follows;
      },
    },
    Mutation: {
      createUser: async (parent, {username, first_name, last_name, email, password}) => {
        return await User.create({username, first_name, last_name, email, password})
      },
      createPost: async (parent, {user_id, post_text}) => {
        return await Post.create({user_id, post_text})
      },
      addLike: async (parent, {user_liked_by, post_id}) => {
        return await Likes.create({user_liked_by, post_id})
      },
      addFollow: async (parent, {followed, follower}) => {
        return await Follows.create({followed_id: followed, follower_id: follower})
      }
    }
};

module.exports = resolvers;
