
import gql from "graphql-tag";
import deleteAddress from '../../src/api-client/deleteAddress';
import { deleteAddressQuery } from '../../src/api-client/deleteAddress/defaultQuery';

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

const deleteAddressVariables = {
  actions: [
    { removeAddress: {} } // this object will contain more data, but there is no point in checking everything in here
  ],
  version: 1
};

const deleteAddressResponse: any = (address) => ({
  data: {
    user: {
      version: 2,
      addresses: [ address ]
    }
  }
});

describe('[ct-billing] API - deleteAddress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deletes address and returns array of addresses', async () => {
    const params: any = {
      address: {
        id: '1'
      },
      user: {
        version: 1
      }
    };

    jest.spyOn(mockContext.client, 'mutate').mockImplementation(({ variables, mutation }) => {
      expect(variables).toMatchObject(deleteAddressVariables);
      expect(mutation).toEqual(deleteAddressQuery);
      return deleteAddressResponse(params.address);
    });

    await deleteAddress(mockContext, params);
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
      return deleteAddressResponse(params.address);
    });

    await deleteAddress(mockContext, params, () => customQueryResult);
  });
});
