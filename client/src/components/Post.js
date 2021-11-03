import {Link} from "react-router-dom"
const Post = ({username, firstName, postText}) => {
    return (
        <div className="singlePostOuterDiv">
            <div className="singlePostHeaderDiv">
                <h4 className="marginOne">{firstName} @<Link to={`/${username}`}>{username}</Link></h4>
            </div>
            <div className="singlePostTextDiv">
                <p>{postText}</p>
            </div>
            <div className="singlePostFooterDiv">
                <h4 className="marginOne">Likes</h4>
            </div>
        </div>
    )
}

export default Post
