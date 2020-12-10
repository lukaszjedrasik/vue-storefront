import { integrationPlugin } from '@vue-storefront/commercetools';
import {
  addBillingAddress,
  deleteBillingAddress,
  setDefaultBillingAddress,
  updateBillingAddress
} from '@vsf-enterprise/ct-billing';

export default integrationPlugin(({ integration }) => {
  integration.extend({
    api: {
      addBillingAddress,
      deleteBillingAddress,
      setDefaultBillingAddress,
      updateBillingAddress
    }
  })
});
