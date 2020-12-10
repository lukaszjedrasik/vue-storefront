import gql from 'graphql-tag';
import { CustomerFragment } from '@vue-storefront/commercetools-api';

export const deleteAddressQuery = gql`
  ${CustomerFragment}

  mutation deleteShippingAddress($version: Long!, $actions: [MyCustomerUpdateAction!]!, $storeKey: KeyReferenceInput) {
    user: updateMyCustomer(version: $version, actions: $actions, storeKey: $storeKey) {
      ...DefaultCustomer
    }
  }
`;
