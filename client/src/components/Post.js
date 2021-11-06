import {Link} from "react-router-dom"
import { useQuery } from '@apollo/client';
import { GET_LIKES } from '../utils/queries';

const Post = ({username, firstName, postText, postId}) => {

    const { loading, data } = useQuery(GET_LIKES, {
        variables: { post_id: parseInt(postId) },
      });
      const likes = data?.getLikes || 0;
      if(loading) {
          return <h1></h1>;
        }
    return (
        <div className="singlePostOuterDiv">
            <div className="singlePostHeaderDiv">
                <h4 className="marginOne">{firstName} @<Link to={`/${username}`}>{username}</Link></h4>
            </div>
            <div className="singlePostTextDiv">
                <p>{postText}</p>
            </div>
            <div className="singlePostFooterDiv">
                <h4 className="marginOne" datapostid={postId}>Likes {likes}</h4>
            </div>
        </div>
    )
}

export default Post
