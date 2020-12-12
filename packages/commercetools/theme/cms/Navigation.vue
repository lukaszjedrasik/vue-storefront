<template>
  <div class="nav-wrapper">
    <SfHeaderNavigationItem
      v-for="(item, i) in items"
      :key="i"
      :label="item.caption"
      :link="item.link"
    />
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  name: 'Navigation',
  props: {
    items: {}
  }
});
</script>
