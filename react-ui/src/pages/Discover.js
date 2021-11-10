import React from 'react'
import Post from "../components/Post"
import CreatePost from "../components/CreatePost"
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_POSTS} from '../utils/queries';
import Auth from '../utils/auth';
const Discover = () => {
    const { loading, data } = useQuery(QUERY_POSTS);
      const posts = data?.posts || [];
      console.log(posts)
    if(loading) {
        return <h1></h1>;
    }
    return (
        <>
            {Auth.loggedIn() ? (
            <>
                <CreatePost />
                {posts.map((post) => {
                    return <Post key={post.id} likes={post.likes.length} createdAt={post.createdAt} postId={post.id} username={post.user.username} firstName={post.user.first_name} postText={post.post_text}/>
                })}
            </>
            ) : (
            <>
                {posts.map((post) => {
                    return <Post key={post.id} likes={post.likes.length} createdAt={post.createdAt} postId={post.id} username={post.user.username} firstName={post.user.first_name} postText={post.post_text}/>
                })}
            </>
            )}
        </>
    )
}

export default Discover