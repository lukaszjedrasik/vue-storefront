import gql from 'graphql-tag';
import { setDefaultAddressAction } from '../setDefault';
import { updateAddressQuery } from "./defaultQuery";
import { InternalParams, BillingAddress, User } from "../../types";
import { getCustomQuery } from "@vue-storefront/commercetools-api";

interface BillingAddressUpdateParams extends InternalParams {
  address: BillingAddress;
}

const updateAddressAction = (address: BillingAddress) => ({ changeAddress: { addressId: address.id, address } });

export default async function updateAddress (context, params: BillingAddressUpdateParams, customQueryFn?): Promise<User> {
  const { isDefault, ...address } = params.address;
  const wasDefault = params.user.defaultBillingAddressId === address.id;

  const defaultVariables: any = {
    version: params.user.version,
    actions: [
      updateAddressAction(address)
    ]
  };

  if (wasDefault !== isDefault) {
    const addressId: any = wasDefault && !isDefault
      ? null // Address is no longer a default
      : address.id; // Address is a new default

    // "unshift" because setting the default must be before update
    defaultVariables.actions.unshift(setDefaultAddressAction(addressId));
  }

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery: updateAddressQuery, defaultVariables });

  const response = await context.client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return response.data.user;
}
