import {
  useFacetFactory,
  FacetSearchResult,
  AgnosticFacetSearchParams
} from '@vue-storefront/core'
import { getFilters, loadCategories } from './../utils'

const factoryParams = {
  search: async (context, params: FacetSearchResult<AgnosticFacetSearchParams>) => {
    const { pageOptions } = context.$ctf.config;

    const { page, itemsPerPage, categorySlug, rootCatSlug, filters, sort } = params.input;
    const { queryFilters, rawFilters } = await getFilters(context, {
      category: { categorySlug, rootCatSlug },
      ...filters
    });

    const productsResult = await context.$ctf.api.productProjection({
      page: page || 1,
      perPage: itemsPerPage || pageOptions[0],
      filter: queryFilters,
      phrase: params.input.phrase,
      sort
    });

    const categoriesResult = await loadCategories(context, { productsResult, rawFilters })

    productsResult._rootCat = rawFilters.category?.root
    productsResult._currentCat = rawFilters.category?.current
    productsResult._categories = categoriesResult.results.map((c) => {
      const { terms } = productsResult.facets.category
      const count = terms.find(t => t.term === c.id)?.count || 0;

      return { ...c, count };
    })

    return productsResult
  }
};

export default useFacetFactory(factoryParams)
