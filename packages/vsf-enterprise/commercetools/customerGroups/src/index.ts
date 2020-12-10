import {
  ResourceIdentifierInput,
  MutationResponse,
  Customer
} from '@vue-storefront/commercetools-api';
import { updateCustomerMutation, setCustomerGroupAction } from './queries';
import { setup, update, getSettings } from './configuration';

interface CustomerIdentifier {
  id: string;
  version: number;
}

type UpdateResult = MutationResponse<'customer', Customer>

const addCustomerToGroup = async (customer: CustomerIdentifier, group: ResourceIdentifierInput): Promise<UpdateResult> => {
  const { client } = getSettings();

  const request = await client.mutate({
    mutation: updateCustomerMutation,
    variables: {
      ...customer,
      actions: [setCustomerGroupAction(group)]
    },
    fetchPolicy: 'no-cache'
  });

  return request;
}

const removeCustomerFromGroup = async (customer: CustomerIdentifier): Promise<UpdateResult> => {
  const { client } = getSettings();

  const request = await client.mutate({
    mutation: updateCustomerMutation,
    variables: {
      ...customer,
      actions: [setCustomerGroupAction(null)]
    },
    fetchPolicy: 'no-cache'
  });

  return request;
}


export {
  addCustomerToGroup,
  removeCustomerFromGroup,
  setup,
  update,
  getSettings
}
