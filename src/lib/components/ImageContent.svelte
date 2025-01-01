<script lang="ts">
  import { onMount } from 'svelte';

  export let content: string | null = null; // URL изображения

  // Обработчик выбора изображения
  const handleImageSelect = (event: Event) => {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const imageUrl = URL.createObjectURL(file);
      content = imageUrl;
    }
  };

  // Обработчик вставки изображения из буфера обмена
  const handlePaste = (event: ClipboardEvent) => {
    const clipboardItems = event.clipboardData?.items;
    if (clipboardItems) {
      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) {
            const imageUrl = URL.createObjectURL(file);
            content = imageUrl;
          }
        }
      }
    }
  };

  onMount(() => {
    // Добавляем слушатель на событие вставки при монтировании компонента
    window.addEventListener('paste', handlePaste);

    // Убираем слушатель при размонтировании компонента
    return () => {
      window.removeEventListener('paste', handlePaste);
    };
  });
</script>

<div class="image-selector">
  {#if content}
    <img src={content} alt="Selected image" class="image" />
  {:else}
    <span>Choose or paste an image</span>
  {/if}
  
  <label for="imageInput" class="image-label">
    {#if !content}
      Select Image
    {/if}
  </label>
  <input
    id="imageInput"
    type="file"
    accept="image/*"
    on:change={handleImageSelect}
    class="image-input"
  />
</div>

<style>
  .image-selector {
    display: inline-block;
    position: relative;
  }

  .image-label {
    display: inline-block;
    cursor: pointer;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    margin-top: 10px;
  }

  .image-input {
    display: none;
  }

  .image {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    margin-top: 10px;
  }
</style>
