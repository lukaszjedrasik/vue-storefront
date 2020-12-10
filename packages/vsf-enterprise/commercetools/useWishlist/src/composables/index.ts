import {
  ProductVariant,
  LineItem,
  CustomQueryFn
} from '@vue-storefront/commercetools-api';
import { useWishlistFactory, UseWishlistFactoryParams } from '@vue-storefront/core';
import loadCurrentWishlist from './currentWishlist';
import { ShoppingListLineItem, ShoppingList } from '@vue-storefront/commercetools-api/src/types/GraphQL';
import { ProductIdentifier, LineItemIdentifier } from '../types';

type Wishlist = ShoppingList;

const getCurrentWishlist = async (context, currentWishlist) => {
  if (!currentWishlist) {
    return await loadCurrentWishlist(context);
  }

  return currentWishlist;
};

const getWishlistItemByProduct = ({ currentWishlist, product }) => {
  return currentWishlist
    && currentWishlist.lineItems
    && currentWishlist.lineItems.length
    && currentWishlist.lineItems.find((item: ShoppingListLineItem) => item.variant.sku === product.sku);
};

const params: UseWishlistFactoryParams<Wishlist, LineItem, ProductVariant> = {
  loadWishlist: async (context, customQuery?: any) => {
    if (context.$ct.api.isGuest()) {
      return null;
    }

    return await loadCurrentWishlist(context, customQuery);
  },

  addToWishlist: async (context, { currentWishlist, product }, customQuery?: CustomQueryFn) => {
    const { id, version } = await getCurrentWishlist(context, currentWishlist)

    const productIdentifier = product as ProductIdentifier;

    const { data } = await context.$ct.api.addToMyShoppingList({
      product: productIdentifier,
      id,
      version
    }, customQuery);
    return data.wishlist;
  },

  removeFromWishlist: async (context, { currentWishlist, product }, customQuery?: CustomQueryFn) => {
    const { id, version } = await getCurrentWishlist(context, currentWishlist)

    const lineItemIdentifier = product as LineItemIdentifier;

    const { data } = await context.$ct.api.removeFromMyShoppingList({
      products: [lineItemIdentifier],
      id,
      version
    }, customQuery);
    return data.wishlist;
  },

  clearWishlist: async (context, { currentWishlist }) => {
    const { lineItems, id, version } = await getCurrentWishlist(context, currentWishlist)

    const { data } = await context.$ct.api.removeFromMyShoppingList({
      products: lineItems,
      id,
      version
    });

    return data.wishlist;
  },

  isOnWishlist: (context, { currentWishlist, product }) => {
    return Boolean(currentWishlist && getWishlistItemByProduct({ currentWishlist, product }));
  }
};

const { setWishlist, useWishlist } = useWishlistFactory<Wishlist, LineItem, ProductVariant>(params);

export { setWishlist, useWishlist };
