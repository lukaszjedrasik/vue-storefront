import gql from 'graphql-tag';
import { addReviewQuery } from './defaultQuery';
import { ReviewAddParams, ReviewResponse } from '../../types';
import { getCustomQuery } from '@vue-storefront/commercetools-api';

export default async function addReview (context, params: ReviewAddParams, customQueryFn?): Promise<ReviewResponse> {
  const defaultVariables = {
    draft: {
      ...params.draft,
      target: {
        typeId: 'product',
        id: params.productId
      }
    }
  };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery: addReviewQuery, defaultVariables });

  return context.client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });
}
