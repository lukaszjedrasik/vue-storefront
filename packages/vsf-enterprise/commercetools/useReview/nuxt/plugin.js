import { integrationPlugin } from '@vue-storefront/commercetools';
import {
  addReview,
  getReview
 } from '@vsf-enterprise/ct-reviews';

export default integrationPlugin(({ integration }) => {
  integration.extend({
    api: {
      addReview,
      getReview
    }
  })
});
