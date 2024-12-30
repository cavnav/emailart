<script lang="ts">
    import { ContentFactory } from "../types/ContentFactory";
    import { ContentRegistry } from "../types/ContentRegistry";


  // Массив контента
  let contentList: any[] = [];

  // Тип контента, выбранный пользователем
  let selectedType: string = Object.keys(ContentRegistry)[0]; // по умолчанию первый тип

  // Функция для добавления контента
  const addContent = (type: string) => {
    const content = ContentFactory.createContent(type, `Sample ${type} content`);
    if (content) {
      contentList.push(content);
    }
  };

  // Функция для удаления контента
  const deleteContent = (index: number) => {
    contentList.splice(index, 1);
  };

  // Доступные типы контента
  const contentTypes = Object.keys(contentList);
</script>

<div>
  <!-- Выбор типа контента -->
  <label for="contentType">Select Content Type:</label>
  <select id="contentType" bind:value={selectedType}>
    {#each contentTypes as type}
      <option value={type}>{type}</option>
    {/each}
  </select>

  <!-- Кнопка добавления контента -->
  <button on:click={() => addContent(selectedType)}>Add Content</button>

  <!-- Список контента -->
  <ul>
    {#each contentList as content, index}
      <li>
        {content.value}
        <!-- Кнопка удаления контента -->
        <button on:click={() => deleteContent(index)}>Delete</button>
      </li>
    {/each}
  </ul>
</div>

<style>
  button {
    margin-left: 10px;
    padding: 5px 10px;
    cursor: pointer;
  }

  select {
    margin-right: 10px;
  }

  li {
    margin-bottom: 10px;
  }
</style>
