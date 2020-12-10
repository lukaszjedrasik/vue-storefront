const loadCurrentShoppingList = async (context, customQueryFn = (user = null, wishlist = null) => ({ user, wishlist })) => {
  const { user, wishlist } = customQueryFn();
  const { data: profileData } = await context.$ct.api.getMyShoppingList(user)

  if (profileData.me.shoppingLists && profileData.me.shoppingLists.results && profileData.me.shoppingLists.results.length) {
    return profileData.me.shoppingLists.results[0];
  }

  const { locale } = context.$ct.config;

  const { data } = await context.$ct.api.createMyShoppingList({
    name: [
      {
        value: 'wishlist',
        locale
      }
    ]
  }, wishlist);

  return data.wishlist;
};

export default loadCurrentShoppingList;
