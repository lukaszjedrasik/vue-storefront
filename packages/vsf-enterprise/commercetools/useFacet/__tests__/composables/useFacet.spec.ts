import useFacet from '../../src/composables/useFacet';
import { getFilters } from './../../src/utils';

/************************************************ Mock data ************************************************/
const mockContext = {
  $ctf: {
    api: {
      productProjection: jest.fn().mockImplementation(() => ({
        facets: {
          category: {
            terms: [
              { term: '123', count: 1 },
              { term: '456', count: 2 },
              { term: '789', count: 3 },
            ],
          },
        },
      }))
    },
    config: {
      locale: 'en',
      currency: 'USD',
      country: 'US',
      pageOptions: [10, 20, 30],
      availableFacets: [
        { facet: 'categories.id', option: 'subtree("*")', name: 'category' },
        { facet: 'variants.attributes.size', option: '', name: 'size' },
        { facet: 'variants.attributes.color.key', option: '', name: 'color' },
      ],
      sortingOptions: [
        { id: 'latest', name: 'Latest', facet: 'createdAt', direction: 'desc' },
        { id: 'price-up', name: 'Price from low to high', facet: 'price', direction: 'asc' },
        { id: 'price-down', name: 'Price from high to low', facet: 'price', direction: 'desc' },
      ]
    }
  }
};

/************************************************ Mock modules ************************************************/
jest.mock('@vue-storefront/core', () => ({
  useFacetFactory: (factoryParams: any): any => {
    const methods = Object.keys(factoryParams).reduce((carry, name) => ({
      ...carry,
      [name]: (params) => factoryParams[name](mockContext, params)
    }), {});

    return () => methods;
  }
}));

jest.mock('./../../src/utils', () => ({
  getFilters: jest.fn(() => ({
    queryFilters: [],
    rawFilters: {
      category: {
        root: { id: 'root-id' },
        current: { id: 'current-id' },
      },
    },
  })),
  loadCategories: jest.fn(() => ({
    results: [
      { id: '123', name: 'cat1' },
      { id: '456', name: 'cat2' },
      { id: '111', name: 'cat3' },
    ],
  })),
}));


/************************************************ Run tests ************************************************/
describe('[commercetools][composables] useFacet', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('searches product with faceting', async () => {
    const { search } = useFacet() as any;
    const result = await search({
      input: {
        page: 1,
        itemsPerPage: 20,
        categorySlug: '123',
        rootCatSlug: '456',
        filters: {},
        sort: 'latest',
        phrase: 'test phrase'
      },
    });

    expect(getFilters).toBeCalledWith(mockContext, {
      category: { categorySlug: '123', rootCatSlug: '456' },
    });

    expect(mockContext.$ctf.api.productProjection).toBeCalledWith({
      filter: [],
      page: 1,
      perPage: 20,
      phrase: 'test phrase',
      sort: 'latest',
    });

    expect(result).toEqual({
      _categories: [
        {
          count: 1,
          id: '123',
          name: 'cat1',
        },
        {
          count: 2,
          id: '456',
          name: 'cat2',
        },
        {
          count: 0,
          id: '111',
          name: 'cat3',
        },
      ],
      _currentCat: {
        id: 'current-id',
      },
      _rootCat: {
        id: 'root-id',
      },
      facets: {
        category: {
          terms: [
            {
              count: 1,
              term: '123',
            },
            {
              count: 2,
              term: '456',
            },
            {
              count: 3,
              term: '789',
            },
          ],
        },
      },
    });
  });
});
