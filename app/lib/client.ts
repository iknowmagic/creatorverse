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

async function getCreators(): Promise<Creator[]> {
  const { data, error } = await supabase.from('random_creators').select('*')
  if (error) {
    console.error('Error fetching creators:', error)
    throw error
  }
  return data || []
}

async function getCategories(): Promise<string[]> {
  // select distinct category names from the creators table
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('category', { ascending: true })
  if (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
  return data?.map((category: { category: string }) => category.category) || []
}

async function filterByCategory(category: string | null): Promise<Creator[]> {
  const { data, error } = await supabase
    .from('random_creators')
    .select('*')
    .eq('category', category)
  if (error) {
    console.error('Error filtering creators by category:', error)
    throw error
  }
  return data || []
}

export { filterByCategory, getCategories, getCreators, supabase }
