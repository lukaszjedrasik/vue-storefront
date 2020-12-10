import { wishlistGetters } from '../../../src/composables/getters/wishlistGetters';
import { createPrice } from '../../../src/composables/getters/helpers/temp-utils';

jest.mock('../../../src/composables/getters/helpers/temp-utils', () => ({
    createPrice: jest.fn(variant => ({
        regular: variant.price.value.centAmount/100,
        special: 
            variant.price.discounted.discount.isActive 
            ? (variant.price.discounted.value.centAmount/100)
            : null
    })),
    createFormatPrice: jest.fn(price => String(price))
}))

const product = {
    id: 'xsadadas',
    productId: 'xcxcxcxcxc',
    productTypeRef: {
        typeId: 'aa',
        id: 'aa'
    },
    productType: {
        name: 'configurable',
        description: 'conf',
        attributeDefinitions: {
            total: 0,
            results: []
        },
        id: 'aasdasd',
        version: 122,
        createdAt: '1999-09-09',
        lastModifiedAt: '1999-09-09'
    },
    nameAllLocales: [],
    name: 'Zorgo',
    addedAt: '1888-02-02',
    quantity: 1,
    variant: {
        id: 52,
        images: [
            {
                url: 'my-url',
                dimensions: {
                    width: 12,
                    height: 13
                }
            }
        ],
        assets: [],
        sku: 'SKU122',
        price: {
            value: {
                type: 'aa',
                currencyCode: 'USD',
                fractionDigits: 2,
                centAmount: 1234
            },
            discounted: {
                discountRef: {
                    typeId: 'a',
                    id: 'b'
                },
                discount: {
                    predicate: 'aa',
                    isActive: true,
                    isValid: true,
                    sortOrder: 'desc',
                    nameAllLocales: [],
                    value: {
                        type: 'aa'
                    },
                    id: '23',
                    version: 12,
                    createdAt: '1923-03-23',
                    lastModifiedAt: '1992-03-03'
                },
                value: {
                    type: 'aa',
                    currencyCode: 'USD',
                    fractionDigits: 2,
                    centAmount: 1000
                }
            }
        },
        attributesRaw: [],
        attributes: {
            productTypeId: 'adasda'
        },
        attributeList: []
    }
}

const product2 = {
    id: 'kjhkhjkhjk',
    productId: 'yyurtyrtytr',
    productTypeRef: {
        typeId: 'aa',
        id: 'aa'
    },
    productType: {
        name: 'configurable',
        description: 'conf',
        attributeDefinitions: {
            total: 0,
            results: []
        },
        id: 'aasdasd',
        version: 122,
        createdAt: '1999-09-09',
        lastModifiedAt: '1999-09-09'
    },
    nameAllLocales: [],
    name: 'Tshirt',
    addedAt: '1888-02-02',
    quantity: 3,
    variant: {
        id: 1,
        images: [
            {
                url: 'my-url',
                dimensions: {
                    width: 12,
                    height: 13
                }
            }
        ],
        assets: [],
        sku: 'SKU122',
        price: {
            value: {
                type: 'aa',
                currencyCode: 'USD',
                fractionDigits: 2,
                centAmount: 1555
            },
            discounted: {
                discountRef: {
                    typeId: 'a',
                    id: 'b'
                },
                discount: {
                    predicate: 'aa',
                    isActive: false,
                    isValid: true,
                    sortOrder: 'desc',
                    nameAllLocales: [],
                    value: {
                        type: 'aa'
                    },
                    id: '23',
                    version: 12,
                    createdAt: '1923-03-23',
                    lastModifiedAt: '1992-03-03'
                },
                value: {
                    type: 'aa',
                    currencyCode: 'USD',
                    fractionDigits: 2,
                    centAmount: 1200
                }
            }
        },
        attributesRaw: [],
        attributes: {
            productTypeId: 'adasda'
        },
        attributeList: []
    }
}

const wishlist = {
    id: '1',
    version: 12,
    createdAt: '1999-01-01',
    lastModifiedAt: '1999-01-01',
    lineItems: [
        product,
        product2
    ],
    textLineItems: [],
    nameAllLocales: [],
}

describe('wishlistGetters', () => {
    it('getTotals', () => {
        const { total, subtotal } = wishlistGetters.getTotals(wishlist)

        expect(total).toBe((1000 + (1555 *3)) / 100)
        expect(subtotal).toBe((1000 + (1555 *3)) / 100)
    })

    it('getTotals returns object with 0 values if wishlist is nullish', () => {
        const { total, subtotal } = wishlistGetters.getTotals(null)

        expect(total).toBe(0)
        expect(subtotal).toBe(0)
    })

    it('getItems', () => {
         const items = wishlistGetters.getItems(wishlist)

         expect(items).toStrictEqual(wishlist.lineItems)
    })

    it('getItems returns empty array if wishlist is nullish', () => {
        const items = wishlistGetters.getItems(null)

        expect(items).toStrictEqual([])
   })

    it('getItemName', () => {
        const name = wishlistGetters.getItemName(product)

        expect(name).toBe(product.name)
    })

    it('getItemImage', () => {
        const imgUrl = wishlistGetters.getItemImage(product)

        expect(imgUrl).toBe(product.variant.images[0].url)
    })

    it('getItemPrice', () => {
        const { regular, special } = wishlistGetters.getItemPrice(product)

        expect(regular).toBe(product.variant.price.value.centAmount / 100)
        expect(special).toBe(product.variant.price.discounted.value.centAmount/100)
    })

    it('getItemQty', () => {
        const qty = wishlistGetters.getItemQty(product)

        expect(qty).toBe(product.quantity)
    })

    it('getItemAttributes', () => {
        const attrs = wishlistGetters.getItemAttributes(product)

        expect(attrs).toStrictEqual({})
    })

    it('getItemSku', () => {
        const sku = wishlistGetters.getItemSku(product)

        expect(sku).toBe(product.variant.sku)
    })

    it('getTotalItems', () => {
        const totalItems = wishlistGetters.getTotalItems(wishlist)

        expect(totalItems).toBe(4)
    })

    it('getTotalItems returns 0 if wishlist is nullish', () => {
        const totalItems = wishlistGetters.getTotalItems(null)

        expect(totalItems).toBe(0)
    })

    it('getFormattedPrice', () => {
        const price = 2;

        expect(wishlistGetters.getFormattedPrice(price)).toBe(price)
    })
})