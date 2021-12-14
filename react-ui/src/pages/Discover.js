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
    if(loading) {
        return <h1></h1>;
    }
    let allPosts = [];
    posts.forEach((post) => {
        allPosts.push(post)
    })
    const sortByPostDate = (a,b) => {
        return b.createdAt - a.createdAt;
    }
    allPosts.sort(sortByPostDate)
    return (
        <>
            {Auth.loggedIn() ? (
            <>
                <CreatePost />
                <div className="postContainer">
                {allPosts.map((post) => {
                    return <Post key={post.id} comments={post.comments} likes={post.likes.length} createdAt={post.createdAt} postId={post.id} username={post.user.username} firstName={post.user.first_name} postText={post.post_text}/>
                })}
                </div>
            </>
            ) : (
            <>
                <div className="postContainer">
                {allPosts.map((post, index) => {
                    return <Post key={post.id} index={index} comments={post.comments} likes={post.likes.length} createdAt={post.createdAt} postId={post.id} username={post.user.username} firstName={post.user.first_name} postText={post.post_text}/>
                })}
                </div>
            </>
            )}
        </>
    )
}

export default Discover