<template>
  <SfFooter v-if="content" :column="4" multiple id="footer">
    <SfFooterColumn v-for="(column, index) in data" :key="index" :title="column.heading">
      <SfList>
        <SfListItem
          v-for="(item, itemIndex) in column.items"
          :key="itemIndex"
        >
          <SfMenuItem :label="item.caption" />
        </SfListItem>
      </SfList>
    </SfFooterColumn>
  </SfFooter>
</template>

<script>
import { SfFooter, SfList, SfImage, SfMenuItem } from '@storefront-ui/vue';
import { useContent } from '@vsf-enterprise/storyblok';
import { onSSR } from '@vue-storefront/core';
import { computed } from '@vue/composition-api';

export default {
  components: {
    SfFooter,
    SfList,
    SfImage,
    SfMenuItem
  },
  setup () {
    const { search, content } = useContent('footer');
    const data = computed(() => content.value[0] && content.value[0].columns)
    onSSR(async () => {
      await search({ slug: 'footer'});
    });
    return {
      content,
      data
    }
  }
};
</script>
