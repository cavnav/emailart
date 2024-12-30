import { createClient } from '@supabase/supabase-js';

import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
if (!supabaseUrl) {
  throw new Error("Supabase URL is not defined in the environment variables.");
}

const supabaseKey = process.env.SUPABASE_KEY;
if (!supabaseKey) {
  throw new Error("Supabase Key is not defined in the environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
