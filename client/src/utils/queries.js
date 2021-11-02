export const QUERY_USER = gql`
  query users {
    user {
        id: ID!
        username: String!
        first_name: String!
        createdAt: String!
        posts: [Post]
        followers: [User]
        following: [User]
    }
  }
`;