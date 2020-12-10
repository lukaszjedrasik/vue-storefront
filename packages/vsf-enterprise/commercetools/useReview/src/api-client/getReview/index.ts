import gql from 'graphql-tag';
import { getReviewQuery } from './defaultQuery';
import { ReviewSearchParams, ReviewResponse } from '../../types';
import { getCustomQuery } from '@vue-storefront/commercetools-api';

export default async function getReview (context, params: ReviewSearchParams, customQueryFn?): Promise<ReviewResponse> {
  const defaultVariables = {
    where: `target(id = "${params.productId}")`,
    limit: params.limit,
    offset: params.offset,
  };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery: getReviewQuery, defaultVariables });

  const request = await context.client.query({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return {
    ...request.data.reviews,
    limit: params.limit || 0
  };
}
