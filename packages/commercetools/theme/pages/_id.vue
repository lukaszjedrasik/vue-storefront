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
  name: 'DynamicPage',
  components: {
    RenderContent: Render
  },
  setup (props, { root }) {
    const { $route } = root;
    const { id: slug } = $route.params;
    const { search, content } = useContent(slug);

    onSSR(async () => {
      await search({ slug });
    });

    return {
      content
    };
  }
});
</script>

<style scoped>

</style>
