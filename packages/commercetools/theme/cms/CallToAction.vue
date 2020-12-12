<template>
  <SfCallToAction
    :title="title"
    :description="description"
    :button-text="button_text"
    :link="button_link"
    :image="image"
    :background="background"
  />
</template>

<script lang='ts'>
import Vue from 'vue';
import { SfCallToAction } from '@storefront-ui/vue';

export default Vue.extend({
  name: 'CallToAction',
  components: {
    SfCallToAction
  },
  props: {
    title: {},
    description: {},
    button_text: {},
    button_link: {},
    image: {},
    background: {}
  }
});
</script>
