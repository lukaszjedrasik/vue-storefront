import { restClient } from './config';
import { ContentSearchParams } from './types';
import StoryblokClient from 'storyblok-js-client';
import { Logger } from '@vue-storefront/core';

export const getContent = async ({ slug }: ContentSearchParams): Promise<any> => {
  const { accessToken, cache } = restClient?.options;
  const { clear, type } = cache;
  const Storyblok = new StoryblokClient({
    accessToken,
    cache: {
      clear,
      type
    }
  });
  let response = null;
  try {
    const { data } = await Storyblok.get(`cdn/stories/${slug}`);
    response = data?.story;
  } catch (err) {
    Logger.error("Can't get data from Storyblok.")
  }
  return response;
};
