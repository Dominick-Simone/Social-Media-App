import React, {useState} from 'react'

import { useMutation } from '@apollo/client';

import { CREATE_POST } from '../utils/mutations';
import Auth from '../utils/auth';
const CreatePost = () => {
    const [formState, setFormState] = useState({
        post_text: '',
        user_id: Auth.getProfile().data.id
      });
    const [createPost, { error, data }] = useMutation(CREATE_POST);

    const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createPost({
        variables: { ...formState },
      });
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      post_text: '',
    });
  };
    return (
        <form className="createPostOuterDiv" onSubmit={handleFormSubmit}>
            <div className="createPostHeaderDiv">
                <h3 className="marginOne">Create Post</h3>
            </div>
            <div className="createPostTextAreaDiv">
                <textarea className="createPostTextArea" placeholder="Enter a message..." rows="5" value={formState.post_text} name="post_text" onChange={handleChange}></textarea>
            </div>
            <div className="createPostFooterDiv">
                <a>
                <button disabled={!formState.post_text} type="submit" className="postButton" value="Submit">Post</button>
                </a>
            </div>
        </form>
    )
}

export default CreatePost
