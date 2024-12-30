import ImageContent from "$lib/components/ImageContent.svelte";
import TextContent from "$lib/components/TextContent.svelte";
import { contentRegistry } from "$lib/registries/ContentRegistry";

// Функция для инициализации контента
export function initializeContentTypes() {
  contentRegistry.registerContent('text', TextContent);
  contentRegistry.registerContent('image', ImageContent);
}
