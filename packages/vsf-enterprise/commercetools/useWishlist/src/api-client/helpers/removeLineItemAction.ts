import { RemoveShoppingListLineItem } from '@vue-storefront/commercetools-api/src/types/GraphQL';
import { LineItemIdentifier } from '../../types';

export const removeLineItemAction = (product: LineItemIdentifier): { removeLineItem: RemoveShoppingListLineItem } => ({
    removeLineItem: {
        quantity: 1,
        lineItemId: product.id
    }
});