<template>
  <div v-html="content" />
</template>

<script lang='ts'>
import Vue from 'vue';

export default Vue.extend({
  name: 'Editorial',
  props: {
    content: {}
  }
});
</script>
