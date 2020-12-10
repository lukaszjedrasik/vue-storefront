import { useWishlist } from '../../src/composables';

/************************************************ Mock data ************************************************/
const emptyCustomQuery = undefined;
const currenWishlistMock: any = {
  id: 1,
  version: 2,
  lineItems: [ 1, 2, 3, 4, 5 ]
}

const mockContext = {
  $ct: {
    api: {
      isGuest: jest.fn(),
      getMyShoppingList: jest.fn().mockReturnValue({ data: { me: { shoppingLists: null } } }),
      addToMyShoppingList: jest.fn().mockReturnValue({ data: { wishlist: 'some wishlist' } }),
      removeFromMyShoppingList: jest.fn().mockReturnValue({ data: { wishlist: 'some wishlist' } }),
      createMyShoppingList: jest.fn().mockReturnValue({ data: { wishlist: 'some wishlist' } })
    },
    config: {
      locale: 'en'
    }
  }
};

/************************************************ Mock modules ************************************************/
jest.mock('@vue-storefront/core', () => ({
  useWishlistFactory: (factoryParams: any): any => {
    const methods = Object.keys(factoryParams).reduce((carry, name) => ({
      ...carry,
      [name]: (params) => factoryParams[name](mockContext, params)
    }), {});
  
    return { useWishlist: () => methods };
  }
}));

/************************************************ Run tests ************************************************/
describe('useWishlist', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads current wishlist when there is user session', async () => {
    mockContext.$ct.api.isGuest.mockReturnValue(false);

    const { loadWishlist } = useWishlist();
    await loadWishlist();

    expect(mockContext.$ct.api.getMyShoppingList).toBeCalled();
  });

  it('does not loads cart without user session', async () => {
    mockContext.$ct.api.isGuest.mockReturnValue(true);

    const { loadWishlist } = useWishlist();
    await loadWishlist();

    expect(mockContext.$ct.api.getMyShoppingList).not.toBeCalled();
  });

  it('adds to wishlist', async () => {
    const { addToWishlist } = useWishlist() as any;

    const response = await addToWishlist({
      currentWishlist: currenWishlistMock,
      product: 'product1'
    });

    expect(response).toEqual('some wishlist');
    expect(mockContext.$ct.api.addToMyShoppingList).toBeCalledWith({
      id: currenWishlistMock.id,
      version: currenWishlistMock.version,
      product: 'product1'
    }, emptyCustomQuery);
  });

  it('loads currentWishlist if not provided', async () => {
    const { addToWishlist } = useWishlist() as any;
    await addToWishlist({
      currentWishlist: null,
      product: 'product1'
    });

    expect(mockContext.$ct.api.getMyShoppingList).toBeCalled()
  });

  it('removes from wishlist', async () => {
    const { removeFromWishlist } = useWishlist() as any;
    const response = await removeFromWishlist({
      currentWishlist: currenWishlistMock,
      product: 'product1'
    });

    expect(response).toEqual('some wishlist');
    expect(mockContext.$ct.api.removeFromMyShoppingList).toBeCalledWith({
      id: currenWishlistMock.id,
      version: currenWishlistMock.version,
      products: ['product1']
    }, emptyCustomQuery);
  });

  it('clears wishlist', async () => {
    const { clearWishlist } = useWishlist() as any;
    const response = await clearWishlist({
      currentWishlist: currenWishlistMock
    });

    expect(response).toEqual('some wishlist');
    expect(mockContext.$ct.api.removeFromMyShoppingList).toBeCalledWith({
      id: currenWishlistMock.id,
      version: currenWishlistMock.version,
      products: currenWishlistMock.lineItems
    });
  });

  it('is on wishlist', async () => {
    const { isOnWishlist } = useWishlist() as any;
    const localCurrenWishlistMock = {
      id: 1,
      version: 2,
      lineItems: [
        {
          variant: {
            sku: 'a1'
          }
        },
        {
          variant: {
            sku: 'b4'
          }
        }
      ]
    }
    const response = isOnWishlist({
      currentWishlist: localCurrenWishlistMock,
      product: {
        sku: 'b4'
      }
    });

    expect(response).toBeTruthy();
  });
})