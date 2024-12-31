import type { SvelteComponent } from "svelte";

// Типизация объекта contentRegistry
export const contentRegistry = {
  components: {} as Record<string, typeof SvelteComponent>, // Тип компонентов — конструкторы Svelte

  registerContent(type: string, component: typeof SvelteComponent) {
    this.components[type] = component;
  },

  getContentConstructor(type: string): typeof SvelteComponent | undefined {
    return this.components[type];
  },

  getAllContentTypes(): string[] {
    return Object.keys(this.components);
  },
};