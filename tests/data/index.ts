// tests/data/index.ts
import { readFileSync } from 'fs'
import Papa from 'papaparse'
import { join } from 'path'

// Types matching your actual schema
export interface TestCreator {
  id: number
  name: string
  description: string
  url: string
  image_url: string | null
  category: string
  created_at: string
  updated_at: string
}

export interface TestHistoryRecord {
  history_id: number
  creator_id: number
  action: 'create' | 'update' | 'delete'
  action_date: string
  // Creator data at time of action
  id: number
  name: string
  description: string
  url: string
  image_url: string | null
  category: string
  created_at: string
  updated_at: string
}

// Cache parsed data to avoid re-parsing during test runs
let creatorsCache: TestCreator[] | null = null
let historyCache: TestHistoryRecord[] | null = null

/**
 * Parse CSV file and convert to typed array
 */
function parseCSV<T>(filename: string, transformer: (row: any) => T): T[] {
  const csvPath = join(__dirname, filename)
  const csvContent = readFileSync(csvPath, 'utf-8')

  const result = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
    transform: (value, header) => {
      if (value === '' || value === 'NULL') return null
      return value
    }
  })

  if (result.errors.length > 0) {
    console.error('CSV parsing errors:', result.errors)
    throw new Error(`Failed to parse ${filename}`)
  }

  return result.data.map(transformer)
}

/**
 * Transform raw CSV row to Creator type
 */
function transformCreator(row: any): TestCreator {
  return {
    id: parseInt(row.id),
    name: row.name,
    description: row.description,
    url: row.url,
    image_url: row.image_url || null,
    category: row.category,
    created_at: row.created_at,
    updated_at: row.updated_at
  }
}

/**
 * Transform raw CSV row to HistoryRecord type
 */
function transformHistoryRecord(row: any): TestHistoryRecord {
  return {
    history_id: parseInt(row.history_id),
    creator_id: parseInt(row.creator_id),
    action: row.action as 'create' | 'update' | 'delete',
    action_date: row.action_date,
    // Creator data at time of action
    id: parseInt(row.id),
    name: row.name,
    description: row.description,
    url: row.url,
    image_url: row.image_url || null,
    category: row.category,
    created_at: row.created_at,
    updated_at: row.updated_at
  }
}

/**
 * Get all creators from CSV (cached after first load)
 */
function loadCreators(): TestCreator[] {
  if (creatorsCache === null) {
    creatorsCache = parseCSV('creators_rows.csv', transformCreator)
    console.log(`📊 Loaded ${creatorsCache.length} creators for testing`)
  }
  return creatorsCache
}

/**
 * Get all history records from CSV (cached after first load)
 */
function loadHistory(): TestHistoryRecord[] {
  if (historyCache === null) {
    historyCache = parseCSV('creator_history_rows.csv', transformHistoryRecord)
    console.log(`📊 Loaded ${historyCache.length} history records for testing`)
  }
  return historyCache
}

/**
 * Reset cache (useful for testing)
 */
export function resetTestDataCache(): void {
  creatorsCache = null
  historyCache = null
}

// ==============================================================================
// SINGLE CONSISTENT API - Everything under testData
// ==============================================================================

export const testData = {
  // Raw data access
  creators: {
    all: (): TestCreator[] => loadCreators(),
    count: (): number => loadCreators().length,
    page: (pageIndex: number, pageSize: number): TestCreator[] => {
      const start = pageIndex * pageSize
      const end = start + pageSize
      return loadCreators().slice(start, end)
    },
    byCategory: (category: string): TestCreator[] => {
      return loadCreators().filter(c => c.category === category)
    },
    withImages: (): TestCreator[] => {
      return loadCreators().filter(c => c.image_url !== null)
    },
    withoutImages: (): TestCreator[] => {
      return loadCreators().filter(c => c.image_url === null)
    },
    search: (
      term: string,
      field: keyof Pick<TestCreator, 'name' | 'description' | 'category'>
    ): TestCreator[] => {
      return loadCreators().filter(c => c[field].toLowerCase().includes(term.toLowerCase()))
    }
  },

  history: {
    all: (): TestHistoryRecord[] => loadHistory(),
    count: (): number => loadHistory().length,
    page: (pageIndex: number, pageSize: number): TestHistoryRecord[] => {
      const start = pageIndex * pageSize
      const end = start + pageSize
      return loadHistory().slice(start, end)
    },
    byAction: (action: 'create' | 'update' | 'delete'): TestHistoryRecord[] => {
      return loadHistory().filter(h => h.action === action)
    }
  },

  categories: {
    all: (): string[] => {
      const creators = loadCreators()
      return Array.from(new Set(creators.map(c => c.category))).sort()
    },
    count: (): number => {
      return testData.categories.all().length
    }
  }
}

// Backward compatibility exports (if needed)
export const testDataHelpers = testData
export const creatorsData = testData.creators.all
export const historyData = testData.history.all
export const categoriesData = testData.categories.all
