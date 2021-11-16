const sequelize = require('../config/connection');
const {Follows, Likes, User, Post, Comments} = require("../models/index.js")
const {userSeeds, followsSeeds, postSeeds, likesSeeds, commentSeeds} = require("./seeds")


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userSeeds, {individualHooks: true})
    const posts = await Post.bulkCreate(postSeeds)
    const likes = await Likes.bulkCreate(likesSeeds)
    const follows = await Follows.bulkCreate(followsSeeds)
    const comments = await Comments.bulkCreate(commentSeeds)

    process.exit(0)
}
seedDatabase()