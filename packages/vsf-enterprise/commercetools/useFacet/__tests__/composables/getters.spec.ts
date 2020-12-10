import facetGetters from '../../src/composables/getters';

jest.mock('@vue-storefront/core', () => ({
  useFacetFactory: jest.fn((f) => f),
  useVSFContext: jest.fn(() => ({
    $ctf: {
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
        ],
      }
    }
  }))
}));

describe('[commercetools][composables] getters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('builds category tree', async () => {
    expect(facetGetters.getCategoryTree({ data: null } as any)).toEqual({});

    expect(
      facetGetters.getCategoryTree({
        data: {
          _rootCat: { id: 7, name: { en: 'cat1' }, slug: { en: 'cat-1' } },
          _currentCat: { id: 6 },
          _categories: [
            { id: 1, name: { en: 'cat1' }, slug: { en: 'cat-1' }, ancestors: [{ id: 7 }] },
            {
              id: 2,
              name: { en: 'cat2' },
              slug: { en: 'cat-2' },
              ancestors: [],
              parent: { id: 1 },
            },
            {
              id: 3,
              name: { en: 'cat3' },
              slug: { en: 'cat-3' },
              ancestors: [],
              parent: { id: 2 },
            },
            {
              id: 4,
              name: { en: 'cat4' },
              slug: { en: 'cat-4' },
              ancestors: [],
              parent: { id: 2 },
            },
          ],
        },
      } as any),
    ).toEqual({
      isCurrent: false,
      items: [
        {
          count: undefined,
          isCurrent: false,
          items: [
            {
              count: undefined,
              isCurrent: false,
              items: [
                {
                  count: undefined,
                  isCurrent: false,
                  items: [],
                  label: 'cat3',
                  slug: 'cat-3',
                },
                {
                  count: undefined,
                  isCurrent: false,
                  items: [],
                  label: 'cat4',
                  slug: 'cat-4',
                },
              ],
              label: 'cat2',
              slug: 'cat-2',
            },
          ],
          label: 'cat1',
          slug: 'cat-1',
        },
      ],
      label: 'cat1',
      slug: 'cat-1',
    });
  });

  it('gets products', () => {
    expect(facetGetters.getProducts({ data: null } as any)).toEqual([]);

    expect(
      facetGetters.getProducts({
        data: {
          results: [
            { id: 1, name: { en: 'p1' }, slug: { en: 'p-1' } },
            { id: 1, name: { en: 'p1' }, slug: { en: 'p-1' } },
          ],
        },
      } as any),
    ).toEqual([
      { _id: 1, _name: 'p1', _slug: 'p-1' },
      { _id: 1, _name: 'p1', _slug: 'p-1' },
    ]);
  });

  it('builds breadcrumbs', () => {
    expect(facetGetters.getBreadcrumbs({ data: null } as any)).toEqual([]);
    expect(
      facetGetters.getBreadcrumbs({
        data: { _rootCat: null, _currentCat: null },
      } as any),
    ).toEqual([]);

    expect(
      facetGetters.getBreadcrumbs({
        data: {
          _rootCat: { id: 1 },
          _currentCat: { id: 1, name: { en: 'name' }, slug: { en: 'slg' } },
        },
      } as any),
    ).toEqual([
      {
        link: '/',
        text: 'Home',
      },
      {
        link: '/c/slg',
        text: 'name',
      },
    ]);

    expect(
      facetGetters.getBreadcrumbs({
        data: {
          _rootCat: { id: 2 },
          _currentCat: {
            id: 1,
            name: { en: 'name' },
            slug: { en: 'slg' },
            ancestors: [
              { obj: { name: { en: 's1' }, slug: { en: 's-1' } } },
              { obj: { name: { en: 's2' }, slug: { en: 's-2' } } },
            ],
          },
        },
      } as any),
    ).toEqual([
      {
        link: '/',
        text: 'Home',
      },
      {
        link: '/c/s-1',
        slug: '/s-1',
        text: 's1',
      },
      {
        link: '/c/s-1/s-2',
        slug: '/s-1/s-2',
        text: 's2',
      },
    ]);
  });

  it('gets grouped facets', () => {
    expect(facetGetters.getGrouped({ data: null } as any)).toEqual({});

    expect(
      facetGetters.getGrouped({
        data: {
          facets: {
            category: {},
            color: {
              total: 12,
              terms: [
                { term: 'blue', count: 44 },
                { term: 'red', count: 112 },
                { term: 'green', count: 11 },
              ],
            },
            size: {
              total: 43,
              terms: [
                { term: 'm', count: 44 },
                { term: 'l', count: 22 },
                { term: 'xl', count: 11 },
              ],
            },
          },
        },
        input: {
          filters: {
            color: ['blue'],
          },
        },
      } as any),
    ).toEqual([
      {
        count: 12,
        id: 'color',
        label: 'color',
        options: [
          {
            attrName: 'color',
            count: 44,
            id: 'blue',
            selected: true,
            type: 'attribute',
            value: 'blue',
          },
          {
            attrName: 'color',
            count: 112,
            id: 'red',
            selected: false,
            type: 'attribute',
            value: 'red',
          },
          {
            attrName: 'color',
            count: 11,
            id: 'green',
            selected: false,
            type: 'attribute',
            value: 'green',
          },
        ],
      },
      {
        count: 43,
        id: 'size',
        label: 'size',
        options: [
          {
            attrName: 'size',
            count: 44,
            id: 'm',
            selected: undefined,
            type: 'attribute',
            value: 'm',
          },
          {
            attrName: 'size',
            count: 22,
            id: 'l',
            selected: undefined,
            type: 'attribute',
            value: 'l',
          },
          {
            attrName: 'size',
            count: 11,
            id: 'xl',
            selected: undefined,
            type: 'attribute',
            value: 'xl',
          },
        ],
      },
    ]);
  });

  it('gets sorting options', () => {
    expect(
      facetGetters.getSortOptions({
        input: {
          sort: 'price-up',
        },
      } as any),
    ).toEqual({
      options: [
        { id: 'latest', type: 'sort', value: 'Latest' },
        { id: 'price-up', type: 'sort', value: 'Price from low to high' },
        { id: 'price-down', type: 'sort', value: 'Price from high to low' },
      ],
      selected: 'price-up',
    });
  });

  it('gets all facets', () => {
    expect(facetGetters.getAll({ data: null } as any)).toEqual([])

    expect(
      facetGetters.getAll({
        data: {
          facets: {
            category: {},
            color: {
              total: 12,
              terms: [
                { term: 'blue', count: 44 },
                { term: 'red', count: 112 },
                { term: 'green', count: 11 },
              ],
            },
            size: {
              total: 43,
              terms: [
                { term: 'm', count: 44 },
                { term: 'l', count: 22 },
                { term: 'xl', count: 11 },
              ],
            },
          },
        },
        input: {
          filters: {
            color: ['blue'],
          },
        },
      } as any),
    ).toEqual([
      [
        {
          attrName: 'color',
          count: 44,
          id: 'blue',
          selected: true,
          type: 'attribute',
          value: 'blue',
        },
        {
          attrName: 'color',
          count: 112,
          id: 'red',
          selected: false,
          type: 'attribute',
          value: 'red',
        },
        {
          attrName: 'color',
          count: 11,
          id: 'green',
          selected: false,
          type: 'attribute',
          value: 'green',
        },
      ],
      [
        {
          attrName: 'size',
          count: 44,
          id: 'm',
          selected: undefined,
          type: 'attribute',
          value: 'm',
        },
        {
          attrName: 'size',
          count: 22,
          id: 'l',
          selected: undefined,
          type: 'attribute',
          value: 'l',
        },
        {
          attrName: 'size',
          count: 11,
          id: 'xl',
          selected: undefined,
          type: 'attribute',
          value: 'xl',
        },
      ],
    ]);
  });

  it('gets pagination', () => {
    expect(facetGetters.getPagination({ data: null } as any)).toEqual({});

    expect(
      facetGetters.getPagination({
        data: { total: 30 },
        input: {
          itemsPerPage: 5,
          page: 1,
        },
      } as any),
    ).toEqual({
      currentPage: 1,
      itemsPerPage: 5,
      pageOptions: [10, 20, 30],
      totalItems: 30,
      totalPages: 6,
    });
  });
});
