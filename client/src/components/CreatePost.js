import React from 'react'

const CreatePost = () => {
    return (
        <div className="createPostOuterDiv">
            <div className="createPostHeaderDiv">
                <h3 className="marginOne">Create Post</h3>
            </div>
            <div className="createPostTextAreaDiv">
                <textarea className="createPostTextArea" placeholder="Enter a message..." rows="5"></textarea>
            </div>
            <div className="createPostFooterDiv">
                <h4 className="createPostBtn">Post</h4>
            </div>
        </div>
    )
}

export default CreatePost
