const User = require("./User")
const Post = require("./Post")
const Likes = require("./Likes")

User.hasMany(Post, {
    foreignKey: "author",
    onDelete: "CASCADE"
})
Post.belongsTo(User, {
    foreignKey: "author"
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

Likes.hasOne(Post, {
    foreignKey: "likes",
    onDelete: "CASCADE"
})
Post.belongsTo(Likes, {
    foreignKey: "likes",
})

User.hasMany(User, {
    foreignKey: "followers",
    onDelete: "CASCADE"
})
User.belongsToMany(User, {
    foreignKey: "followers",
})

Post.hasOne(User, {
    foreignKey: "posts",
    onDelete: "CASCADE"
})
User.belongsTo(Post, {
    foreignKey: "posts",
})