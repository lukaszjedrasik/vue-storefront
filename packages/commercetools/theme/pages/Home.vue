<template>
<div>
  <render-content
    v-if="content"
    v-for="(block, index) in content"
    :key="index"
    :content="block"
    class="content-block"
  />
</div>
</template>

<script>
import Vue from 'vue';
import { useContent } from '@vsf-enterprise/storyblok';
import { onSSR } from '@vue-storefront/core';
import Render from '~/cms/Render.vue';

export default Vue.extend({
  name: 'Home',
  components: {
    RenderContent: Render
  },
  setup () {
    const { search, content } = useContent('home');

    onSSR(async () => {
      await search({ slug: 'home' });
    });

    return {
      content
    };
  }
});
</script>

<style scoped>

</style>
