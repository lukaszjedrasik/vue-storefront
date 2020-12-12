<template>
<div v-if="story && story.content">
  <render-content
    v-for="(block, index) in story.content.body"
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
import { computed, onMounted } from '@vue/composition-api';

export default Vue.extend({
  name: 'Home',
  components: {
    RenderContent: Render
  },
  setup () {
    const { search, content } = useContent('home');
    const story = computed(() => content.value);

    onSSR(async () => {
      await search({ slug: 'home' });
    });

    onMounted(() => {
      window.storyblok.init();
      window.storyblok.on(['input', 'published', 'change'], (event) => {
        if (event.action === 'input') {
          story.value.content = event.story.content;
        }
      });
    });

    return {
      content,
      story
    };
  }
});

</script>

<style scoped>

</style>
