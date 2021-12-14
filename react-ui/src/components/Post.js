import { Link } from "react-router-dom"
import { useState } from "react"
import { useMutation, useQuery } from '@apollo/client';
import { GET_LIKES } from '../utils/queries';
import { ADD_COMMENT, TOGGLE_LIKE } from "../utils/mutations"
import getMonthDay from "../utils/dateFormatter";
import Auth from '../utils/auth';
import ReactEmoji from "react-emoji"

const Post = ({ username, firstName, postText, postId, createdAt, likes, comments, index }) => {


    const [likeCount, setLikeCount] = useState(likes)
    const [currentComments, setComments] = useState(comments)
    const [commentText, setCommentText] = useState('')
    const [addComment, { commentError, commentData }] = useMutation(ADD_COMMENT, {
        onCompleted: (data) => setComments([...currentComments, data.createComment])
    })
    console.log(currentComments)
    const [toggleLike, { error, data }] = useMutation(TOGGLE_LIKE, {
        onCompleted: (data) => setLikeCount(likeCount + data.toggleLike)
    })
    const [showComments, setShowComments] = useState(false)
    const toggleComments = () => {
        setShowComments(!showComments)
    }
    const handleClick = async () => {
        try {
            const { data } = await toggleLike({ variables: { post_id: parseInt(postId), user_liked_by: parseInt(Auth.getProfile().data.id) } }
            )
        } catch (err) {
            console.log(err)
        }
    }
    const handleCommentSubmit = async (event) => {
        event.preventDefault()
        addComment({variables: {post_id: postId, comment_text: commentText}})
        setCommentText('')
    }
    const handleCommentChange = async (event) => {
        setCommentText(event.target.value)
    }
    const datePosted = getMonthDay(parseInt(createdAt))
    return (
        <div className={showComments && index != 0 ? "postOuterDivBackground" : "postOuterDiv"}>
            <div className="singlePostHeaderDiv">
                <h4 className="marginOne inline">{firstName} @{username === Auth.getProfile().data.username ? <Link to="/dashboard">{username}</Link> : <Link to={`/${username}`}>{username}</Link>}</h4><p className="inline">{datePosted}</p>
            </div>
            <div className="singlePostTextDiv">
                <p>{ReactEmoji.emojify(postText)}</p>
            </div>
            <div className="singlePostFooterDiv">
                {Auth.loggedIn() ? (
                    <>
                        <button className="marginOne commentButton" onClick={() => toggleComments()}>Comments {comments ? currentComments.length : 0}</button>
                        <button className="marginOne likeButton" onClick={() => handleClick()} datapostid={postId}>Like</button>
                        <h4 className="likeCount">{likeCount}</h4>
                    </>) :
                    <h4>Likes: {likeCount}</h4>
                }
            </div>
            {showComments && currentComments.length > 0 ?
                <div>
                    <form onSubmit={handleCommentSubmit}>
                        <h3 className="addCommentLabel">Add a Comment:</h3>
                        <div className="addCommentDiv">
                            <textarea rows="2" className="addCommentInput" value={commentText} onChange={handleCommentChange} type="text" />
                        </div>
                        <div className="commentButtonDiv">
                            <button className="sendCommentButton" type="submit">Send</button>
                        </div>
                    </form>
                    <h2 className="marginSmall">Comments</h2>
                    {currentComments.map((comment) => {
                    const dateCommentPosted = getMonthDay(parseInt(comment.createdAt))
                    return (
                        <div className="singleCommentDiv">
                            <h4 className="marginSmall inline">{comment.user.first_name}</h4>
                            <h4 className="marginSmall inline">@{comment.user.username === Auth.getProfile().data.username ? <Link to="/dashboard">{comment.user.username}</Link> : <Link to={`/${comment.user.username}`}>{comment.user.username}</Link>}</h4>
                            <p className="inline">{dateCommentPosted}</p>
                            <p className="singlePostTextDiv">{ReactEmoji.emojify(comment.comment_text)}</p>
                        </div>
                    )})}
                </div>
                : <></>
            }
            {showComments && currentComments.length <= 0 ?
                (<form onSubmit={handleCommentSubmit}>
                    <h3 className="addCommentLabel">Add a Comment:</h3>
                    <div className="addCommentDiv">
                        <textarea rows="2" className="addCommentInput" value={commentText} onChange={handleCommentChange} type="text" />
                    </div>
                    <div className="commentButtonDiv">
                            <button className="sendCommentButton" type="submit">Send</button>
                        </div>
                </form>) : (
                    <></>
                )
            }

        </div>
    )
}

export default Post
