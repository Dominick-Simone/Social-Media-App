const User = require("./User")
const Post = require("./Post")
const Likes = require("./Likes")


User.hasMany(Post, {
    foreignKey: "author"
})
Post.belongsTo(User, {
    foreignKey: "author",
    onDelete: "CASCADE"
})

User.hasMany(Likes, {
    foreignKey: "users_liked_by",
    onDelete: "CASCADE"
})
Likes.belongsTo(User, {
    foreignKey: "users_liked_by"
})

Post.hasOne(Likes, {
    foreignKey: "post_id",
    onDelete: "CASCADE"
})
Likes.belongsTo(Post, {
    foreignKey: "post_id",
})


// User.hasMany(User, {
//     foreignKey: "followers",
//     onDelete: "CASCADE"
// })
// User.belongsToMany(User, {
//     foreignKey: "followers",
// })


module.exports = {Post, User, Likes}