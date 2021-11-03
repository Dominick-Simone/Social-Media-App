import React from 'react'
import Post from "../components/Post"
import CreatePost from "../components/CreatePost"
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_POSTS, QUERY_USER, QUERY_USER_BY_USERNAME } from '../utils/queries';
const Home = () => {
    let { username } = useParams();

    const { loading, data } = useQuery(QUERY_POSTS);
      const posts = data?.posts || [];
      console.log(posts)
    if(loading) {
        return <h1>Loading</h1>;
    }
    return (
        <>
            {/* if logged in */}
            <CreatePost />
            {posts.map((post) => {
                return <Post username={post.user.username} firstName={post.user.first_name} postText={post.post_text}/>
            })}
        </>
    )
}

export default Home
