import gql from 'graphql-tag';
import { CustomerFragment } from '@vue-storefront/commercetools-api';

export const setDefaultAddressQuery = gql`
  ${CustomerFragment}
  
  mutation setDefaultBillingAddress($version: Long!, $actions: [MyCustomerUpdateAction!]!, $storeKey: KeyReferenceInput) {
    user: updateMyCustomer(version: $version, actions: $actions, storeKey: $storeKey) {
      ...DefaultCustomer
    }
  }
`;
