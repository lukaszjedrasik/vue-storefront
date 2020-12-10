import { reviewGetters } from '../src/getters/reviewGetters';

jest.mock('@vue-storefront/core', () => ({
  useVSFContext: () => ({ $ct : { config: { acceptLanguage: 'en' } } })
}));

const reviews: any = {
  results: [
    {
      id: 1,
      authorName: 'AUTHOR',
      text: 'TEXT',
      rating: 'RATING',
      createdAt: '2020-12-09T01:00:00.000Z',
    }
  ],
  averageRating: 4.29,
  ratingsDistribution: {
    4: '5',
    5: '2'
  },
  total: 1,
  limit: 10,
  offset: 20,
};

describe('[ct-reviews] useReviewGetters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all reviews', () => {
    expect(reviewGetters.getItems(reviews)).toEqual(reviews.results);
    expect(reviewGetters.getItems(undefined)).toEqual([]);
  });

  it('returns review id', () => {
    expect(reviewGetters.getReviewId(reviews.results[0])).toBe(1);
    expect(reviewGetters.getReviewId(undefined)).toBe('');
  });

  it('returns review author', () => {
    expect(reviewGetters.getReviewAuthor(reviews.results[0])).toBe('AUTHOR');
    expect(reviewGetters.getReviewAuthor(undefined)).toBe('');
  });

  it('returns review message', () => {
    expect(reviewGetters.getReviewMessage(reviews.results[0])).toBe('TEXT');
    expect(reviewGetters.getReviewMessage(undefined)).toBe('');
  });

  it('returns review rating', () => {
    expect(reviewGetters.getReviewRating(reviews.results[0])).toBe('RATING');
    expect(reviewGetters.getReviewRating(undefined)).toBe(0);
  });

  it('returns review date', () => {
    expect(reviewGetters.getReviewDate(reviews.results[0])).toBe('12/9/2020');
    expect(reviewGetters.getReviewDate(undefined)).toBe('');
  });

  it('returns total reviews count', () => {
    expect(reviewGetters.getTotalReviews(reviews)).toBe(1);
    expect(reviewGetters.getTotalReviews(undefined)).toBe(0);
  });

  it('returns average rating', () => {
    expect(reviewGetters.getAverageRating(reviews)).toBe(4.29);
    expect(reviewGetters.getAverageRating(undefined)).toBe(0);
  });

  it('returns rates count', () => {
    expect(reviewGetters.getRatesCount(reviews)).toEqual([
      { rate: 4, count: 5 },
      { rate: 5, count: 2 }
    ]);
    expect(reviewGetters.getRatesCount(undefined)).toEqual([]);
  });

  it('returns pagination page', () => {
    expect(reviewGetters.getReviewsPage(reviews)).toBe(3);
    expect(reviewGetters.getReviewsPage(undefined)).toBe(1);
  });
});
