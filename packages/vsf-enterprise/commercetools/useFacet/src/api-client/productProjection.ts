import { createRequestBuilder } from '@commercetools/api-request-builder';

const filterStrategyMap = {
  query: 'filterByQuery',
  filter: 'filter',
  facets: 'filterByFacets'
}

interface ProjectionParams {
  filter?: Record<string, any>;
  sort?: string;
  page?: number;
  perPage?: number;
  phrase?: string
}

const productProjection = async ({ config, client }, projectionParams: ProjectionParams) => {
  const { filter, sort, page, perPage, phrase } = projectionParams;
  const filteringStrategy = filterStrategyMap[config.filteringStrategy || 'filter'];

  const requestBuilder = createRequestBuilder({
    projectKey: config.api.projectKey
  });

  const facet = config.availableFacets.map(f => `${f.facet}${f.option && `:${f.option}`} as ${f.name}`)
  const sortOption = config.sortingOptions.find(s => s.id === sort);

  const uri = requestBuilder
    .productProjectionsSearch
    .parse({
      [filteringStrategy]: filter,
      sort: [{ by: sortOption.facet, direction: sortOption.direction }],
      text: phrase && { language: config.locale, value: phrase },
      markMatchingVariants: true,
      facet,
      page,
      perPage,
      priceCurrency: config.currency,
      priceCountry: config.country
    })
    .build()

  const response = await client.execute({
    uri,
    method: 'GET'
  })

  return response.body;
}

export default productProjection;
