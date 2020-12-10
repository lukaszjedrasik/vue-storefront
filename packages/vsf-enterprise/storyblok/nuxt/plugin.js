import { setup } from '@vsf-enterprise/storyblok';

export default (options) => {
  setup({
    ...<%= serialize({
      ...options
    }) %>
  })
}
