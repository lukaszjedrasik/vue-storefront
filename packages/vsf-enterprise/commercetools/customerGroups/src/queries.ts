/* istanbul ignore file */
import gql from 'graphql-tag';
import { ResourceIdentifierInput } from '@vue-storefront/commercetools-api';

export const setCustomerGroupAction = (customerGroup: ResourceIdentifierInput) => ({
  setCustomerGroup: { customerGroup }
})

export const updateCustomerMutation = gql`
  mutation updateCustomer($version: Long!, $actions: [CustomerUpdateAction!]!, $id: String) {
    customer: updateCustomer(version: $version, actions: $actions, id: $id) {
      id
      version
      email
    }
  }
`
