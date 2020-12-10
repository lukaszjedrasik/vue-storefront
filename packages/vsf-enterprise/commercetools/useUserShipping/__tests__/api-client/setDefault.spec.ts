import gql from "graphql-tag";
import setDefault from '../../src/api-client/setDefault';
import { setDefaultAddressQuery } from '../../src/api-client/setDefault/defaultQuery';

const mockContext = {
  client: {
    mutate: jest.fn(),
  }
};

jest.mock('@vue-storefront/commercetools', () => {
  const user = { value: { version: 1 } };

  return {
    useUser: () => ({ user, load: jest.fn() }),
    setUser: params => user.value = params,
  };
});

const setDefaultAddressVariables = {
  actions: [
    { setDefaultShippingAddress: {} } // this object will contain more data, but there is no point in checking everything in here
  ],
  version: 1
};

const setDefaultAddressResponse: any = (address) => ({
  data: {
    user: {
      version: 2,
      addresses: [ address ]
    }
  }
});

describe('[ct-shipping] API - setDefault', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('marks address as default', async () => {
    const params: any = {
      address: {
        id: '1'
      },
      user: {
        version: 1
      }
    };

    jest.spyOn(mockContext.client, 'mutate').mockImplementation(({ variables, mutation }) => {
      expect(variables).toMatchObject(setDefaultAddressVariables);
      expect(mutation).toEqual(setDefaultAddressQuery);
      return setDefaultAddressResponse(params.address);
    });

    await setDefault(mockContext, params);
  });

  it('can be called with custom query', async () => {
    const customQueryResult = {
      query: gql`
        query someQuery {
          someQuery { id }
        }
      `,
      variables: { prop1: '1' }
    };
    const params: any = {
      address: {
        id: '1',
      },
      user: {
        version: 1
      }
    };

    jest.spyOn(mockContext.client, 'mutate').mockImplementation(({ variables, mutation }) => {
      expect(variables).toEqual(customQueryResult.variables);
      expect(mutation).toEqual(customQueryResult.query);
      return setDefaultAddressResponse(params.address);
    });

    await setDefault(mockContext, params, () => customQueryResult);
  });
});
