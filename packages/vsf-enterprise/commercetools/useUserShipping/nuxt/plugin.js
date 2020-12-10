import { integrationPlugin } from '@vue-storefront/commercetools';
import {
  addShippingAddress,
  deleteShippingAddress,
  setDefaultShippingAddress,
  updateShippingAddress
} from '@vsf-enterprise/ct-shipping';

export default integrationPlugin(({ integration }) => {
  integration.extend({
    api: {
      addShippingAddress,
      deleteShippingAddress,
      setDefaultShippingAddress,
      updateShippingAddress
    }
  })
});
