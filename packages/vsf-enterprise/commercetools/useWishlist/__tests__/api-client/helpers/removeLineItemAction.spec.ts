import { removeLineItemAction } from '../../../src/api-client/helpers/removeLineItemAction';

describe('[commercetools-api-client-helpers] removeLineItemAction', () => {
  it('return proper value', async () => {
    const product = {
      id: '12'
    };

    const addShopingListLineItem = removeLineItemAction(<any>product);

    expect(addShopingListLineItem).toStrictEqual({
      removeLineItem: {
        quantity: 1,
        lineItemId: product.id
      }
    })
  });
});
