<script lang="ts">
  export let content: string = ""; // Текст для отображения и редактирования

  // Функция для обновления текста
  const handleInput = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    content = target.value;
  }
</script>




<div class="text-editor">
  <textarea
    bind:value={content}
    on:input={handleInput}
    placeholder="Введите текст здесь..."
  ></textarea>
</div>


<style>
  .text-editor {
    display: flex;
    width: 100%;
  }

  textarea {
    width: 100%;
    min-height: 100px;
    font-family: Arial, sans-serif;
    font-size: 16px;
    color: #333;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 10px;
    resize: vertical;
  }

  textarea:focus {
    border-color: #007bff;
    outline: none;
  }
</style>
