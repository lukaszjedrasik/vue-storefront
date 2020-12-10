<template>
  <SfAlert :message="message" :type="type" />
</template>

<script lang='ts'>
import Vue from 'vue';
import { SfAlert } from '@storefront-ui/vue';

export default Vue.extend({
  name: 'Alert',
  components: {
    SfAlert
  },
  props: {
    message: {},
    type: {}
  }
});
</script>
