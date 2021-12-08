import React from 'react'
import Post from "../components/Post"
import CreatePost from "../components/CreatePost"
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { HOMEPAGE, QUERY_POSTS, QUERY_USER, QUERY_USER_BY_USERNAME } from '../utils/queries';
import Auth from '../utils/auth';

const Home = () => {
    
    const { loading, data } = useQuery(HOMEPAGE, {
        variables: {user_id: Auth.getProfile().data.id}
    });
    
    const user = data?.homepage || [];
    
    if(loading) {
        return <h1></h1>;
    }
    const posts = [];
    user.posts.forEach((post) => {
        posts.push(post)
    })
    user.following.forEach((following) => {
        following.posts.forEach((post) => {
            posts.push(post)
        })
    })
    console.log(posts)
    return (
        <>
            {/* if logged in */}
            <CreatePost />
            <div className="postContainer">
                {posts.map((post) => {
                    return <Post key={post.id} likes={post.likes.length} createdAt={post.createdAt} postId={post.id} username={post.user.username} firstName={post.user.first_name} postText={post.post_text} />
                })}
            </div>
        </>
    )
}

export default Home
