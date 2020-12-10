import defaultQuery from '../addToMyShoppingList/defaultMutation';
import gql from 'graphql-tag';
import { getCustomQuery, CustomQueryFn } from '@vue-storefront/commercetools-api';
import { removeLineItemAction } from '../helpers/removeLineItemAction';
import { LineItemIdentifier } from '../../types';

const removeFromMyShoppingList = async (context, { products, id, version }: { products: LineItemIdentifier[], id: string, version: string }, customQuery?: CustomQueryFn) => {
  const { acceptLanguage, currency } = context.config;

  const defaultVariables = {
    acceptLanguage,
    currency,
    id,
    version,
    actions: products.map(product => removeLineItemAction(product))
  }

  const { query, variables } = getCustomQuery(customQuery, { defaultQuery, defaultVariables });

  const request = await context.client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
}

export default removeFromMyShoppingList;
