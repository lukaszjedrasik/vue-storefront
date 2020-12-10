import {
  AgnosticCategoryTree,
  AgnosticBreadcrumb,
  AgnosticGroupedFacet,
  AgnosticSort,
  AgnosticPagination,
  AgnosticFacet,
  AgnosticFacetSearchParams,
  FacetSearchResult,
  FacetsGetters,
  useVSFContext
} from '@vue-storefront/core';
import { ProductVariant } from '@vue-storefront/commercetools-api';
import { mapChildren } from './_utils';

const getCategoryTree = (result: FacetSearchResult<any>): AgnosticCategoryTree => {
  if (!result.data) {
    return {} as any
  }
  const { $ctf: { config: { locale } }} = useVSFContext();
  const { _categories, _rootCat, _currentCat } = result.data;

  const categories = _categories
    .map(f => ({ ...f, name: f.name[locale], slug: f.slug[locale] }))

  const parents = categories
    .filter(f =>
      (_rootCat && f.ancestors.length === 1 && f.ancestors[0].id === _rootCat.id) ||
      !f.parent
    )

  return {
    label: _rootCat?.name[locale],
    slug: _rootCat?.slug[locale],
    isCurrent: _rootCat.id === _currentCat.id,
    items: mapChildren(
      parents,
      categories,
      result
    )
  }
}

const getProducts = (result: FacetSearchResult<AgnosticFacetSearchParams>): ProductVariant[] => {
  if (!result.data) {
    return []
  }

  const { $ctf: { config: { locale } }} = useVSFContext();

  return result.data.results.map((p) => ({
    ...p.masterVariant,
    _id: p.id,
    _name: p.name[locale],
    _slug: p.slug[locale]
  }))
};

const getBreadcrumbs = (result: FacetSearchResult<any>): AgnosticBreadcrumb[] => {
  if (!result.data) {
    return []
  }

  const { $ctf: { config: { locale } }} = useVSFContext();

  const rootCat = result.data._rootCat
  const currentCat = result.data._currentCat

  if (!currentCat && !rootCat) {
    return []
  }

  if (currentCat.id === rootCat.id) {
    return [
      { text: 'Home', link: '/' },
      { text: currentCat.name[locale], link: `/c/${currentCat.slug[locale]}` }
    ]
  }

  const rest =  currentCat.ancestors.reduce((p, c) => {
    const prev = p[p.length - 1]
    const prevSlug = prev?.slug || ''

    return [
      ...p,
      {
        text: c.obj.name[locale],
        link: `/c${prevSlug}/${c.obj.slug[locale]}`,
        slug: `${prevSlug}/${c.obj.slug[locale]}`
      }
    ]
  }, [])

  return [
    { text: 'Home', link: '/' },
    ...rest
  ]
}

const getGrouped = (result: FacetSearchResult<any>): AgnosticGroupedFacet[] => {
  if (!result.data) {
    return {} as any
  }

  const { facets } = result.data;
  const { filters } = result.input;

  return Object.entries(facets)
    .filter(([label]) => label !== 'category')
    .map(([label, value]: any[]) => ({
      id: label,
      label,
      count: value.total,
      options: value.terms.map(({ term, count }) => ({
        type: 'attribute',
        id: term,
        value: term,
        attrName: label,
        selected: filters[label]?.includes(term),
        count,
      }))
    }))
}

const getAll = (result: FacetSearchResult<any>): AgnosticFacet[] => {
  if (!result.data) {
    return []
  }

  const { facets } = result.data;
  const { filters } = result.input;

  return Object.entries(facets)
    .filter(([label]) => label !== 'category')
    .map(([label, value]: any[]) =>
      value.terms.map(({ term, count }) => ({
        type: 'attribute',
        id: term,
        value: term,
        attrName: label,
        selected: filters[label]?.includes(term),
        count,
      }))
    )
}

const getSortOptions = (result: FacetSearchResult<any>): AgnosticSort => {
  const { $ctf: { config: { sortingOptions } }} = useVSFContext();

  const defaultSort = sortingOptions[0].id;

  const options = sortingOptions.map(({ id, name }) => ({
    type: 'sort', id, value: name
  }))

  const selected = options.find(o => o.id === result.input.sort)?.id || defaultSort;

  return { options, selected };
}

const getPagination = (result: FacetSearchResult<any>): AgnosticPagination => {
  const { $ctf: { config: { pageOptions } }} = useVSFContext();

  if (!result.data) {
    return {} as any
  }

  const itemsPerPage = result.input.itemsPerPage || pageOptions[0];

  return {
    currentPage: result.input.page || 1,
    totalPages: Math.ceil(result.data.total / itemsPerPage),
    totalItems: result.data.total,
    pageOptions,
    itemsPerPage,
  };
}


const facetGetters: FacetsGetters<any, any> = {
  getCategoryTree,
  getProducts,
  getBreadcrumbs,
  getAll,
  getGrouped,
  getSortOptions,
  getPagination
}

export default facetGetters;
