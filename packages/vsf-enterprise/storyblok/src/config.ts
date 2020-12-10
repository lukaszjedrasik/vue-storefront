import { ContentSearchParams } from './types';

let restClient = null;

const setup = ({ accessToken, cache }: ContentSearchParams) => {
  restClient = {
    options: {
      accessToken,
      cache: {
        clear: cache.clear,
        type: cache.type
      }
    }
  };
};

export {
  setup,
  restClient
};
