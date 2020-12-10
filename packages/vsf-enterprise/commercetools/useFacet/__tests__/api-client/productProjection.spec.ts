import productProjection from '../../src/api-client/productProjection';

/************************************************ Mock data ************************************************/
const mockContext = {
  config: {
    api: {
      projectKey: '',
    },
    locale: 'en',
    currency: 'USD',
    country: 'US',
    availableFacets: [
      { facet: 'categories.id', type: 'string', option: 'subtree("*")', name: 'category' },
      { facet: 'variants.attributes.size', type: 'number', option: '', name: 'size' },
      { facet: 'variants.attributes.color.key', type: 'string', option: '', name: 'color' }
    ],
    sortingOptions: [
      { id: 'latest', name: 'Latest', facet: 'createdAt', direction: 'desc' },
      { id: 'price-up', name: 'Price from low to high', facet: 'price', direction: 'asc' },
      { id: 'price-down', name: 'Price from high to low', facet: 'price', direction: 'desc' },
    ],
  },
  client: {
    execute: jest.fn().mockReturnValue({ body: {} })
  }
};

const mockBuilder = {
  where: jest.fn(() => mockBuilder),
  perPage: jest.fn(() => mockBuilder),
  build: jest.fn(() => mockBuilder),
  parse: jest.fn(() => mockBuilder),
};

/************************************************ Mock modules ************************************************/
jest.mock('@commercetools/api-request-builder', () => ({
  createRequestBuilder: jest.fn().mockImplementation(() => ({
    productProjectionsSearch: mockBuilder,
  }))
}));

/************************************************ Run tests ************************************************/
describe('[commercetools][api-client] productProjection', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches products by given filters', async () => {
    const params = {
      filter: { color: ['blue'] },
      sort: 'latest',
      page: 1,
      perPage: 50,
      phrase: 'text search'
    };

    productProjection(mockContext, params);

    // expect(mockCreateRequestBuilder).toBeCalledWith({
    //   projectKey: mockContext.config.api.projectKey
    // });

    expect(mockBuilder.parse).toBeCalledWith({
      filter: params.filter,
      sort: [
        { by: 'createdAt', direction: 'desc' }
      ],
      text: { language: mockContext.config.locale, value: params.phrase },
      markMatchingVariants: true,
      facet: [
        'categories.id:subtree("*") as category',
        'variants.attributes.size as size',
        'variants.attributes.color.key as color',
      ],
      page: params.page,
      perPage: params.perPage,
      priceCountry: mockContext.config.country,
      priceCurrency: mockContext.config.currency,
    });
  });
});
