import { basicProfile } from './defaultQuery';
import gql from 'graphql-tag';
import { getCustomQuery, CustomQueryFn } from '@vue-storefront/commercetools-api';

const getMyShoppingList = async (context, customQuery?: CustomQueryFn) => {
  const { acceptLanguage, currency } = context.config;
  const defaultQuery = basicProfile;
  const defaultVariables = {
    acceptLanguage,
    currency
  };
  const { query, variables } = getCustomQuery(customQuery, { defaultQuery, defaultVariables });

  const request = await context.client.query({
    query: gql`${query}`,
    variables,
    fetchPolicy: 'no-cache'
  });

  return request;
};

export default getMyShoppingList;
