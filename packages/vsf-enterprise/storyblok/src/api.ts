import { restClient } from './config';
import { ContentSearchParams } from './types';
import StoryblokClient from 'storyblok-js-client';

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
  const { data } = await Storyblok.get(`cdn/stories/${slug}`);
  return data?.story?.content?.body;
};
