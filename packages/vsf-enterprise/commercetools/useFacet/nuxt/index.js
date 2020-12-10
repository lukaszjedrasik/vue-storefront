const path = require('path');
const { Logger } = require('@vue-storefront/core')
const CT_MODULE_NAME = '@vue-storefront/commercetools/nuxt'

const getCommercetoolsApiConfig = (options) => {
  const moduleOptions = [...options.buildModules, ...options.modules];

  const ctModule = moduleOptions.find(m => m === CT_MODULE_NAME || m[0] === CT_MODULE_NAME)

  if (Array.isArray(ctModule)) {
    return ctModule[1]
  }

  Logger.error('[VSF][Enterprise] You have not provided either comemrcetools module (`@vue-storefront/commercetools/nuxt`) or its configuration')

  return {};
}


module.exports = function CommerceToolsFaceting(moduleOptions) {
  const ctConfiguration = getCommercetoolsApiConfig(this.options);

  this.addPlugin({
    src: path.resolve(__dirname, './plugin.js'),
    options: { ...moduleOptions, ...ctConfiguration }
  });
};

module.exports.meta = require('../package.json');

