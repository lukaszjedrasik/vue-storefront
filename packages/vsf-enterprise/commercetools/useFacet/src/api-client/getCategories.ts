import { createRequestBuilder } from '@commercetools/api-request-builder'

interface CategoryParams {
  catIds?: string[];
  slugs?: string[];
  ancestor?: string;
}

const buildUri = (context, params: CategoryParams): string => {
  const { api, locale, subcategoriesLimit } = context.config

  const requestBuilder = createRequestBuilder({
    projectKey: api.projectKey
  });
  const uri = requestBuilder.categories;

  if (params.catIds) {
    return uri.where(`id in ("${params.catIds.join('","')}")`)
      .perPage(params.catIds.length)
      .build()
  }

  if (params.ancestor) {
    return uri.where(`ancestors(id = "${params.ancestor}")`)
      .perPage(subcategoriesLimit)
      .build()
  }

  return uri
    .parse({
      where: [`slug(${locale} in ("${params.slugs.join('","')}"))`],
      expand: ['ancestors[*]']
    })
    .build()
}

const getCategories = async (context, params: CategoryParams) => {
  const uri = buildUri(context, params);

  const response = await context.client.execute({
    uri,
    method: 'GET'
  })

  return response.body;
}

export default getCategories;
