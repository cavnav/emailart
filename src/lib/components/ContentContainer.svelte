<script lang="ts">
  import { contentRegistry } from '$lib/registries/ContentRegistry';
  export let contentList: { type: string; props: { content: string }; id: number }[] = [];
  export let selectedType: string = '';
  export let contentTypes: string[] = [];
  export let deleteContent: (index: number) => void;

  $:  console.log('contentTypes', contentTypes)
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

  $: console.log(contentTypes)
</script>

<div>
  <h2>Content Editor</h2>

  <label for="contentType">Select Content Type:</label>
  <select id="contentType" bind:value={selectedType} on:change={(e) => handleTypeChange(e.target.value)}>
    {#each contentTypes as type}
      <option value={type}>{type}</option>
    {/each}
  </select>

  <ul>
    {#each contentList as { type, props }, index}
      <li>
        {#if createComponent(type, props)}
          <svelte:component this={createComponent(type, props)} key={type} {...props} />
        {/if}
        <button on:click={() => deleteContent(index)}>Delete</button>
      </li>
    {/each}
  </ul>

  <button on:click={addContent}>Add Content</button>
</div>
