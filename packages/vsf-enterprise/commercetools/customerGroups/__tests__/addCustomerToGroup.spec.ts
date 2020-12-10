import { addCustomerToGroup } from './../src/index';
import { updateCustomerMutation } from './../src/queries';
const mutateMock = jest.fn();

jest.mock('./../src/configuration', () => ({
  getSettings: () => ({
    client: {
      mutate: mutateMock
    }
  })
}))

describe('[commercetools][customerGroups] addCustomerToGroup', () => {
  it('adds customer to the group', async () => {
    const customer = { id: 'eb7d1289-3063-4158-8bef-4caaa1ef476c', version: 5 };
    const group = { id: 'd0df9c72-5248-4da4-ac78-826a59e7dc47' };
    await addCustomerToGroup(customer, group);

    expect(mutateMock).toBeCalledWith({
      mutation: updateCustomerMutation,
      variables: {
        ...customer,
        actions: [{
          setCustomerGroup: {
            customerGroup: {
              id: 'd0df9c72-5248-4da4-ac78-826a59e7dc47'
            }
          }
        }]
      },
      fetchPolicy: 'no-cache'
    });
  });
});
