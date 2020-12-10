import { BillingAddress, User } from '../types';
import { useUser } from '@vue-storefront/commercetools';
import { useUserBillingFactory, UseUserBillingFactoryParams } from '@vue-storefront/core';

function mapResponse(user): User {
  const billingAddresses =  user.billingAddresses.map(address => ({
    ...address,
    isDefault: address.id === user.defaultBillingAddressId
  }));

  return { ...user, billingAddresses };
}

async function handler(context, fn, params): Promise<User> {
  const response = await fn({ ...params, user: context.user.value });
  const mapped = mapResponse(response);
  context.setUser(mapped);
  return mapped;
}

//TODO: Add support for custom queries when this is implemented: https://github.com/DivanteLtd/vue-storefront/issues/5049
const params: UseUserBillingFactoryParams<User, BillingAddress> = {
  setup(): any {
    const { user, load: loadUser, setUser } = useUser();
    return { user, loadUser, setUser };
  },
  load: async (context) => {
    const load = async ({ user }) => {
      await context.loadUser();
      return user;
    };

    return handler(context, load, {});
  },
  setDefault: async (context, params) => handler(context, context.$ct.api.setDefaultBillingAddress, params),
  addAddress: async (context, params) => handler(context, context.$ct.api.addBillingAddress, params),
  updateAddress: async (context, params) => handler(context, context.$ct.api.updateBillingAddress, params),
  deleteAddress: async (context, params) => handler(context, context.$ct.api.deleteBillingAddress, params),
};

export const { useUserBilling } = useUserBillingFactory<User, BillingAddress>(params);
