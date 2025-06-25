import { createClient } from '@supabase/supabase-js'

const URL = import.meta.env.VITE_SUPABASE_URL
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!URL || !API_KEY) {
  throw new Error('Supabase URL and API key must be defined in environment variables.')
}

export interface Creator {
  id: number
  name: string
  description: string
  url: string
  image_url?: string
  category: string
  created_at: string
  updated_at: string
}

const supabase = createClient(URL, API_KEY)
export { supabase }
