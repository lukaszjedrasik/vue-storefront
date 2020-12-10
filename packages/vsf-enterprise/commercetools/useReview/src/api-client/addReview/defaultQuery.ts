import gql from 'graphql-tag';

export const addReviewQuery = gql`
  mutation addReview($draft: ReviewDraft!) {
    review: createReview(draft: $draft) {
      id,
      text,
      authorName,
      rating
    }
  }
`;
