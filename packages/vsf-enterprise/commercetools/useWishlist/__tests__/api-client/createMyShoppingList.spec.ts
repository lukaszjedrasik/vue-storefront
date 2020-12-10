import gql from 'graphql-tag';
import createMyShoppingList from '../../src/api-client/createMyShoppingList';
import defaultMutation from '../../src/api-client/createMyShoppingList/defaultMutation';

const mockContext = {
  config: {
    acceptLanguage: [ 'en', 'de' ],
    currency: 'USD'
  },
  client: {
    mutate: jest.fn(),
  }
};

const givenVariables = {
  acceptLanguage: mockContext.config.acceptLanguage,
  currency: mockContext.config.currency,
  draft: {
    name: [],
    deleteDaysAfterLastModification: 12
  }
};

describe('[commercetools-api-client] createMyShoppingList', () => {
  it('creates a shopping list', async () => {
    mockContext.client.mutate.mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(givenVariables);
      expect(mutation).toEqual(defaultMutation);

      return { data: 'cart response' };
    });

    const { data } = await createMyShoppingList(mockContext, givenVariables.draft);

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

    const data: any = await createMyShoppingList(mockContext, givenVariables.draft, customQuery);

    expect(data.variables).toEqual(variables);
    expect(data.mutation).toEqual(query);
  });
});
