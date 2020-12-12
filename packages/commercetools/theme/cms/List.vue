<template>
  <SfList>
    <SfListItem v-for="(item, i) in items" :key="i">
      {{ item.label }}
    </SfListItem>
  </SfList>
</template>

<script lang='ts'>
import Vue from 'vue';
import { SfList } from '@storefront-ui/vue';

export default Vue.extend({
  name: 'List',
  components: {
    SfList
  },
  props: {
    items: {}
  }
});
</script>
