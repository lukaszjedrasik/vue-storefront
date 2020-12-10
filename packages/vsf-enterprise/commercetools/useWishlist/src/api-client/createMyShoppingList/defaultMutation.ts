import gql from 'graphql-tag';

export default gql`
  mutation createMyShoppingList($draft: MyShoppingListDraft!, $acceptLanguage: [Locale!], $currency: Currency!) {
    wishlist: createMyShoppingList(draft: $draft) {
      id
      version
      lineItems {
        id 
        quantity
        name(acceptLanguage: $acceptLanguage)
        variant {
          sku
          price (currency: $currency) {
            tiers {
              value {
                centAmount
              }
            }
            value {
              centAmount
            }
            discounted {
              value {
                centAmount
              }
              discount {
                isActive
                name(acceptLanguage: $acceptLanguage)
              }
            }
          }
          images {
            url
            label
          }
        }
      }
    }
  }
`;
