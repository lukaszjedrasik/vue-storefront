import gql from "graphql-tag";
import updateAddress from '../../src/api-client/updateAddress';
import { updateAddressQuery } from '../../src/api-client/updateAddress/defaultQuery'

const mockContext = {
  client: {
    mutate: jest.fn(),
  }
};

const updateAddressVariables = (addressId?) => {
  const data: any = {
    actions: [
      { changeAddress: {} }
    ],
    version: 1
  };

  if (addressId !== undefined) {
    data.actions.unshift({ setDefaultBillingAddress: { addressId } });
  }

  return data;
};


const updateAddressResponse: any = (address, defaultId) => ({
  data: {
    user: {
      version: 2,
      addresses: [ address ],
      defaultBillingAddressId: defaultId
    }
  }
});

describe('[ct-billing] API - updateAddress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('updates address and returns array of addresses', async () => {
    const params: any = {
      address: {
        id: '1',
        isDefault: false
      },
      user: {
        version: 1,
        defaultBillingAddressId: '2'
      }
    };

    jest.spyOn(mockContext.client, 'mutate').mockImplementation(({ variables, mutation }) => {
      expect(variables).toMatchObject(updateAddressVariables());
      expect(mutation).toEqual(updateAddressQuery);
      return updateAddressResponse(params.address, '2');
    });

    const result = await updateAddress(mockContext, params);
    expect(result).toEqual({
      addresses: [params.address],
      defaultBillingAddressId: params.user.defaultBillingAddressId,
      version: 2
    });
  });

  it('doesnt change default if address still is a default', async () => {
    const params: any = {
      address: {
        id: '2',
        isDefault: true
      },
      user: {
        version: 1,
        defaultBillingAddressId: '2'
      }
    };

    jest.spyOn(mockContext.client, 'mutate').mockImplementation(({ variables, mutation }) => {
      expect(variables).toMatchObject(updateAddressVariables());
      expect(mutation).toEqual(updateAddressQuery);
      return updateAddressResponse(params.address, '2');
    });

    await updateAddress(mockContext, params);
  });

  it('doesnt change default if address still is not a default', async () => {
    const params: any = {
      address: {
        id: '1',
        isDefault: false,
      },
      user: {
        version: 1,
        defaultBillingAddressId: '2'
      }
    };

    jest.spyOn(mockContext.client, 'mutate').mockImplementation(({ variables, mutation }) => {
      expect(variables).toMatchObject(updateAddressVariables());
      expect(mutation).toEqual(updateAddressQuery);
      return updateAddressResponse(params.address, '2');
    });

    await updateAddress(mockContext, params);
  });

  it('sets address as default if required', async () => {
    const params: any = {
      address: {
        id: '1',
        isDefault: true
      },
      user: {
        version: 1,
        defaultBillingAddressId: '2'
      }
    };

    jest.spyOn(mockContext.client, 'mutate').mockImplementation(({ variables, mutation }) => {
      expect(variables).toMatchObject(updateAddressVariables('1'));
      expect(mutation).toEqual(updateAddressQuery);
      return updateAddressResponse(params.address, '1');
    });

    await updateAddress(mockContext, params);
  });

  it('unsets address as default if required', async () => {
    const params: any = {
      address: {
        id: '2',
        isDefault: false
      },
      user: {
        version: 1,
        defaultBillingAddressId: '2'
      }
    };

    jest.spyOn(mockContext.client, 'mutate').mockImplementation(({ variables, mutation }) => {
      expect(variables).toMatchObject(updateAddressVariables(null));
      expect(mutation).toEqual(updateAddressQuery);
      return updateAddressResponse(params.address, null);
    });

    await updateAddress(mockContext, params);
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
      return updateAddressResponse(params.address, '1');
    });

    await updateAddress(mockContext, params, () => customQueryResult);
  });
});
