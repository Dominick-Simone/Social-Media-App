import {gql} from "@apollo/client"
export const QUERY_USER = gql`
  query users {
    user {
        id
        username
        first_name
        createdAt
        posts
        followers
        following
    }
  }
`;