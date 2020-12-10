import { UserShippingGetters } from '@vue-storefront/core';
import { ShippingAddress, User } from '../types';

export const userShippingGetters: UserShippingGetters<User, ShippingAddress> = {
  getAddresses: (shipping, criteria?: Record<string, any>) => {
    if (!criteria || !Object.keys(criteria).length) {
      return shipping.shippingAddresses;
    }

    const entries = Object.entries(criteria);
    return shipping.shippingAddresses.filter(address => entries.every(([key, value]) => address[key] === value));
  },
  getDefault: shipping => shipping.shippingAddresses.find(({ id }) => id === shipping.defaultShippingAddressId),
  getTotal: shipping => shipping.shippingAddresses.length,

  getPostCode: address => address?.postalCode || '',
  getStreetName: address => address?.streetName || '',
  getStreetNumber: address => address?.streetNumber || '',
  getCity: address => address?.city || '',
  getFirstName: address => address?.firstName || '',
  getLastName: address => address?.lastName || '',
  getCountry: address => address?.country || '',
  // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4900
  // @ts-ignore
  getPhone: address => address?.phone || '',
  // TODO: https://github.com/DivanteLtd/vue-storefront/issues/4900
  // @ts-ignore
  getEmail: address => address?.email || '',
  getProvince: address => address?.state || '',
  getCompanyName: address => address?.company || '',
  getTaxNumber: address => '',
  getId: address => address?.id || '',
  getApartmentNumber: address => address?.apartment || '',
  isDefault: address => address?.isDefault || false,
};
