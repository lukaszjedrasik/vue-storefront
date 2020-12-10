import gql from 'graphql-tag';
import { CustomerFragment } from '@vue-storefront/commercetools-api';

export const updateAddressQuery = gql`
  ${CustomerFragment}
  
  mutation updateBillingAddress($version: Long!, $actions: [MyCustomerUpdateAction!]!, $storeKey: KeyReferenceInput) {
    user: updateMyCustomer(version: $version, actions: $actions, storeKey: $storeKey) {
      ...DefaultCustomer
    }
  }
`;
