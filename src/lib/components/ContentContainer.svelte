<script lang="ts">
  import { contentRegistry } from '$lib/registries/ContentRegistry';
    import { createPost } from '$lib/services/createPost';
  export let contentList: { type: string; props: { content: string }; id: number }[] = [];
  export let selectedType: string = '';
  export let contentTypes: string[] = [];

  let successMessage
  let errorMessage

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
    selectedType = newType
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

let content: HTMLElement | undefined
let actionsMenu: HTMLElement | undefined
let timeout: number | undefined

function contentHover(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  if (target.classList.contains('dots') && actionsMenu) {
    clearTimeout(timeout);
    const rect = target.getBoundingClientRect();
    actionsMenu.style.left = `${rect.right + 5}px`;
    actionsMenu.style.top = `${rect.top}px`;
    actionsMenu.style.display = 'block';
  }
}

function contentOut() {
  actionsMenuOut()
}

function actionsMenuOut() {
  clearTimeout(timeout)
  timeout = window.setTimeout(
      () => {
        if (actionsMenu) {
          actionsMenu.style.display = 'none';
        }
      }, 
      200
    ); 
}

function actionsMenuOver(): void {
  clearTimeout(timeout); // Оставляем меню видимым при наведении
}

function copyPostLink() {

}

const handleCreatePost = async () => {
    try {

      successMessage = ''
      errorMessage = ''
      const postLink = await createPost({title: `post${Math.floor(Math.random() * 100)}`});

      // Копируем ссылку в буфер обмена
      await navigator.clipboard.writeText(postLink);

      // Показываем сообщение об успехе
      successMessage = 'Ссылка скопирована в буфер обмена!';
    } catch (error) {
      errorMessage = (error as Error).message;
    }
};

</script>

<div class="content-container">
  <div class="content" 
    bind:this={content}
    on:mouseover={contentHover}
    on:mouseout={contentOut}
  >
      {#each contentList as { type, props }}
          {#if createComponent(type, props)}
          <div class="content-item">
            <svelte:component 
              this={createComponent(type, props)} 
              key={type} 
              {...props} 
            />
            <div class="dots">⋮</div>
          </div>          
          {/if}
      {/each}

      <div class="actions-menu" 
        bind:this={actionsMenu}
        on:mouseenter={actionsMenuOver}
        on:mouseleave={actionsMenuOut}
      >
        delete
      </div>
  </div>

  <label for="contentType">Select Content Type:</label>
  <select id="contentType" bind:value={selectedType} on:change={(e) => handleTypeChange(e.target.value)}>
    {#each contentTypes as type}
      <option value={type}>{type}</option>
    {/each}
  </select>

  <button on:click={addContent}>Add</button>

  <button on:click={handleCreatePost}>save</button>

  {#if successMessage}
    <div>{successMessage}</div>
  {/if}
  {#if errorMessage}
    <div>{errorMessage}</div>
  {/if}

  <button on:click={copyPostLink}>Copy post link</button>
</div>

<style>
  .content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .content-item {    
    position: relative;
    display: flex;
    flex: 2 1 auto;
    width: 80%;
  }

  .dots {
    cursor: pointer;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ccc;
    border-radius: 50%;
  }

  .actions-menu {
    position: absolute;
    display: none;
    padding: 10px;
    border: 1px solid;
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
