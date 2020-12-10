import gql from 'graphql-tag';

const basicProfile = gql`
  query getMe($acceptLanguage: [Locale!], $currency: Currency!) {
    me {
      shoppingLists(limit: 1, offset: 0) {
        results {
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
    }
  }
`;

export { basicProfile };
