import { useUserShipping } from '../src/composables/useUserShipping';

/************************************************ Mock data ************************************************/
let mockUser = { version: 1, defaultShippingAddressId: '2', shippingAddresses: [] };
const param: any = { user: mockUser };

const mockContext = {
  $ct: {
    api: {
      addShippingAddress: jest.fn().mockReturnValue(mockUser),
      deleteShippingAddress: jest.fn().mockReturnValue(mockUser),
      setDefaultShippingAddress: jest.fn().mockReturnValue(mockUser),
      updateShippingAddress: jest.fn().mockReturnValue(mockUser)
    }
  },
  user: { value: mockUser },
  loadUser: jest.fn(),
  setUser: params => mockUser = params,
}

/************************************************ Mock modules ************************************************/
jest.mock('@vue-storefront/commercetools', () => ({
  useUser: jest.fn().mockImplementation(() => ({
    user: { value: mockUser },
    loadUser: jest.fn(),
    setUser: jest.fn(),
  }))
}));

jest.mock('@vue-storefront/core', () => ({
  useUserShippingFactory: (factoryParams: any): any => {
    const methods = Object.keys(factoryParams).reduce((carry, name) => ({
      ...carry,
      [name]: (params) => factoryParams[name](mockContext, params)
    }), {});
  
    return { useUserShipping: () => methods };
  }
}));

/************************************************ Run tests ************************************************/
describe('[ct-shipping] useUserShipping', () => {
  beforeEach(() => jest.clearAllMocks());

  it('allows to call "load"', async () => {
    const { load } = useUserShipping();
    const result = await load();

    expect(result).toBe(mockUser);
  });

  it('allows to call "setDefault"', async () => {
    const { setDefault } = useUserShipping();
    const result = await setDefault(param);

    expect(mockContext.$ct.api.setDefaultShippingAddress).toBeCalledWith(param);
    expect(result).toBe(mockUser);
  });

  it('allows to call "addAddress"', async () => {
    const { addAddress } = useUserShipping();
    const result = await addAddress(param);

    expect(mockContext.$ct.api.addShippingAddress).toBeCalledWith(param);
    expect(result).toBe(mockUser);
  });

  it('allows to call "updateAddress"', async () => {
    const { updateAddress } = useUserShipping();
    const result = await updateAddress(param);

    expect(mockContext.$ct.api.updateShippingAddress).toBeCalledWith(param);
    expect(result).toBe(mockUser);
  });

  it('allows to call "deleteAddress"', async () => {
    const { deleteAddress } = useUserShipping();
    const result = await deleteAddress(param);

    expect(mockContext.$ct.api.deleteShippingAddress).toBeCalledWith(param);
    expect(result).toBe(mockUser);
  });
});
