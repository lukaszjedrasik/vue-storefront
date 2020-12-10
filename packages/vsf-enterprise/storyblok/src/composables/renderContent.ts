import { RenderComponent, renderContentFactory, RenderContentFactoryParams } from '@vue-storefront/core';

export const resolveComponents = (contentData: any = []): RenderComponent[] => {
  let content = contentData;
  if (!Array.isArray(contentData)) content = [content];
  return content.map(component => {
    const props = Object.keys(component)
      .reduce((res: {}, key: string) => ({
        ...res,
        [key]: component[key]
      }), {});
    return {
      componentName: component.component,
      props
    };
  });
};

export const RenderContent: {} = renderContentFactory({
  extractContent: (content: {} | []) => resolveComponents(content)
} as RenderContentFactoryParams);
