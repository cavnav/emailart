<script lang="ts">
    import ContentContainer from '$lib/components/ContentContainer.svelte';
  import { contentTypes } from './config/contentTypes';

  const handleAddContent = (type: string) => {
    console.log(`Adding content of type: ${type}`);
    // Логика для добавления контента
  };

  const dispatch = (event: string, detail?: any) => {
    if (event === 'addContent') {
      handleAddContent(detail);
    }
  };
</script>

<main>
  <h1>Media Editor</h1>
  <ContentContainer {contentTypes} {dispatch} />
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    margin: 20px;
  }

  h1 {
    color: #333;
  }
</style>
