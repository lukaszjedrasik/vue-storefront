// List of available data types: https://docs.commercetools.com/api/projects/types
const quotedDataTypes = [
  'string',
  'boolean'
];

const filterByCategory = async (context, { categorySlug, rootCatSlug }) => {
  if (!categorySlug && !rootCatSlug) {
    return []
  }

  const { results } = await context.$ctf.api.getCategories({ slugs: [categorySlug, rootCatSlug] });

  if (!results && results.length === 0) {
    return []
  }

  if (results.length === 1) {
    return [
      `categories.id: "${results[0].id}"`,
      'category',
      { root: results[0], current: results[0] }
    ]
  }

  const [root, current] = results

  return [`categories.id: "${current.id}"`, 'category', { root, current }]
}

const filterByAttribute = (context, name: string, values: string[]) => {
  const { availableFacets } = context.$ctf.config;
  const { facet, type } = availableFacets.find(f => f.name === name);

  if (!facet || values.length === 0) {
    return []
  }

  const value = quotedDataTypes.includes(type.toLowerCase())
    ? `"${values.join('","')}"`
    : values.join(',');

  return [`${facet}:${value}`, name, values];
}

const filterMap = {
  category: filterByCategory
}

const getFilters = async (context, filters: Record<string, any>) => {
  const filterPromises = Object.entries(filters)
    .map(([name, value]) => {
      if (filterMap[name]) {
        return filterMap[name](context, value)
      }

      return filterByAttribute(context, name, value)
    })

  return (await Promise.all(filterPromises))
    .filter(r => r.length > 0)
    .reduce((p, [facet, name, rawValue]) => ({
      ...p,
      queryFilters: [
        ...p.queryFilters,
        facet
      ],
      rawFilters: {
        ...p.rawFilters,
        [name]: rawValue
      }
    }), { rawFilters: {}, queryFilters: [] })
}

export { getFilters }
