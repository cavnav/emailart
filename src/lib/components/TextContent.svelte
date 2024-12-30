<script lang="ts">
  export let content: string; // Текст для отображения
</script>

<div class="text-content">
  <p>{content}</p>
</div>

<style>
  .text-content {
    font-family: Arial, sans-serif;
    font-size: 16px;
    color: #333;
    margin: 10px 0;
  }
</style>
