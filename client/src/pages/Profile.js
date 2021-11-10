import React, {useState} from 'react'
import Post from "../components/Post"
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_USER_BY_USERNAME } from '../utils/queries';
import getMonthDay from '../utils/dateFormatter';
import { TOGGLE_FOLLOW } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = () => {
    let { username } = useParams();

    const { loading, data } = useQuery(QUERY_USER_BY_USERNAME, {
        variables: { username: username },
    });
    const user = data?.user || [];
    const [toggleFollow, { error, likeData }] = useMutation(TOGGLE_FOLLOW)
    if (loading) {
        return <h1></h1>;
    }
    const accountCreated = getMonthDay(parseInt(user.createdAt))
    return (
        <>
            <div className="profileOuterDiv">
                <div className="profileHeaderDiv">
                    <h3 className="marginOne">{user.first_name}  @{user.username}</h3>
                    <h4 className="marginOne">Followers: {user.followers.length} Following: {user.following.length}</h4>
                    <button className="followButton" onClick={() => toggleFollow({variables: {followed: parseInt(user.id), user_id: parseInt(Auth.getProfile().data.id)}})}>Follow</button>
                </div>
                <div className="profileTextDiv">
                    <p>Account Created {accountCreated }</p>
                </div>
                
            </div>
            {user.posts.map((post) => {
                return <Post key={post.id} createdAt={post.createdAt} postId={post.id} username={user.username} likes={post.likes.length} firstName={user.first_name} postText={post.post_text} />
            })}
        </>
    )
}

export default Profile
