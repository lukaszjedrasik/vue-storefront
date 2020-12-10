export type Review = any; // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4900
export type ReviewDraft = any; // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4900

export type ReviewResponse = {
  results: Review[],
  total: number;
  limit: number;
  offset: number;
  averageRating: number;
  ratingsDistribution: {
    [rating: number]: number;
  };
}

export type ReviewSearchParams =  {
  productId: string;
  limit?: number;
  offset?: number;
}

export type ReviewAddParams = {
  productId: string;
  limit?: number;
  offset?: number;
  draft: ReviewDraft;
};
