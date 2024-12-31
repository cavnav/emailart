<script lang="ts">
  import { onMount } from 'svelte';
  import ContentContainer from '$lib/components/ContentContainer.svelte';
  import { initializeContentTypes } from '../contentInit';
  import { contentRegistry } from '$lib/registries/ContentRegistry';

  // Тип контента, выбранный пользователем
  let selectedType: string = ''; // Пустое значение по умолчанию
  let contentTypes: string[] = []
  // Список контента
  let contentList: { type: string; props: { content: string }; id: number }[] = [];


  // Инициализация типов контента
  onMount(() => {
    initializeContentTypes();
    contentTypes = contentRegistry.getAllContentTypes(); 
    console.log(contentTypes); // Проверка, что данные есть

    // Устанавливаем первый тип по умолчанию, если типы существуют
    if (contentTypes.length > 0) {
      selectedType = contentTypes[0] // Устанавливаем первый тип по умолчанию
    } else {
      console.error("No content types available!");
    }
  });

  // Функция для добавления контента
  const addContent = (type: string) => {
    if (!type) {
      console.error("No selected type to add content!");
      return;
    }

    contentList = [
      ...contentList,
      {
        type,
        props: { content: `Sample ${type} content` },
        id: Date.now(), // Генерируем уникальный id для контента
      },
    ];
  };

  // Функция для удаления контента по индексу
  const deleteContent = (index: number) => {
    contentList = contentList.filter((_, i) => i !== index); // Удаляем элемент по индексу
  };

  // Функция для удаления всего контента
  const deleteAllContent = () => {
    contentList = [];
  };
</script>

<main>
  <h1>Media Editor</h1>

  <!-- Компонент ContentContainer -->
  <ContentContainer {contentList} {selectedType} {contentTypes} {deleteContent} />

  <!-- Кнопка добавления контента -->
  <button on:click={() => addContent(selectedType)}>Add</button>

  <!-- Кнопка удаления всего контента -->
  <button on:click={deleteAllContent}>Delete All Content</button>
</main>



<style>
  main {
    font-family: Arial, sans-serif;
    margin: 20px;
  }

  h1 {
    color: #333;
  }

  button {
    margin-left: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }
</style>
