import type { SvelteComponent } from "svelte";

type ComponentConstructor<TProps> = new (options: {
  target: HTMLElement;
  props: TProps;
}) => SvelteComponent;

export class ContentRegistry {
  private static registry: Record<string, ComponentConstructor<any>> = {};

  static registerContent<TProps>(
    type: string,
    constructor: ComponentConstructor<TProps>
  ) {
    if (this.registry[type]) {
      console.warn(`Content type "${type}" is already registered.`);
    }
    this.registry[type] = constructor;
  }

  static getContentConstructor<TProps>(
    type: string
  ): ComponentConstructor<TProps> | null {
    return this.registry[type] || null;
  }

  static getAllContentTypes(): string[] {
    return Object.keys(this.registry);
  }

  static removeContent(type: string): void {
    if (this.registry[type]) {
      delete this.registry[type];
    } else {
      console.warn(`Content type "${type}" not found.`);
    }
  }
}
