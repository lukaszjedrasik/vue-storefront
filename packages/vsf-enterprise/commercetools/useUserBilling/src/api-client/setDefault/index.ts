import gql from 'graphql-tag';
import { setDefaultAddressQuery } from "./defaultQuery";
import { InternalParams, BillingAddress, User } from "../../types";
import { getCustomQuery } from "@vue-storefront/commercetools-api";

interface BillingAddressSetDefaultParams extends InternalParams {
  address: Pick<BillingAddress, 'id'>,
}

export const setDefaultAddressAction = (addressId: string) => ({ setDefaultBillingAddress: { addressId } });

export default async function setDefault (context, params: BillingAddressSetDefaultParams, customQueryFn?): Promise<User> {
  const defaultVariables = {
    version: params.user.version,
    actions: [
      setDefaultAddressAction(params.address.id)
    ]
  };
  const { query, variables } = getCustomQuery(customQueryFn, { defaultQuery: setDefaultAddressQuery, defaultVariables });

  const response = await context.client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return response.data.user;
}
