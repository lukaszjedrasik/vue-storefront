
export const loadCategories = async (context, { productsResult, rawFilters }) => {
  if (rawFilters.category) {
    return context.$ctf.api.getCategories({ ancestor: rawFilters.category.root.id })
  }

  if (productsResult.facets.category.terms.length === 0) {
    return { results: [] };
  }

  const catIds = productsResult.facets.category.terms.map(t => t.term)

  return context.$ctf.api.getCategories({ catIds })
}

export * from './filters'
