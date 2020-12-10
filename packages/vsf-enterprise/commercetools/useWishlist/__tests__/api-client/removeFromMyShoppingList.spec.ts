import gql from 'graphql-tag';
import removeFromMyShoppingList from '../../src/api-client/removeFromMyShoppingList';
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

const lineItemId = '323232';

const givenVariables = {
  acceptLanguage: mockContext.config.acceptLanguage,
  currency: mockContext.config.currency,
  id: 'cart id',
  version: '1',
  actions: [
    { 
      removeLineItem: {
        quantity: 1,
        lineItemId
      }
    }
  ]
};

describe('[commercetools-api-client] removeFromMyShoppingList', () => {
  it('removes product from shopping list', async () => {
    mockContext.client.mutate.mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables);
      expect(mutation).toEqual(defaultMutation);

      return { data: 'cart response' };
    });

    const { data } = await removeFromMyShoppingList(mockContext, {
      id: 'cart id',
      version: '1',
      products: [
        {
          id: lineItemId,
          productId: 'a',
          productTypeRef: {
            typeId: '',
            id: ''
          },
          productType: {
            id: '',
            createdAt: '',
            version: '',
            lastModifiedAt: '',
            name: '',
            description: '',
            attributeDefinitions: {
              total: 5,
              results: []
            }
          },
          quantity: 5,
          addedAt: '',
          nameAllLocales: []
        }
      ]
    });

    expect(data).toBe('cart response');
  });

  it('removes a few products from shopping list', async () => {

    const firstItemId = 'dasdas';
    const secondItemId = 'xcxcxcxc';

    const expectedVariables = {
      acceptLanguage: ['en', 'de'],
      currency: 'USD',
      id: 'cart id',
      version: '1',
      actions: [
        { 
          removeLineItem: {
            quantity: 1,
            lineItemId: firstItemId
          }
        },
        { 
          removeLineItem: {
            quantity: 1,
            lineItemId: secondItemId
          }
        }
      ]
    };

    mockContext.client.mutate.mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(expectedVariables);
      expect(mutation).toEqual(defaultMutation);

      return { data: 'cart response' };
    });

    const { data } = await removeFromMyShoppingList(mockContext, {
      id: 'cart id',
      version: '1',
      products: [
        {
          id: firstItemId,
          productId: 'a',
          productTypeRef: {
            typeId: '',
            id: ''
          },
          productType: {
            id: '',
            createdAt: '',
            version: '',
            lastModifiedAt: '',
            name: '',
            description: '',
            attributeDefinitions: {
              total: 5,
              results: []
            }
          },
          quantity: 5,
          addedAt: '',
          nameAllLocales: []
        },
        {
          id: secondItemId,
          productId: 'a',
          productTypeRef: {
            typeId: '',
            id: ''
          },
          productType: {
            id: '',
            createdAt: '',
            version: '',
            lastModifiedAt: '',
            name: '',
            description: '',
            attributeDefinitions: {
              total: 5,
              results: []
            }
          },
          quantity: 5,
          addedAt: '',
          nameAllLocales: []
        }
      ]
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

    const data: any = await removeFromMyShoppingList(mockContext, {
      id: 'cart id',
      version: '1',
      products: [
        {
          id: lineItemId,
          productId: 'a',
          productTypeRef: {
            typeId: '',
            id: ''
          },
          productType: {
            id: '',
            createdAt: '',
            version: '',
            lastModifiedAt: '',
            name: '',
            description: '',
            attributeDefinitions: {
              total: 5,
              results: []
            }
          },
          quantity: 5,
          addedAt: '',
          nameAllLocales: []
        }
      ]
    }, customQuery);

    expect(data.variables).toEqual(variables);
    expect(data.mutation).toEqual(query);
  });
});
