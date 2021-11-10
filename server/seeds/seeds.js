const userSeeds = [
    {
        username: "Domsimone",
        first_name: "Dominick",
        last_name: "Simone",
        email: "domsimonedev@gmail.com",
        password: "password123"
    },
    {
        username: "John3445",
        first_name: "John",
        last_name: "John",
        email: "john@gmail.com",
        password: "password123"
    },
    {
        username: "Jim3847",
        first_name: "Jim",
        last_name: "Jim",
        email: "Jim@gmail.com",
        password: "password123"
    },
    {
        username: "Anthony3727",
        first_name: "Anthony",
        last_name: "Anthony",
        email: "Anthony@gmail.com",
        password: "password123"
    },
    {
        username: "Andrew3521",
        first_name: "Andrew",
        last_name: "Andrew",
        email: "Andrew@gmail.com",
        password: "password123"
    },
    {
        username: "Ryan4634",
        first_name: "Ryan",
        last_name: "Ryan",
        email: "Ryan@gmail.com",
        password: "password123"
    },
]

const postSeeds = [
    {
        user_id: 4,
        post_text: "This is just an example post."
    },
    {
        user_id: 2,
        post_text: "This is just an example post."
    },
    {
        user_id: 3,
        post_text: "This is just an example post."
    },
    {
        user_id: 1,
        post_text: "This is just an example post."
    },
    {
        user_id: 5,
        post_text: "This is just an example post."
    },
    {
        user_id: 6,
        post_text: "This is just an example post."
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