import { supabase } from '$lib/supabase';
import { json, type RequestEvent } from '@sveltejs/kit'; // Для отправки JSON-ответа

// Интерфейс для данных, получаемых из запроса
interface PostRequest {
  title: string;
}

// Интерфейс для ответа
interface PostResponse {
  post_id?: number;
  error?: string;
}

export async function POST({ request }: RequestEvent): Promise<Response> {
  try {
    // Получаем данные из запроса
    const { title }: PostRequest = await request.json();

    // Создание поста в базе данных
    const { data, error } = await supabase
      .from('posts')
      .insert({ title })
      .select('post_id')  // Возвращаем только post_id
      .single();

    if (error) {
      // Возвращаем ошибку, если вставка не удалась
      return json({ error: `Ошибка создания поста: ${error.message}` }, { status: 400 });
    }

    // Возвращаем только post_id
    const response: PostResponse = { post_id: data.post_id };
    return json(response);
  } catch (err: unknown) {
        if (err instanceof Error) {
            // Возвращаем ошибку, если произошла ошибка сервера
            return json({ error: `Не удалось создать пост: ${err.message}` }, { status: 500 });
        }
        // Если err не является экземпляром Error, возвращаем общий ответ
        return json({ error: 'Неизвестная ошибка' }, { status: 500 });
  }
}
