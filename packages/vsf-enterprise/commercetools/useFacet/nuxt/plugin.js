import { integrationPluginFactory } from '@vue-storefront/core';
import { createApiClient } from '@vsf-enterprise/ct-faceting';

const integrationPlugin = integrationPluginFactory(createApiClient);

export default integrationPlugin(({ $vsf, integration }) => {
  integration.configure({
    ...$vsf.$ct.config,
    ...<%= serialize(options) %>
  })
});
