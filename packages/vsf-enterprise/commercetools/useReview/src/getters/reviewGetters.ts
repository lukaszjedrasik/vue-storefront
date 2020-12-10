
import { Review, ReviewResponse } from '../types';
import { ReviewGetters, AgnosticRateCount, useVSFContext } from '@vue-storefront/core';

export const getItems = (review: ReviewResponse): Review[] => review?.results || [];

export const getReviewId = (item: Review): string => item?.id || '';

export const getReviewAuthor = (item: Review): string => item?.authorName || '';

export const getReviewMessage = (item: Review): string => item?.text || '';

export const getReviewRating = (item: Review): number => item?.rating || 0;

export const getReviewDate = (item: Review): string => {
  if (!item?.createdAt) {
    return '';
  }

  const { $ct: { config: { acceptLanguage } }} = useVSFContext();

  const date = new Date(item.createdAt);

  return new Intl.DateTimeFormat(acceptLanguage).format(date);
};

export const getTotalReviews = (review: ReviewResponse): number => review?.total || 0;

export const getAverageRating = (review: ReviewResponse): number => review?.averageRating || 0;

export const getRatesCount = (review: ReviewResponse): AgnosticRateCount[] => {
  const rates = review?.ratingsDistribution || {};

  return Object
    .entries(rates)
    .map(([rate, count]) => ({
      rate: Number(rate),
      count: Number(count)
    }));
};

export const getReviewsPage = (review: ReviewResponse): number => {
  const limit = review?.limit || 0;
  const offset = review?.offset || 0;

  if (!limit) {
    return 1;
  }

  return offset / limit + 1;
};

export const reviewGetters: ReviewGetters<ReviewResponse, Review> = {
  getItems,
  getReviewId,
  getReviewAuthor,
  getReviewMessage,
  getReviewRating,
  getReviewDate,
  getTotalReviews,
  getAverageRating,
  getRatesCount,
  getReviewsPage
};
