const sequelize = require('../config/connection');
const {Follows, Likes, User, Post} = require("../models/index.js")
const {userSeeds, followsSeeds, postSeeds, likesSeeds} = require("./seeds")


const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    const users = await User.bulkCreate(userSeeds)
    const posts = await Post.bulkCreate(postSeeds)
    const likes = await Likes.bulkCreate(likesSeeds)
    const follows = await Follows.bulkCreate(followsSeeds)

    process.exit(0)
}
seedDatabase()