import { apiClientFactory } from '@vue-storefront/core';
import { createClient } from '@commercetools/sdk-client'
import { createAuthMiddlewareForClientCredentialsFlow } from '@commercetools/sdk-middleware-auth'
import { createHttpMiddleware } from '@commercetools/sdk-middleware-http'
import getCategories from './getCategories';
import productProjection from './productProjection';

const defaultSettings = {
  pageOptions: [20, 50, 100],
  subcategoriesLimit: 100,
  availableFacets: [
    { facet: 'categories.id', type: 'string', option: 'subtree("*")', name: 'category' },
    { facet: 'variants.attributes.size', type: 'number', option: '', name: 'size' },
    { facet: 'variants.attributes.color.key', type: 'string', option: '', name: 'color' }
  ],
  sortingOptions: [
    { id: 'latest', name: 'Latest', facet: 'createdAt', direction: 'desc' },
    { id: 'price-up', name: 'Price from low to high', facet: 'price', direction: 'asc' },
    { id: 'price-down', name: 'Price from high to low', facet: 'price', direction: 'desc' },
    { id: 'relevance', name: 'Relevance', facet: 'score', direction: 'desc' },
  ],
  filteringStrategy: 'filter'
}

const onSetup = (givenConfig) => {
  const config = {
    ...defaultSettings,
    ...givenConfig
  }
  const { projectKey, clientId, clientSecret, scopes, authHost  } = config.api;

  const authMiddleware = createAuthMiddlewareForClientCredentialsFlow({
    host: authHost,
    projectKey,
    credentials: {
      clientId,
      clientSecret
    },
    scopes
  })

  const httpMiddleware = createHttpMiddleware({ host: config.host })

  const client = createClient({
    middlewares: [authMiddleware, httpMiddleware],
  })

  return { config, client }
}

const { createApiClient } = apiClientFactory({
  tag: 'ctf',
  onSetup,
  api: {
    getCategories,
    productProjection
  }
})

export { createApiClient }
