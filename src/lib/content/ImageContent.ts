export class ImageContent {
  type: string;
  value: string;

  constructor(value: string) {
    this.type = 'image';
    this.value = value;
  }
}
