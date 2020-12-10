import gql from 'graphql-tag';
import addAddress from '../../src/api-client/addAddress';
import { addAddressQuery } from '../../src/api-client/addAddress/defaultQuery';

const mockContext = {
  client: {
    mutate: jest.fn(),
  }
};

const addAddressVariables = {
  actions: [
    { addAddress: {} }
  ],
  version: 1
};

const addAddressResponse: any = (address) => ({
  data: {
    user: {
      version: 2,
      addresses: [ address ]
    }
  }
});

const markAsBillingVariables = (addressId, isDefault = false) => {
  const data: any = {
    actions: [
      { addBillingAddressId: { addressId } },
    ],
    version: 2
  };

  if (isDefault) {
    data.actions.push({ setDefaultBillingAddress: { addressId } });
  }

  return data;
};

describe('[ct-billing] API - addAddress', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('adds new billing address and returns array of addresses', async () => {
    const params: any = {
      address: {
        id: '1'
      },
      user: {
        version: 1
      }
    };

    const addAddressRequest = ({ variables, mutation }) => {
      expect(variables).toMatchObject(addAddressVariables);
      expect(mutation).toEqual(addAddressQuery);
      return addAddressResponse(params.address);
    };

    const markAsBillingRequest = ({ variables, mutation }) => {
      expect(variables).toMatchObject(markAsBillingVariables(params.address.id));
      expect(mutation).toEqual(addAddressQuery);
      return addAddressResponse(params.address);
    };

    jest
      .spyOn(mockContext.client, 'mutate')
      .mockImplementationOnce(addAddressRequest)
      .mockImplementationOnce(markAsBillingRequest);

    await addAddress(mockContext, params);
  });

  it('doesnt mark address as default when "isDefault" is falsy', async () => {
    const params: any = {
      address: {
        id: '1',
        isDefault: false,
      },
      user: {
        version: 1
      }
    };

    jest
      .spyOn(mockContext.client, 'mutate')
      .mockImplementationOnce(() => addAddressResponse(params.address))
      .mockImplementationOnce(({ variables }) => {
        expect(variables).toMatchObject(markAsBillingVariables('1'));
        return addAddressResponse(params.address);
      });

    await addAddress(mockContext, params);
  });

  it('marks address as default when "isDefault" is truthy', async () => {
    const params: any = {
      address: {
        id: '1',
        isDefault: true,
      },
      user: {
        version: 1
      }
    };

    jest
      .spyOn(mockContext.client, 'mutate')
      .mockImplementationOnce(() => addAddressResponse(params.address))
      .mockImplementationOnce(({ variables }) => {
        expect(variables).toMatchObject(markAsBillingVariables('1', true));
        return addAddressResponse(params.address);
      });

    await addAddress(mockContext, params);
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

    jest
      .spyOn(mockContext.client, 'mutate')
      .mockImplementationOnce(({ variables, mutation }) => {
        expect(variables).toEqual(customQueryResult.variables);
        expect(mutation).toEqual(customQueryResult.query);
        return addAddressResponse(params.address);
      })
      .mockImplementationOnce(() => addAddressResponse(params.address));

    await addAddress(mockContext, params, () => customQueryResult);
  });
});
