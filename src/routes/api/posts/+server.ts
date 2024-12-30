import { supabase } from '$lib/supabase';
import { json } from '@sveltejs/kit';

export async function GET() {
  const { data, error } = await supabase.from('posts').select('*');
  if (error) {
    return json({ message: 'Error fetching posts' }, { status: 500 });
  }
  return json(data, { status: 200 });
}

export async function POST({ request }) {
  const { title, content } = await request.json();
  const { data, error } = await supabase.from('posts').insert([{ title, content }]);
  if (error) {
    return json({ message: 'Error inserting post' }, { status: 500 });
  }
  return json(data, { status: 201 });
}
