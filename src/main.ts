import { initializeContentTypes } from './contentInit';
import App from './App.svelte';

// Инициализация типов контента
initializeContentTypes();

// Получение элемента и проверка его существования
const target = document.getElementById('app');

if (!target) {
  throw new Error('Target element with id "app" not found');
}

// Инициализация приложения
const app = new App({
  target,
});

export default app;
