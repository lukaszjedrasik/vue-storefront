import { Review, ReviewSearchParams, ReviewAddParams } from '../types';
import { useReviewFactory, UseReview, UseReviewFactoryParams } from '@vue-storefront/core';

const factoryParams: UseReviewFactoryParams<Review, ReviewSearchParams, ReviewAddParams> = {
  searchReviews: async (context, params) => {
    const reviews = await context.$ct.api.getReview(params)

    const product: any = await context.$ct.api.getProduct({
      id: params.productId,
      limit: 1,
    });

    return {
      ...reviews,
      ...product.data.products.results[0].reviewRatingStatistics,
    }
  },
  addReview: async (context, params) => {
    await context.$ct.api.addReview(params)

    return factoryParams.searchReviews(context, {
      productId: params.productId,
      limit: params.limit,
      offset: params.offset,
    });
  }
};

export const useReview: (cacheId: string) => UseReview<Review, ReviewSearchParams, ReviewAddParams> = useReviewFactory<Review, ReviewSearchParams, ReviewAddParams>(factoryParams);
