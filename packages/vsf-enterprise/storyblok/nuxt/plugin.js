import { setup } from '@vsf-enterprise/storyblok';

const options = <%= serialize(options) %>;

export default () => {
  setup(options);
}
