// src/lib/types/TextContent.ts
import { ContentRegistry } from '../factories/ContentRegistry';

export class TextContent {
  type: string;
  value: string;

  constructor(value: string) {
    this.type = 'text';
    this.value = value;
  }
}

// Регистрация типа контента
ContentRegistry.registerContent('text', TextContent);
