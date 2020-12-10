import gql from 'graphql-tag';
import addToMyShoppingList from '../../src/api-client/addToMyShoppingList';
import defaultMutation from '../../src/api-client/addToMyShoppingList/defaultMutation';

const mockContext = {
  config: {
    acceptLanguage: [ 'en', 'de' ],
    currency: 'USD'
  },
  client: {
    mutate: jest.fn(),
  }
};

const sku = '70707S';

const givenVariables = {
  acceptLanguage: mockContext.config.acceptLanguage,
  currency: mockContext.config.currency,
  id: 'cart id',
  version: '1',
  actions: [
    { 
      addLineItem: {
        quantity: 1,
        sku
      } 
    }
  ]
};

describe('[commercetools-api-client] addToMyShoppingList', () => {
  it('adds to shopping list', async () => {
    mockContext.client.mutate.mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables);
      expect(mutation).toEqual(defaultMutation);

      return { data: 'cart response' };
    });

    const { data } = await addToMyShoppingList(mockContext, {
      id: 'cart id',
      version: '1',
      product: { sku }
    });

    expect(data).toBe('cart response');
  });

  it('uses a custom query', async () => {
    mockContext.client.mutate.mockImplementation(({ variables, mutation }) => ({ variables, mutation }));

    const query = gql(`
      mutation someCustom {
        someCustom {
          id
        }
      }
    `);
    const variables = { id: 123 };

    const customQuery = (currentQuery, currentVariables) => {
      expect(currentQuery).toEqual(defaultMutation);
      expect(currentVariables).toEqual(givenVariables);

      return { query, variables };
    };

    const data: any = await addToMyShoppingList(mockContext, {
      id: 'cart id',
      version: '1',
      product: {
        sku
      }
    }, customQuery);

    expect(data.variables).toEqual(variables);
    expect(data.mutation).toEqual(query);
  });
});
