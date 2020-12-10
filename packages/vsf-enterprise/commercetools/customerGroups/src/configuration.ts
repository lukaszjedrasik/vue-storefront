/* istanbul ignore file */
import { apiClientFactory } from '@vue-storefront/core';
import { getSettings as getDefaultSettings, Config, ConfigurableConfig } from '@vue-storefront/commercetools-api';

const onSetup = (config: Config) => {};

const { setup, update, getSettings } = apiClientFactory<Config, ConfigurableConfig>({
  onSetup,
  defaultSettings: { ...getDefaultSettings() }
});

export { setup, update, getSettings }
