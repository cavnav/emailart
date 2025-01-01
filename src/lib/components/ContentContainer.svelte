<script lang="ts">
  import { contentRegistry } from '$lib/registries/ContentRegistry';
  export let contentList: { type: string; props: { content: string }; id: number }[] = [];
  export let selectedType: string = '';
  export let contentTypes: string[] = [];
  export let deleteContent: (index: number) => void;

  // Функция для создания компонента
  const createComponent = (type: string, props: any) => {
    try {
      const Component = contentRegistry.getContentConstructor(type);
      if (!Component) {
        throw new Error(`Component type "${type}" is not registered`);
      }
      return Component;
    } catch (error) {
      console.error(error instanceof Error ? error.message : "Unknown error occurred");
      return null;
    }
  };

  // Обработчик изменения типа контента
  const handleTypeChange = (newType: string) => {
    selectedType = newType; // Меняем только выбранный тип для новых элементов
  };

  // Функция для добавления нового контента
  const addContent = () => {
    if (!selectedType) {
      console.error("No selected type to add content!");
      return;
    }

    // Добавляем новый элемент с выбранным типом
    contentList = [
      ...contentList,
      {
        type: selectedType,
        props: { content: `Sample ${selectedType} content` },
        id: Date.now(), // Генерируем уникальный id для контента
      },
    ];
  };
</script>

<div>
  <h2>Content Editor</h2>

  <div class="content-list">
    {#each contentList as { type, props }, index}
      <div class="content-item">
        {#if createComponent(type, props)}
          <svelte:component this={createComponent(type, props)} key={type} {...props} />
        {/if}
        <button on:click={() => deleteContent(index)}>Delete</button>
      </div>
    {/each}
  </div>

  <label for="contentType">Select Content Type:</label>
  <select id="contentType" bind:value={selectedType} on:change={(e) => handleTypeChange(e.target.value)}>
    {#each contentTypes as type}
      <option value={type}>{type}</option>
    {/each}
  </select>

  <button on:click={addContent}>Add</button>
</div>

<style>
  .content-list {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  .content-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
  }

  button {
    margin-left: 10px;
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #007bff;
    background-color: #007bff;
    color: #fff;
    border-radius: 4px;
  }

  button:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  select {
    margin-top: 20px;
    padding: 5px;
    font-size: 14px;
  }

  label {
    margin-top: 20px;
    font-size: 16px;
    display: block;
  }
</style>
