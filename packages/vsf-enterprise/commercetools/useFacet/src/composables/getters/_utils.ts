export const mapChildren = (parents, categories, result) => parents.map((p) => ({
  label: p.name,
  slug: p.slug,
  isCurrent: p.id === result.data._currentCat.id,
  count: p.count,
  items: mapChildren(
    categories.filter((c) => c.parent && c.parent.id === p.id),
    categories,
    result
  )
}));