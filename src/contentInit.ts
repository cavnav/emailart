import ImageContent from "$lib/components/ImageContent.svelte";
import TextContent from "$lib/components/TextContent.svelte";
import { ContentRegistry } from "$lib/registries/ContentRegistry";

// Функция для инициализации контента
export function initializeContentTypes() {
  ContentRegistry.registerContent('text', TextContent);
  ContentRegistry.registerContent('image', ImageContent);
}
