<script>
import Vue from 'vue';
import { RenderContent } from '@vsf-enterprise/storyblok';
import Alert from './Alert';
import Hero from './Hero';
import Heading from './Heading';

export default Vue.extend({
  name: 'Render',
  components: {
    Alert,
    Hero,
    Heading
  },
  ...RenderContent
});
</script>

