import gql from 'graphql-tag';

export default gql`

  mutation updateShoppingList($id: String!, $version: Long!, $actions: [MyShoppingListUpdateAction!]!, $acceptLanguage: [Locale!], $currency: Currency!) {
    wishlist: updateMyShoppingList(id: $id, version: $version, actions: $actions) {
      id  
      version
      lineItems {
        id 
        quantity
        name(acceptLanguage: $acceptLanguage)
        variant {
          sku
          price(currency: $currency) {
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
