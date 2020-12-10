import defaultQuery from './defaultMutation';
import gql from 'graphql-tag';
import { getCustomQuery, CustomQueryFn } from '@vue-storefront/commercetools-api';
import { addLineItemAction } from '../helpers/addLineItemAction';
import { ProductIdentifier } from '../../types';

const addToMyShoppingList = async (context, { product, id, version }: { product: ProductIdentifier, id: string, version: string }, customQuery?: CustomQueryFn) => {
  const { acceptLanguage, currency } = context.config;
  const defaultVariables = {
    acceptLanguage,
    currency,
    id,
    version,
    actions: [
      addLineItemAction(product)
    ]
  };

  const { query, variables } = getCustomQuery(customQuery, { defaultQuery, defaultVariables });

  const request = await context.client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default addToMyShoppingList;
