import loadCurrentShoppingList from '../../src/composables/currentWishlist';

/************************************************ Mock data ************************************************/
const results = [1, 2, 3];

const mockContext = {
  $ct: {
    api: {
      getMyShoppingList: jest.fn().mockReturnValue({ data: { me: { shoppingLists: null } } }),
      createMyShoppingList: jest.fn().mockReturnValue({ data: { wishlist: results } })
    },
    config: {
      locale: 'en'
    }
  }
};

/************************************************ Tests ************************************************/
describe('[commercetools-composables] useWishlist/currentWishlist', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads current cart', async () => {
    mockContext.$ct.api.getMyShoppingList.mockReturnValue({ data: { me: { shoppingLists: { results } } } });
    const response = await loadCurrentShoppingList(mockContext);

    expect(response).toEqual(results[0]);
    expect(mockContext.$ct.api.getMyShoppingList).toBeCalled();
    expect(mockContext.$ct.api.createMyShoppingList).not.toBeCalled();
  });

  it('creates wishlist when could not be loaded', async () => {
    mockContext.$ct.api.getMyShoppingList.mockReturnValue({ data: { me: { shoppingLists: null } } });
    const response = await loadCurrentShoppingList(mockContext);

    expect(response).toEqual(results);
    expect(mockContext.$ct.api.createMyShoppingList).toBeCalled();
  });

  it('calls createMyShoppingList with proper args when wishlist could not be loaded', async () => {
    mockContext.$ct.api.getMyShoppingList.mockReturnValue({ data: { me: { shoppingLists: null } } });
    const response = await loadCurrentShoppingList(mockContext);
    const customQuery = null;

    expect(response).toEqual(results);
    expect(mockContext.$ct.api.createMyShoppingList).toHaveBeenCalledWith({
      name: [
        {
          value: 'wishlist',
          locale: mockContext.$ct.config.locale
        }
      ]
    }, customQuery);
  });

  it('calls createMyShoppingList with wishlist from custom query', async () => {
    const customQueryResponse = {
      user: '',
      wishlist: 'abc'
    }

    const response = await loadCurrentShoppingList(mockContext, () => customQueryResponse);

    expect(response).toEqual(results);
    expect(mockContext.$ct.api.createMyShoppingList).toHaveBeenCalledWith({
      name: [
        {
          value: 'wishlist',
          locale: mockContext.$ct.config.locale
        }
      ]
    }, customQueryResponse.wishlist);
  });

});
