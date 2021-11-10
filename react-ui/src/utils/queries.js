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
          id
          post_text
          createdAt
          likes {
            id
          }
        }
        followers {
          username
          posts {
            post_text
          }
        }
        following {
          username
          posts {
            post_text
          }
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
    likes {
      id
    }
    createdAt
  }
}
`;

export const GET_LIKES = gql`
query getLikes($post_id: ID!) {
  getLikes(post_id: $post_id) 
}
`;

export const HOMEPAGE = gql`
query userByUsername($user_id: ID!) {
  homepage(user_id: $user_id) {
      id
      username
      first_name
      createdAt
      posts {
        id
        post_text
        createdAt
      }
      following {
        username
        id
        posts {
          id
          post_text
          createdAt
          user {
            username
            first_name
            id
          }
          likes {
            id
          }
        }
      }
  }
}
`;