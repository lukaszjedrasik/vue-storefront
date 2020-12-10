import gql from 'graphql-tag';
import { setDefaultAddressAction } from '../setDefault';
import { updateAddressQuery } from "./defaultQuery";
import { InternalParams, ShippingAddress, User } from "../../types";
import { getCustomQuery } from "@vue-storefront/commercetools-api";

interface ShippingAddressUpdateParams extends InternalParams {
  address: ShippingAddress;
}

const updateAddressAction = (address: ShippingAddress) => ({ changeAddress: { addressId: address.id, address } });

export default async function updateAddress (context, params: ShippingAddressUpdateParams, customQueryFn?): Promise<User> {
  const { isDefault, ...address } = params.address;
  const wasDefault = params.user.defaultShippingAddressId === address.id;

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
    defaultVariables.actions.unshift(setDefaultAddressAction(addressId))
  }

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery: updateAddressQuery, defaultVariables });

  const response = await context.client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return response.data.user;
}
