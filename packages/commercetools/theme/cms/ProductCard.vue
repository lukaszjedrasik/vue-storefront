<template>
  <SfProductCard
    :title="title"
    :link="link"
    :regular-price="price"
    :special-price="special_price"
    :score-rating="rating"
    :max-rating="max_rating"
    :image="image"
  />
</template>

<script lang='ts'>
import Vue from 'vue';
import { SfProductCard } from '@storefront-ui/vue';

export default Vue.extend({
  name: 'ProductCard',
  components: {
    SfProductCard
  },
  props: {
    title: {},
    link: {},
    price: {},
    special_price: {},
    rating: {},
    max_rating: {},
    image: {}
  }
});
</script>
