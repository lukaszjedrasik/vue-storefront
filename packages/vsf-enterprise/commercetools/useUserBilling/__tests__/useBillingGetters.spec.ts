import { userBillingGetters } from '../src/getters/userBillingGetters';

const billing: any = {
  defaultBillingAddressId: 'ID',
  billingAddresses: [
    {
      id: 'ID',
      title: 'TITLE',
      salutation: 'SALUTATION',
      firstName: 'FIRST_NAME',
      lastName: 'LAST_NAME',
      streetName: 'STREET_NAME',
      streetNumber: 'STREET_NUMBER',
      additionalStreetInfo: 'ADDITIONAL_STREET_INFO',
      postalCode: 12345,
      city: 'CITY',
      region: 'REGION',
      state: 'STATE',
      country: 'COUNTRY',
      company: 'COMPANY',
      department: 'DEPARTMENT',
      building: 'BUILDING',
      apartment: 'APARTMENT',
      pOBox: 'PO_BOX',
      additionalAddressInfo: 'ADDITIONAL_ADDRESS_INFO',
      phone: 'PHONE',
      mobile: 'MOBILE',
      email: 'EMAIL',
      fax: 'FAX',
      isDefault: true
    }
  ]
};

describe('[ct-billing] useBillingGetters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all addresses', () => {
    expect(userBillingGetters.getAddresses(billing)).toEqual(billing.billingAddresses);
  });

  it('returns filtered addresses', () => {
    expect(userBillingGetters.getAddresses(billing, { isDefault: false })).toEqual([]);
    expect(userBillingGetters.getAddresses(billing, { isDefault: true })).toEqual(billing.billingAddresses);
  });

  it('returns default address', () => {
    expect(userBillingGetters.getDefault(billing)).toEqual(billing.billingAddresses[0]);
  });

  it('returns addresses count', () => {
    expect(userBillingGetters.getTotal(billing)).toBe(1);
  });

  it('returns address post code', () => {
    expect(userBillingGetters.getPostCode(billing.billingAddresses[0])).toBe(12345);
  });

  it('returns address street name', () => {
    expect(userBillingGetters.getStreetName(billing.billingAddresses[0])).toBe('STREET_NAME');
  });

  it('returns address street number', () => {
    expect(userBillingGetters.getStreetNumber(billing.billingAddresses[0])).toBe('STREET_NUMBER');
  });

  it('returns address city', () => {
    expect(userBillingGetters.getCity(billing.billingAddresses[0])).toBe('CITY');
  });

  it('returns first name', () => {
    expect(userBillingGetters.getFirstName(billing.billingAddresses[0])).toBe('FIRST_NAME');
  });

  it('returns last name', () => {
    expect(userBillingGetters.getLastName(billing.billingAddresses[0])).toBe('LAST_NAME');
  });

  it('returns address country', () => {
    expect(userBillingGetters.getCountry(billing.billingAddresses[0])).toBe('COUNTRY');
  });

  it('returns phone number', () => {
    expect(userBillingGetters.getPhone(billing.billingAddresses[0])).toBe('PHONE');
  });

  it('returns e-mail address', () => {
    expect(userBillingGetters.getEmail(billing.billingAddresses[0])).toBe('EMAIL');
  });

  it('returns address province', () => {
    expect(userBillingGetters.getProvince(billing.billingAddresses[0])).toBe('STATE');
  });

  it('returns company name', () => {
    expect(userBillingGetters.getCompanyName(billing.billingAddresses[0])).toBe('COMPANY');
  });

  it('returns tax number', () => {
    expect(userBillingGetters.getTaxNumber(billing.billingAddresses[0])).toBe('');
  });

  it('returns address id', () => {
    expect(userBillingGetters.getId(billing.billingAddresses[0])).toBe('ID');
  });

  it('returns address apartment', () => {
    expect(userBillingGetters.getApartmentNumber(billing.billingAddresses[0])).toBe('APARTMENT');
  });

  it('returns is default', () => {
    expect(userBillingGetters.isDefault(billing.billingAddresses[0])).toBe(true);
  });
});
