import React from 'react'
import Post from "../components/Post"
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_USER_BY_USERNAME } from '../utils/queries';

const Profile = () => {
    let { username } = useParams();

    const { loading, data } = useQuery(QUERY_USER_BY_USERNAME, {
        variables: { username: username },
      });
      const user = data?.user || [];
      console.log(user)
    if(loading) {
        return <h1></h1>;
    }
    return (
        <>
            {user.posts.map((post) => {
                return <Post key={post.id} postId={post.id} username={user.username} firstName={user.first_name} postText={post.post_text}/>
            })}
        </>
    )
}

export default Profile
