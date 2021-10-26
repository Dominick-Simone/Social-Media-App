const {User, Likes, Post} = require("../models/index.js");

const resolvers = {
    Query: {
      users: async () => {
        const users = await User.findAll(
          {
          include: [
              {
                  model: Post,
              },
          ]
        }
        )
        console.log(users)
        return users
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
        return await Likes.findAll(
        //   {
        //   include: [
        //       {
        //           model: Post,
        //       },
        //   ]
        // }
        )
      },
    },
    Mutation: {
      createUser: async (parent, {username, first_name, last_name, email, password}) => {
        return await User.create({username, first_name, last_name, email, password})
      },
      createPost: async (parent, {author, post_text}) => {
        return await Post.create({author, post_text})
      },
      addLike: async (parent, {users_likes_by, post_id}) => {
        return await Likes.create({users_likes_by, post_id})
      }
    }
};

module.exports = resolvers;
