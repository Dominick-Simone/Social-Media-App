import React, {useState, useEffect} from 'react'
import Post from "../components/Post"
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_USER, QUERY_USER_BY_USERNAME } from '../utils/queries';
import getMonthDay from '../utils/dateFormatter';
import { TOGGLE_FOLLOW } from '../utils/mutations';
import Auth from '../utils/auth';

const Profile = () => {
    let { username } = useParams();
    const [following, setFollowing] = useState(0)
    const [followers, setFollowers] = useState(0)
    const { loading, data } = useQuery(QUERY_USER_BY_USERNAME, {
        variables: { username: username },
    });
    const user = data?.user || [];
    const [toggleFollow, { error, followData }] = useMutation(TOGGLE_FOLLOW, {
        onCompleted: (data) => setFollowers(followers + data.toggleFollow)
    })
    useEffect(() => {
        if (data) {
            setFollowers(user.followers.length)
            setFollowing(user.following.length)
        }
    },[data])
    if (loading) {
        return <h1></h1>;
    }
    const accountCreated = getMonthDay(parseInt(user.createdAt))
    return (
        <>
            <div className="profileOuterDiv">
                <div className="profileHeaderDiv">
                    <h3 className="marginOne">{user.first_name}  @{user.username}</h3>
                    {Auth.loggedIn() ? (
                        <>
                        <button className="followButton" onClick={() => toggleFollow({variables: {followed: parseInt(user.id), user_id: parseInt(Auth.getProfile().data.id)}})}>Follow</button>
                    </>
                    ) : (
                        <p></p>
                        )
                    }
                    
                </div>
                <div className="profileTextDiv">
                    <h4 className="marginSmall">Followers: {followers} Following: {following}</h4>
                    <p>Joined {accountCreated }</p>
                </div>
                
            </div>
            <div className="postContainer">
            {user.posts.map((post) => {
                return <Post key={post.id} createdAt={post.createdAt} postId={post.id} username={user.username} likes={post.likes.length} firstName={user.first_name} postText={post.post_text} />
            })}
            </div>
        </>
    )
}

export default Profile
