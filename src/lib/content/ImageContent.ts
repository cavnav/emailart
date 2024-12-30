import { ContentRegistry } from '../factories/ContentRegistry';

export class ImageContent {
  type: string;
  value: string;

  constructor(value: string) {
    this.type = 'image';
    this.value = value;
  }
}

// Регистрация типа контента
ContentRegistry.registerContent('image', ImageContent);
