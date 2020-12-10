import { useUserBilling } from '../src/composables/useUserBilling';

/************************************************ Mock data ************************************************/
let mockUser = { version: 1, defaultBillingAddressId: '2', billingAddresses: [] };
const param: any = { user: mockUser };

const mockContext = {
  $ct: {
    api: {
      addBillingAddress: jest.fn().mockReturnValue(mockUser),
      deleteBillingAddress: jest.fn().mockReturnValue(mockUser),
      setDefaultBillingAddress: jest.fn().mockReturnValue(mockUser),
      updateBillingAddress: jest.fn().mockReturnValue(mockUser)
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
  useUserBillingFactory: (factoryParams: any): any => {
    const methods = Object.keys(factoryParams).reduce((carry, name) => ({
      ...carry,
      [name]: (params) => factoryParams[name](mockContext, params)
    }), {});
  
    return { useUserBilling: () => methods };
  }
}));

/************************************************ Run tests ************************************************/
describe('[ct-billing] useUserBilling', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('allows to call "load"', async () => {
    const { load } = useUserBilling();
    const result = await load();

    expect(result).toBe(mockUser);
  });

  it('allows to call "setDefault"', async () => {
    const { setDefault } = useUserBilling();
    const result = await setDefault(param);

    expect(mockContext.$ct.api.setDefaultBillingAddress).toBeCalledWith(param);
    expect(result).toBe(mockUser);
  });

  it('allows to call "addAddress"', async () => {
    const { addAddress } = useUserBilling();
    const result = await addAddress(param);

    expect(mockContext.$ct.api.addBillingAddress).toBeCalledWith(param);
    expect(result).toBe(mockUser);
  });

  it('allows to call "updateAddress"', async () => {
    const { updateAddress } = useUserBilling();
    const result = await updateAddress(param);

    expect(mockContext.$ct.api.updateBillingAddress).toBeCalledWith(param);
    expect(result).toBe(mockUser);
  });

  it('allows to call "deleteAddress"', async () => {
    const { deleteAddress } = useUserBilling();
    const result = await deleteAddress(param);

    expect(mockContext.$ct.api.deleteBillingAddress).toBeCalledWith(param);
    expect(result).toBe(mockUser);
  });
});
