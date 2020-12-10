import gql from 'graphql-tag';
import { deleteAddressQuery } from './defaultQuery';
import { InternalParams, ShippingAddress, User } from "../../types";
import { getCustomQuery } from "@vue-storefront/commercetools-api";

interface ShippingAddressDeleteParams extends InternalParams {
  address: Pick<ShippingAddress, 'id'>;
}

const removeAddressAction = (addressId: string) => ({ removeAddress: { addressId } });

export default async function deleteAddress (context, params: ShippingAddressDeleteParams, customQueryFn?): Promise<User> {
  const defaultVariables = {
    version: params.user.version,
    actions: [
      removeAddressAction(params.address.id)
    ]
  };

  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery: deleteAddressQuery, defaultVariables });

  const response = await context.client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return response.data.user;
}
