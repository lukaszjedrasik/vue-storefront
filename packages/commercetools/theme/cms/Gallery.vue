<template>
  <SfGallery :images="images" />
</template>

<script lang='ts'>
import Vue from 'vue';
import { SfGallery } from '@storefront-ui/vue';

export default Vue.extend({
  name: 'Gallery',
  components: {
    SfGallery
  },
  props: {
    images: {}
  }
});
</script>
