import { gql } from "@apollo/client"

export const QUERY_USER = gql`
query users {
    users {
        id
        username
        first_name
        createdAt
        posts {
          post_text
        }
        followers {
          username
        }
        following {
          username
        }
    }
  }
`;

export const QUERY_USER_BY_USERNAME = gql`
query userByUsername($username: String!) {
    user(username: $username) {
        id
        username
        first_name
        createdAt
        posts {
          post_text
        }
        followers {
          username
        }
        following {
          username
        }
    }
  }
`;
export const QUERY_POSTS = gql`
query posts {
  posts {
    id
    post_text
    user {
      username
      first_name
    }
    createdAt
  }
}
`;
