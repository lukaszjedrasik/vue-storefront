<template>
  <SfHero>
    <SfHeroItem
      v-for="(item, i) in items"
      :key="i"
      :title="item.title"
      :subtitle="item.subtitle"
      :background="item.background"
      :image="item.image"
    />
  </SfHero>
</template>

<script>
import Vue from 'vue';
import { SfHero } from '@storefront-ui/vue';

export default Vue.extend({
  name: 'Hero',
  components: {
    SfHero
  },
  props: {
    items: {}
  }
});
</script>
