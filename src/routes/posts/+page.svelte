<script>
    import { onMount } from 'svelte';
    import { supabase } from '@/lib/supabase';
  
    let posts = [];
    let isLoading = true;
  
    // Загрузка данных при монтировании компонента
    onMount(async () => {
      const { data, error } = await supabase
        .from('posts')
        .select('*'); // Загружаем все данные из таблицы posts
  
      if (error) {
        console.error('Error loading posts:', error);
      } else {
        posts = data;
      }
      isLoading = false;
    });
  </script>
  
  {#if isLoading}
    <p>Loading...</p>
  {:else}
    <ul>
      {#each posts as post}
        <li>
          <h2>{post.title}</h2>
          <p>Link: {post.unique_link}</p>
        </li>
      {/each}
    </ul>
  {/if}
  