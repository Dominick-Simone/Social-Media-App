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
mutation($user_liked_by: ID! $post_id: ID!){
	toggleLike(user_liked_by: $user_liked_by post_id: $post_id)
}
`;

export const TOGGLE_FOLLOW = gql`
mutation($followed: ID! $user_id: ID!){
  toggleFollow(followed: $followed user_id: $user_id) 
}
`;