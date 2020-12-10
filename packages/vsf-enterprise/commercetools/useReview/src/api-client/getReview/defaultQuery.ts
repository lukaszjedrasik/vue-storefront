import gql from 'graphql-tag';

export const getReviewQuery = gql`
  query reviews(
    $where: String!,
    $limit: Int,
    $offset: Int
  ) {
    reviews(
      where: $where,
      limit: $limit,
      offset: $offset
    ) {
      offset,
      count,
      total,
      results {
        id,
        text,
        authorName,
        rating,
        createdAt
      }
    }
  }
`;
