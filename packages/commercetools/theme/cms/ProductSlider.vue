<template>
  <SfCarousel v-if="!loading" class="product-carousel">
    <SfCarouselItem v-for="(product, i) in list" :key="i">
      <SfProductCard
        data-cy="home-url_product"
        :title="productGetters.getName(product)"
        :image="product.images[0].url"
        :regular-price="productGetters.getFormattedPrice(productGetters.getPrice(product).regular)"
        :special-price="productGetters.getFormattedPrice(productGetters.getPrice(product).regular)"
        :max-rating="5"
        :score-rating="3.6"
        :show-add-to-cart-button="true"
        :is-on-wishlist="product.isOnWishlist"
        :link="`/product?id=${product._id}`"
        class="product-card"
      />
    </SfCarouselItem>
  </SfCarousel>
</template>

<script lang='ts'>
import Vue from 'vue';
import { SfCarousel, SfProductCard } from '@storefront-ui/vue';
import { useProduct, productGetters } from "@vue-storefront/commercetools";
import { ref, onMounted } from '@vue/composition-api'

export default Vue.extend({
  name: 'ProductSlider',
  components: {
    SfCarousel,
    SfProductCard
  },
  props: {
    items: {}
  },
  setup (props) {
    const list = ref([])
    const loading = ref(true)

    onMounted(async () => await getProducts());

    async function getProducts() {
      await Promise.all((props.items).map(async (id) => {
        console.log('123', id);
        const { search, products } = useProduct(`${id}-${(Date.now() + Math.random()).toString().replace('.', '')}`)
        await search({ id })
        list.value.push(products.value[0])
      }))
      loading.value = false
    }
    return {
      list,
      loading,
      productGetters
    }
  }
});
</script>
