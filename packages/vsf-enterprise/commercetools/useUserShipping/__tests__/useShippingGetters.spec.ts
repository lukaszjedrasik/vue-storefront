import { userShippingGetters } from "../src/getters/userShippingGetters";

const shipping: any = {
  defaultShippingAddressId: 'ID',
  shippingAddresses: [
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

describe('[ct-shipping] useShippingGetters', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns all addresses', () => {
    expect(userShippingGetters.getAddresses(shipping)).toEqual(shipping.shippingAddresses);
  });

  it('returns filtered addresses', () => {
    expect(userShippingGetters.getAddresses(shipping, { isDefault: false })).toEqual([]);
    expect(userShippingGetters.getAddresses(shipping, { isDefault: true })).toEqual(shipping.shippingAddresses);
  });

  it('returns default address', () => {
    expect(userShippingGetters.getDefault(shipping)).toEqual(shipping.shippingAddresses[0]);
  });

  it('returns addresses count', () => {
    expect(userShippingGetters.getTotal(shipping)).toBe(1);
  });

  it('returns address post code', () => {
    expect(userShippingGetters.getPostCode(shipping.shippingAddresses[0])).toBe(12345);
  });

  it('returns address street name', () => {
    expect(userShippingGetters.getStreetName(shipping.shippingAddresses[0])).toBe('STREET_NAME');
  });

  it('returns address street number', () => {
    expect(userShippingGetters.getStreetNumber(shipping.shippingAddresses[0])).toBe('STREET_NUMBER');
  });

  it('returns address city', () => {
    expect(userShippingGetters.getCity(shipping.shippingAddresses[0])).toBe('CITY');
  });

  it('returns first name', () => {
    expect(userShippingGetters.getFirstName(shipping.shippingAddresses[0])).toBe('FIRST_NAME');
  });

  it('returns last name', () => {
    expect(userShippingGetters.getLastName(shipping.shippingAddresses[0])).toBe('LAST_NAME');
  });

  it('returns address country', () => {
    expect(userShippingGetters.getCountry(shipping.shippingAddresses[0])).toBe('COUNTRY');
  });

  it('returns phone number', () => {
    expect(userShippingGetters.getPhone(shipping.shippingAddresses[0])).toBe('PHONE');
  });

  it('returns e-mail address', () => {
    expect(userShippingGetters.getEmail(shipping.shippingAddresses[0])).toBe('EMAIL');
  });

  it('returns address province', () => {
    expect(userShippingGetters.getProvince(shipping.shippingAddresses[0])).toBe('STATE');
  });

  it('returns company name', () => {
    expect(userShippingGetters.getCompanyName(shipping.shippingAddresses[0])).toBe('COMPANY');
  });

  it('returns tax number', () => {
    expect(userShippingGetters.getTaxNumber(shipping.shippingAddresses[0])).toBe('');
  });

  it('returns address id', () => {
    expect(userShippingGetters.getId(shipping.shippingAddresses[0])).toBe('ID');
  });

  it('returns address apartment', () => {
    expect(userShippingGetters.getApartmentNumber(shipping.shippingAddresses[0])).toBe('APARTMENT');
  });

  it('returns is default', () => {
    expect(userShippingGetters.isDefault(shipping.shippingAddresses[0])).toBe(true);
  });
});
