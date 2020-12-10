import gql from 'graphql-tag';
import getReview from '../../src/api-client/getReview';
import { getReviewQuery } from '../../src/api-client/getReview/defaultQuery';

const mockResponse = [
  { id: 1 },
  { id: 2 }
];

const mockContext = {
  client: {
    query: jest.fn()
  }
};

describe('[ct-reviews] API - getReview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns reviews', async () => {
    const params = { productId: '1' };

    jest.spyOn(mockContext.client, 'query').mockImplementation(({ variables, query }) => {
      expect(variables).toMatchObject({ where: expect.stringContaining(params.productId) });
      expect(query).toEqual(getReviewQuery);
      return { data: { reviews: mockResponse } };
    });

    const response = await getReview(mockContext, params);
    expect(response).toMatchObject({ ...mockResponse });
  });

  it('can be called with custom query', async () => {
    const params = { productId: '1' };

    const query = gql`
      query someQuery {
        someQuery { id }
      }
    `;

    const customQuery = jest.fn().mockImplementation(({ defaultVariables }) => ({
      query,
      variables: defaultVariables
    }));

    jest.spyOn(mockContext.client, 'query').mockImplementation(({ variables, query }) => {
      expect(variables).toMatchObject({ where: expect.stringContaining(params.productId) });
      expect(query).toEqual(query);
      return { data: { reviews: mockResponse } };
    });

    const response = await getReview(mockContext, params, customQuery);
    expect(response).toMatchObject({ ...mockResponse });
    expect(customQuery).toBeCalled();
  });
});
