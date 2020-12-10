<template>
  <SfHeading
    :title="title"
    :description="description"
    :level="level"
  />
</template>

<script lang='ts'>
import Vue from 'vue';
import { SfHeading } from '@storefront-ui/vue';

export default Vue.extend({
  name: 'Heading',
  components: {
    SfHeading
  },
  props: {
    title: {},
    description: {},
    level: {}
  }
});
</script>
