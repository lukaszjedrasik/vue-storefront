import { addLineItemAction } from '../../../src/api-client/helpers/addLineItemAction';

describe('[commercetools-api-client-helpers] addLineItemAction', () => {
  it('return proper value', async () => {
    const productVariant = {
      sku: 'abc'
    };

    const addShopingListLineItem = addLineItemAction(<any>productVariant);

    expect(addShopingListLineItem).toStrictEqual({
      addLineItem: {
        quantity: 1,
        sku: productVariant.sku
      }
    })
  });
});
