import { UserBillingGetters } from '@vue-storefront/core';
import {  BillingAddress, User } from '../types';

export const userBillingGetters: UserBillingGetters<User, BillingAddress> = {
  getAddresses: (billing, criteria?: Record<string, any>) => {
    if (!criteria || !Object.keys(criteria).length) {
      return billing.billingAddresses;
    }

    const entries = Object.entries(criteria);
    return billing.billingAddresses.filter(address => entries.every(([key, value]) => address[key] === value));
  },
  getDefault: billing => billing.billingAddresses.find(({ id }) => id === billing.defaultBillingAddressId),
  getTotal: billing => billing.billingAddresses.length,

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
