import gql from 'graphql-tag';
import addReview from '../../src/api-client/addReview';
import { addReviewQuery } from '../../src/api-client/addReview/defaultQuery';

const mockContext = {
  client: {
    mutate: jest.fn()
  }
};

describe('[ct-reviews] API - addReview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('adds new review and returns the response', async () => {
    const params = {
      productId: '1',
      draft: { text: 'Test' }
    };

    jest.spyOn(mockContext.client, 'mutate').mockImplementation(({ variables, mutation }) => {
      expect(variables).toMatchObject({ draft: params.draft });
      expect(mutation).toEqual(addReviewQuery);
      return { key: 'value' };
    });

    const response = await addReview(mockContext, params);
    expect(response).toMatchObject({ key: 'value' });
  });

  it('can be called with custom query', async () => {
    const params = {
      productId: '1',
      draft: { text: 'Test' }
    };

    const query = gql`
      query someQuery {
        someQuery { id }
      }
    `;

    const customQuery = jest.fn().mockImplementation(({ defaultVariables }) => ({
      query,
      variables: defaultVariables
    }));

    jest.spyOn(mockContext.client, 'mutate').mockImplementation(({ variables, mutation }) => {
      expect(variables).toMatchObject({ draft: params.draft });
      expect(mutation).toEqual(query);
      return { key: 'value' };
    });

    const response = await addReview(mockContext, params, customQuery);
    expect(response).toMatchObject({ key: 'value' });
    expect(customQuery).toBeCalled();
  });
});
