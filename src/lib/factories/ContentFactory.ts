import { ContentRegistry } from "$lib/registries/ContentRegistry";

interface CreateComponentOptions<TProps> {
  type: string;
  target: HTMLElement;
  props: TProps;
}

export class ComponentFactory {
  static createComponent<TProps>({
    type,
    target,
    props,
  }: CreateComponentOptions<TProps>) {
    const ContentConstructor =
      ContentRegistry.getContentConstructor<TProps>(type);

    if (!ContentConstructor) {
      throw new Error(`Component of type "${type}" is not registered.`);
    }

    return new ContentConstructor({
      target,
      props,
    });
  }
}
