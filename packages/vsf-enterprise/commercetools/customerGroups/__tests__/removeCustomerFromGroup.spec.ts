
import { removeCustomerFromGroup } from './../src/index';
import { updateCustomerMutation } from './../src/queries';
const mutateMock = jest.fn();

jest.mock('./../src/configuration', () => ({
  getSettings: () => ({
    client: {
      mutate: mutateMock
    }
  })
}))
describe('[commercetools][customerGroups] removeCustomerFromGroup', () => {

  it('removes customer from the group', async () => {
    const customer = { id: 'eb7d1289-3063-4158-8bef-4caaa1ef476c', version: 5 };
    await removeCustomerFromGroup(customer);

    expect(mutateMock).toBeCalledWith({
      mutation: updateCustomerMutation,
      variables: {
        ...customer,
        actions: [{
          setCustomerGroup: {
            customerGroup: null
          }
        }]
      },
      fetchPolicy: 'no-cache'
    });
  });

});
