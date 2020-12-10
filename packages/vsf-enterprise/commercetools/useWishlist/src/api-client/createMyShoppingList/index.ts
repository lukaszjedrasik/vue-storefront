import { getCustomQuery, MyShoppingListDraft, CustomQueryFn } from '@vue-storefront/commercetools-api';
import defaultQuery from './defaultMutation'
import gql from 'graphql-tag';

interface ShoppingListData extends Omit<MyShoppingListDraft, 'currency'> {
  currency?: string;
}

const createMyShoppingList = async (context, draft: ShoppingListData, customQuery?: CustomQueryFn) => {
  const { acceptLanguage, currency } = context.config;
  const defaultVariables = {
    acceptLanguage,
    currency,
    draft
  };
  const { query, variables } = getCustomQuery(customQuery, { defaultQuery, defaultVariables });

  const request = await context.client.mutate({
    mutation: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default createMyShoppingList;
