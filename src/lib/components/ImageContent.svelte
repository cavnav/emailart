<script lang="ts">
  import { onMount } from 'svelte';

  let content: string | undefined

  // Обработчик выбора изображения
  const onSelect = (event: Event) => {
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

  let fileInput: HTMLInputElement | null = null;

  // Триггер нажатия на скрытый input
  const triggerFileInput = () => {
    fileInput?.click();
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
  
  <button on:click={triggerFileInput} class="select-button">
    {#if content}
      Change Image
    {:else}
      Select Image
    {/if}
  </button>
  <input
    bind:this={fileInput}
    type="file"
    accept="image/*"
    on:change={onSelect}
    class="image-input"
  />
</div>

<style>
  .image-selector {
    display: inline-block;
    position: relative;
  }

  .select-button {
    display: inline-block;
    cursor: pointer;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #007BFF;
    color: #fff;
    font-size: 14px;
    margin-top: 10px;
    transition: background-color 0.3s ease;
  }

  .select-button:hover {
    background-color: #0056b3;
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
