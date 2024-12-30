<script>
  import { onMount } from 'svelte';

  let posts = [];
  let isLoading = true;

  onMount(async () => {
    const response = await fetch('/api/posts');
    const data = await response.json();
    posts = data;
    isLoading = false;
  });

  async function createPost() {
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title: 'New Post', content: 'This is a new post' }),
      headers: { 'Content-Type': 'application/json' }
    });
    const data = await response.json();
    posts.push(data[0]);
  }
</script>

{#if isLoading}
  <p>Loading...</p>
{:else}
  <ul>
    {#each posts as post}
      <li>{post.title}</li>
    {/each}
  </ul>
  <button on:click={createPost}>Create Post</button>
{/if}
