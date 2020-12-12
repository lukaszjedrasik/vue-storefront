<template>
  <SfAccordion :open="open" :multiple="false" :show-chevron="true" transition="sf-expand">
    <SfAccordionItem v-for="(item, i) in items" :key="i" :header="item.header">
    </SfAccordionItem>
  </SfAccordion></template>

<script lang='ts'>
import Vue from 'vue';
import { SfAccordion } from '@storefront-ui/vue';

export default Vue.extend({
  name: 'Accordion',
  components: {
    SfAccordion
  },
  props: {
    open: {},
    items: {}
  }
});
</script>
