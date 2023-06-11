const {User, Likes, Post, Follows, Comments} = require("../models/index.js");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
      users: async () => {
        const users = await User.findAll(
          {
          include: 
          [
            {model: Post, include: [User, Likes, {model: Comments, include: [User]}]},
            "followers", 
            "following"
          ]
        }
        )
        return users;
      },
      comments: async () => {
        const comments = await Comments.findAll({include: [User, Post]})
        console.log(comments)
        return comments;
      },
      user: async (parent, { username }, context) => {
        console.log("Context: ", context.user)
        const params = username ? { username } : {};
        const user = await User.findOne({ where: { username: params.username }, include: [{model: Post, include: [Likes, {model: Comments, include: [User]}]}, 'followers', 'following'] });
        return user;
      },
      dashboard: async (parent, args, context) => {
        console.log("Context: ", context.user)
        const user = await User.findOne({ where: { id: context.user.id }, include: [{model: Post, include: [Likes, {model: Comments, include: [User]}]}, 'followers', 'following'] });
        return user;
      },
      homepage: async (parent, { user_id }) => {
        const users = await User.findOne(
          {
            where: {id: user_id},
            include: 
            [
              {model: Post, include: [Likes, User, {model: Comments, include: [User]}]}, 
              "followers", 
              {model: User, as: "following", include: {model: Post, include: [User, Likes, {model: Comments, include: [User]}]}}
            ]
          },
        )
        return users;
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
          },
          {
            model: Likes
          },
          {
            model: Comments, 
            include: [User]
          }
        ]
        }
        )
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
        return likes;
      },
      follows: async () => {
        const follows = await Follows.findAll()
        return follows;
      },
    },
    Mutation: {
      createUser: async (parent, {username, first_name, last_name, email, password}) => {
        const user = await User.create({username, first_name, last_name, email, password})
        const token = signToken(user)
        return {token, user}
      },
      createPost: async (parent, {post_text, user_id}) => {
        return await Post.create({user_id, post_text})
      },
      createComment: async (parent, {comment_text, post_id}, context) => {
        const comment = await Comments.create({post_id, comment_text, author_id: context.user.id})
        const user = await User.findOne(
          {
            where: {id: context.user.id},
          },
        )
        return {
          comment_text: comment.comment_text,
          createdAt: comment.createdAt,
          user: {
            first_name: user.first_name,
            username: user.username
          }
        };
      },
      toggleLike: async (parent, {post_id}, context) => {
        const checkLikes = await Likes.findAll({where: {post_id: post_id}})
        for (i = 0; i < checkLikes.length; i++) {
          console.log(checkLikes[i].user_liked_by, context.user.id)
          if (checkLikes[i].user_liked_by == context.user.id) {
            await Likes.destroy({where: {id: checkLikes[i].id}})
            return -1;
          }
        }
        await Likes.create({user_liked_by: context.user.id, post_id})
        return 1;
      },
      checkLike: async (parent, args, context) => {
        const checkLiked = await Likes.findOne({where: {post_id: args.post_id, user_liked_by: context.user.id}})
        if(checkLiked !== null) {
          return 1;
        }
        return -1;
      },
      checkFollow: async (parent, args, context) => {
        const checkFollow = await Follows.findOne({where: {followed_id: args.user_id, follower_id: context.user.id}})
        if(checkFollow !== null) {
          return 1;
        }
        return -1;
      },
      toggleFollow: async (parent, {followed}, context) => {
        const checkFollows = await Follows.findAll({where: {follower_id: context.user.id}})
        for (i = 0; i < checkFollows.length; i++) {
          if (checkFollows[i].followed_id == followed) {
            await Follows.destroy({where: {id: checkFollows[i].id}})
            return -1;
          }
        }
        await Follows.create({followed_id: followed, follower_id: context.user.id})
        return 1;
      },
      deletePost: async (parent, { post_id }) => {
        console.log("postId next")
        console.log(post_id)
        if(!post_id) {
          throw new AuthenticationError('No Post id provided');
        }
        const post = await Post.destroy({where: { id: post_id }});
        console.log(post)
        return 1;
      },
      login: async (parent, { username, password }) => {
        const user = await User.findOne({where: { username: username }});
        if (!user) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const correctPw = user.isCorrectPassword(password);
        
        if (!correctPw) {
          throw new AuthenticationError('Incorrect credentials');
        }
  
        const token = signToken(user);
  
        return { token, user };
      }
    }
};

module.exports = resolvers;
