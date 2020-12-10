import { AddShoppingListLineItem } from '@vue-storefront/commercetools-api/src/types/GraphQL';
import { ProductIdentifier } from '../../types';

export const addLineItemAction = (product: ProductIdentifier): { addLineItem: AddShoppingListLineItem } => ({
    addLineItem: {
        quantity: 1,
        sku: product.sku
    }
});