import { contentRegistry } from "$lib/registries/ContentRegistry";

export class ComponentFactory {
  static createComponent({
    type,
    target,
    props,
  }: {
    type: string;
    target: HTMLElement;
    props: Record<string, any>; // Можно уточнить тип, если известен формат данных
  }): HTMLElement {
    // Получаем конструктор компонента
    const Component = contentRegistry.getContentConstructor(type);
    
    if (!Component) {
      throw new Error(`Component type "${type}" is not registered`);
    }

    // Создаем новый экземпляр компонента
    new Component({
      target,
      props,
    });

    // Возвращаем контейнер с компонентом
    return target;
  }
}
