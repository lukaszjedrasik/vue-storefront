import { integrationPlugin } from '@vue-storefront/commercetools';
import {
  addToMyShoppingList,
  createMyShoppingList,
  getMyShoppingList,
  removeFromMyShoppingList
 } from '@vsf-enterprise/ct-wishlist';

export default integrationPlugin(({ integration }) => {
  integration.extend({
    api: {
      addToMyShoppingList,
      createMyShoppingList,
      getMyShoppingList,
      removeFromMyShoppingList
    }
  })
});
