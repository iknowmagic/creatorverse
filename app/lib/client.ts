import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_PUBLIC_SUPABASE_URL
const API_KEY = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY

if (!URL || !API_KEY) {
  throw new Error('Supabase URL and API key must be defined in environment variables.')
}

const supabase = createClient(URL, API_KEY)
export { supabase }
