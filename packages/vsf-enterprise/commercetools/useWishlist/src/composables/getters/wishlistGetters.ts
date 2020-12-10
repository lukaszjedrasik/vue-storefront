import {
  WishlistGetters,
  AgnosticPrice,
  AgnosticTotals
} from '@vue-storefront/core';
import { ShoppingList as Wishlist, ShoppingListLineItem } from '@vue-storefront/commercetools-api';
import { createPrice } from './helpers/temp-utils';
// import { productGetters } from '@vue-storefront/commercetools'

// TODO: Implement exported utils from https://github.com/DivanteLtd/vue-storefront/issues/5061

export const getWishlistItems = (wishlist: Wishlist): ShoppingListLineItem[] => {
  if (!wishlist) {
    return []
  }
  return wishlist.lineItems
};

export const getWishlistItemName = (product: ShoppingListLineItem): string => product.name;

export const getWishlistItemImage = (product: ShoppingListLineItem): string => product.variant.images[0].url;

export const getWishlistItemPrice = (product: ShoppingListLineItem): AgnosticPrice => createPrice(product.variant);

export const getWishlistItemQty = (product: ShoppingListLineItem): number => product.quantity;

// There is some problem with attributeList in GQL query for wishlist. CT Bug(?)
// export const getWishlistItemAttributes = (product: ShoppingListLineItem, filterByAttributeName?: string[]) => productGetters.getAttributes(product.variant, filterByAttributeName);
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const getWishlistItemAttributes = (product: ShoppingListLineItem, filterByAttributeName?: string[]) => ({})

export const getWishlistItemSku = (product: ShoppingListLineItem): string => product.variant.sku;

export const getWishlistTotals = (wishlist: Wishlist): AgnosticTotals => {
  if (!wishlist) {
    return {
      total: 0,
      subtotal: 0
    };
  }
  const subtotalPrice = wishlist.lineItems.reduce((total, curr) => {
    const { special, regular } = createPrice(curr.variant);
    return total + ((special || regular) * curr.quantity)
  }, 0)

  return {
    total: Number(subtotalPrice.toFixed(2)),
    subtotal: Number(subtotalPrice.toFixed(2))
  };
}

export const getWishlistTotalItems = (wishlist: Wishlist): number => {
  if (!wishlist || !wishlist.lineItems || !wishlist.lineItems.length) {
    return 0;
  }

  return wishlist.lineItems.reduce((previous, current) => previous + current.quantity, 0);
};

export const getFormattedPrice = (price: number) => price as any as string;

export const wishlistGetters: WishlistGetters<Wishlist, ShoppingListLineItem> = {
  getTotals: getWishlistTotals,
  getItems: getWishlistItems,
  getItemName: getWishlistItemName,
  getItemImage: getWishlistItemImage,
  getItemPrice: getWishlistItemPrice,
  getItemQty: getWishlistItemQty,
  getItemAttributes: getWishlistItemAttributes,
  getItemSku: getWishlistItemSku,
  getTotalItems: getWishlistTotalItems,
  getFormattedPrice
};

