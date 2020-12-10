import { useReview } from '../src/composables/useReview';

/************************************************ Mock data ************************************************/
const mockReviews = [
  { id: 1 },
  { id: 2 }
];

const mockContext = {
  $ct: {
    api: {
      addReview: jest.fn().mockImplementation(() => mockReviews),
      getReview: jest.fn().mockImplementation(() => mockReviews),
      getProduct: jest.fn().mockImplementation(() => ({ data: { products: { results: [ { reviewRatingStatistics: {} } ] } } }))
    }
  }
}

/************************************************ Mock modules ************************************************/
jest.mock('@vue-storefront/core', () => ({
  useReviewFactory: (factoryParams: any): any => {
    const methods = {
      search: (params) => factoryParams.searchReviews(mockContext, params),
      addReview: (params) => factoryParams.addReview(mockContext, params)
    };

    return () => methods;
  }
}));

/************************************************ Run tests ************************************************/
describe('[ct-reviews] useReview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows to call "search"', async () => {
    const params = { productId: '1' };
    const { search } = useReview('CACHE_ID');
    const result = await search(params);

    expect(mockContext.$ct.api.getReview).toBeCalledWith(params);
    expect(result).toEqual({ ...mockReviews });
  });

  it('allows to call "addReview"', async () => {
    const params = {
      productId: '1',
      draft: { key: 'value' }
    };
    const { addReview } = useReview('CACHE_ID');
    const result = await addReview(params);

    expect(mockContext.$ct.api.addReview).toBeCalledWith(params);
    expect(mockContext.$ct.api.getReview).toBeCalledWith(expect.objectContaining({ productId: params.productId }));
    expect(result).toEqual({ ...mockReviews });
  });
});
