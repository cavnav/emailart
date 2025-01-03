export async function createPost({title}: {title: string}): Promise<string> {
    const response = await fetch('/api/createPost', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    const data = await response.json();

    if (!response.ok) {
        console.error('createPost', data.error)
      throw new Error('Ошибка при создании поста');
    }
  
    return data.post_id; // Возвращаем ID созданного поста
  }
  