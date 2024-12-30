
export const contentRegistry = {
  components: new Map<string, any>(),

  registerContent(type: string, component: any) {
    this.components.set(type, component);
  },

  getContentConstructor(type: string) {
    return this.components.get(type);
  },

  getAllContentTypes() {
    return Array.from(this.components.keys());
  },
};

