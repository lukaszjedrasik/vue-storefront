import { Address, Customer } from "@vue-storefront/commercetools-api";

export type User = Customer;

export type BillingAddress = Address & {
  isDefault?: boolean;
}

export interface InternalParams {
  user: Customer;
}
