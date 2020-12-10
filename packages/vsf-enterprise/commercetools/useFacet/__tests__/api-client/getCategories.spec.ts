import { createRequestBuilder } from '@commercetools/api-request-builder';
import getCategories from '../../src/api-client/getCategories';

const mockContext = {
  config: {
    api: {
      projectKey: '',
    },
    locale: 'en',
    subcategoriesLimit: 10
  },
  client: {
    execute: jest.fn().mockReturnValue({ body: {} })
  }
};

const builder = {
  where: jest.fn(() => builder),
  perPage: jest.fn(() => builder),
  build: jest.fn(() => builder),
  parse: jest.fn(() => builder)
}

jest.mock('@commercetools/api-request-builder', () => ({ createRequestBuilder: jest.fn() }))


describe('[commercetools][api-client] getCategories', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (createRequestBuilder as any).mockReturnValue({
      categories: builder
    })
  });

  it('fetches categories by given ids', async () => {
    getCategories(mockContext, { catIds: ['123', '456'] });

    expect(builder.where).toBeCalledWith('id in ("123","456")');
  });

  it('fetches categories by given ancestor', async () => {
    getCategories(mockContext, { ancestor: '123' });

    expect(builder.where).toBeCalledWith('ancestors(id = "123")');
  });

  it('fetches categories by given slugs', async () => {
    getCategories(mockContext, { slugs: ['123', '456'] });

    expect(builder.parse).toBeCalledWith({
      expand: ['ancestors[*]'],
      where: ['slug(en in ("123","456"))']
    });
  });
});
