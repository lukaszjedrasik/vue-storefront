<template>
  <SfBanner
    :title="title"
    :subtitle="subtitle"
    :description="description"
    :button-text="button_text"
    :link="button_link"
    :image="image"
    :background="background"
  />
</template>

<script lang='ts'>
import Vue from 'vue';
import { SfBanner } from '@storefront-ui/vue'

export default Vue.extend({
  name: 'Banner',
  components: {
    SfBanner
  },
  props: {
    title: {},
    subtitle: {},
    description: {},
    banner_text: {},
    banner_link: {},
    image: {},
    background: {}
  }
});
</script>
