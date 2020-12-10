import gql from 'graphql-tag';
import { deleteAddressQuery } from './defaultQuery';
import { InternalParams, BillingAddress, User } from "../../types";
import { getCustomQuery } from "@vue-storefront/commercetools-api";

interface BillingAddressDeleteParams extends InternalParams {
  address: Pick<BillingAddress, 'id'>;
}

const removeAddressAction = (addressId: string) => ({ removeAddress: { addressId } });

export default async function deleteAddress (context, params: BillingAddressDeleteParams, customQueryFn?): Promise<User> {
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
