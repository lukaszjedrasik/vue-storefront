import { ShippingAddress, User } from '../types';
import { useUser } from "@vue-storefront/commercetools";
import { useUserShippingFactory, UseUserShippingFactoryParams } from '@vue-storefront/core';

function mapResponse(user) {
  const shippingAddresses =  user.shippingAddresses.map(address => ({
    ...address,
    isDefault: address.id === user.defaultShippingAddressId
  }));

  return { ...user, shippingAddresses };
}

async function handler(context, fn, params): Promise<User> {
  const response = await fn({ ...params, user: context.user.value });
  const mapped = mapResponse(response);
  context.setUser(mapped);
  return mapped;
}

//TODO: Add support for custom queries when this is implemented: https://github.com/DivanteLtd/vue-storefront/issues/5049
const params: UseUserShippingFactoryParams<User, ShippingAddress> = {
  setup() {
    const { user,load: loadUser, setUser } = useUser()

    return { user, loadUser, setUser } as any;
  },
  load: async (context) => {
    const load = async ({ user }) => {
      await context.loadUser();
      return user;
    };

    return handler(context, load, {});
  },
  setDefault: async (context, params) => handler(context, context.$ct.api.setDefaultShippingAddress, params),
  addAddress: async (context, params) => handler(context, context.$ct.api.addShippingAddress, params),
  updateAddress: async (context, params) => handler(context, context.$ct.api.updateShippingAddress, params),
  deleteAddress: async (context, params) => handler(context, context.$ct.api.deleteShippingAddress, params),
};

export const { useUserShipping } = useUserShippingFactory<User, ShippingAddress>(params);
