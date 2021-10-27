const userSeeds = [
    {
        username: "domsimone",
        first_name: "Dominick",
        last_name: "Simone",
        email: "domsimonedev@gmail.com",
        password: "password123"
    },
    {
        username: "domsimone1",
        first_name: "Dominick",
        last_name: "Simone",
        email: "domsimonedev1@gmail.com",
        password: "password123"
    },
    {
        username: "domsimone2",
        first_name: "Dominick",
        last_name: "Simone",
        email: "domsimonedev2@gmail.com",
        password: "password123"
    },
    {
        username: "domsimone3",
        first_name: "Dominick",
        last_name: "Simone",
        email: "domsimonedev3@gmail.com",
        password: "password123"
    },
    {
        username: "domsimone4",
        first_name: "Dominick",
        last_name: "Simone",
        email: "domsimonedev4@gmail.com",
        password: "password123"
    },
    {
        username: "domsimone5",
        first_name: "Dominick",
        last_name: "Simone",
        email: "domsimonedev5@gmail.com",
        password: "password123"
    },
]

const postSeeds = [
    {
        user_id: 1,
        post_text: "Dominick's first post"
    },
    {
        user_id: 2,
        post_text: "Dominick1's first post"
    },
    {
        user_id: 3,
        post_text: "Dominick2's first post"
    },
    {
        user_id: 4,
        post_text: "Dominick3's first post"
    },
    {
        user_id: 5,
        post_text: "Dominick4's first post"
    },
    {
        user_id: 6,
        post_text: "Dominick5's first post"
    },
]

const likesSeeds = [
    {
        user_liked_by: 2,
        post_id: 1
    },
    {
        user_liked_by: 1,
        post_id: 2
    },
    {
        user_liked_by: 3,
        post_id: 4
    },
    {
        user_liked_by: 4,
        post_id: 3
    },
    {
        user_liked_by: 5,
        post_id: 6
    },
    {
        user_liked_by: 6,
        post_id: 5
    },
]

const followsSeeds = [
    {
        follower_id: 2,
        followed_id: 1
    },
    {
        follower_id: 1,
        followed_id: 2
    },
    {
        follower_id: 3,
        followed_id: 4
    },
    {
        follower_id: 4,
        followed_id: 3
    },
    {
        follower_id: 5,
        followed_id: 6
    },
    {
        follower_id: 6,
        followed_id: 5
    }
]

module.exports = {userSeeds, followsSeeds, postSeeds, likesSeeds}