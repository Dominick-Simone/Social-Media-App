import { gql } from "@apollo/client"

export const CREATE_USER = gql`
mutation createUser ($username:String! $first_name:String! $last_name:String! $email:String! $password:String!) {
    createUser(username: $username first_name:$first_name last_name:$last_name email:$email password:$password) {
      user {
        username
        id
      }
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const CREATE_POST = gql`
mutation($user_id: ID! $post_text: String!){
  createPost(user_id: $user_id post_text: $post_text) {
    id
  }
}
`;

export const TOGGLE_LIKE = gql`
mutation($post_id: ID!){
	toggleLike(post_id: $post_id)
}
`;

export const TOGGLE_FOLLOW = gql`
mutation($followed: ID!){
  toggleFollow(followed: $followed) 
}
`;

export const ADD_COMMENT = gql`
mutation($comment_text: String! $post_id: ID!) {
  createComment(post_id: $post_id comment_text: $comment_text) {
    comment_text
    createdAt
    user {
      username
      first_name
    }
  }
}`

export const CHECK_LIKE = gql`
mutation($post_id: ID!){
  checkLike(post_id: $post_id)
}
`;

export const CHECK_FOLLOW = gql`
mutation($user_id: ID!){
  checkFollow(user_id: $user_id)
}
`;