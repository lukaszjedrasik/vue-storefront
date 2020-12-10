import gql from 'graphql-tag';
import { addAddressQuery } from "./defaultQuery";
import { setDefaultAddressAction } from '../setDefault';
import { InternalParams, ShippingAddress, User } from "../../types";
import { getCustomQuery } from "@vue-storefront/commercetools-api";

interface ShippingAddressAddParams extends InternalParams {
  address: ShippingAddress;
}

const addAddressAction = (address: ShippingAddress) => ({ addAddress: { address } });
const setAsShippingAddressAction = (addressId: string) => ({ addShippingAddressId: { addressId } })

export default async function addAddress (context, params: ShippingAddressAddParams, customQueryFn?): Promise<User> {
  const { isDefault, ...address } = params.address;
  const defaultVariables = {
    version: params.user.version,
    actions: [
      addAddressAction(address)
    ]
  };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery: addAddressQuery, defaultVariables });

  const addAddressRequest = await context.client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  const newAddress = addAddressRequest.data.user.addresses[addAddressRequest.data.user.addresses.length - 1];

  const actions: any[] = [
    setAsShippingAddressAction(newAddress.id),
  ];

  if (isDefault) {
    actions.push(setDefaultAddressAction(newAddress.id));
  }

  const response = await context.client.mutate({
    mutation: gql`${addAddressQuery}`,
    variables: {
      version: addAddressRequest.data.user.version,
      actions
    },
    fetchPolicy: 'no-cache'
  });

  return response.data.user;
}
