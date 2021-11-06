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
