import gql from 'graphql-tag';
import getMyShoppingList from '../../src/api-client/getMyShoppingList';
import { basicProfile } from '../../src/api-client/getMyShoppingList/defaultQuery';

const mockContext = {
  config: {
    acceptLanguage: [ 'en', 'de' ],
    currency: 'USD'
  },
  client: {
    query: jest.fn(),
  }
};

const givenVariables = {
  acceptLanguage: mockContext.config.acceptLanguage,
  currency: mockContext.config.currency,
};

describe('[commercetools-api-client] getMyShoppingList', () => {
  it('gets my shopping list', async () => {
    mockContext.client.query.mockImplementation(({ variables, query }) => {
      expect(variables).toEqual(givenVariables);
      expect(query).toEqual(basicProfile);

      return { data: 'cart response' };
    });

    const { data } = await getMyShoppingList(mockContext);

    expect(data).toBe('cart response');
  });

  it('uses a custom query', async () => {
    mockContext.client.query.mockImplementation(({ variables, query }) => ({ variables, query }));

    const query = gql(`
      query someCustom {
        someCustom {
          id
        }
      }
    `);
    const variables = { id: 123 };

    const customQuery = (currentQuery, currentVariables) => {
      expect(currentQuery).toEqual(basicProfile);
      expect(currentVariables).toEqual(givenVariables);

      return { query, variables };
    };

    const data: any = await getMyShoppingList(mockContext, customQuery);

    expect(data.variables).toEqual(variables);
    expect(data.query).toEqual(query);
  });
});
