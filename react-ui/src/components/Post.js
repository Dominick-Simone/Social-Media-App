import {Link} from "react-router-dom"
import {useState} from "react"
import { useMutation, useQuery } from '@apollo/client';
import { GET_LIKES } from '../utils/queries';
import { TOGGLE_LIKE } from "../utils/mutations"
import getMonthDay from "../utils/dateFormatter";
import Auth from '../utils/auth';

const Post = ({username, firstName, postText, postId, createdAt, likes}) => {


    const [likeCount, setLikeCount] = useState(likes)
    const [toggleLike, { error, data }] = useMutation(TOGGLE_LIKE, {
        onCompleted: (data) => setLikeCount(likeCount + data.toggleLike)
    })
    
    const handleClick = async () => {
        try {
            const {data} = await toggleLike({variables: {post_id: parseInt(postId), user_liked_by: parseInt(Auth.getProfile().data.id)}}
)           
        } catch (err) {
            console.log(err)
        }
    }
    const datePosted = getMonthDay(parseInt(createdAt))
    return (
        <div className="singlePostOuterDiv">
            <div className="singlePostHeaderDiv">
                <h4 className="marginOne">{firstName} @<Link to={`/${username}`}>{username}</Link></h4><p>{datePosted}</p>
            </div>
            <div className="singlePostTextDiv">
                <p>{postText}</p>
            </div>
            <div className="singlePostFooterDiv">
                {Auth.loggedIn() ? (
                    <>
                    <button className="marginOne postButton" onClick={() => handleClick()} datapostid={postId}>Like</button><h4>{likeCount}</h4></>) :
                    <h4>Likes: {likeCount}</h4>
                }
            </div>
        </div>
    )
}

export default Post
