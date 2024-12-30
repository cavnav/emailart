<script lang="ts">
  export let content: string; // URL изображения
</script>

<div class="image-content">
  <img src={content} alt="" />
</div>

<style>
  .image-content {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  }
</style>
