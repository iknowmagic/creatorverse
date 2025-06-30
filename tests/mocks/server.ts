// tests/mocks/server.ts
import { setupServer } from 'msw/node'
import { handlers } from './handlers'

// Setup mock server with our handlers
export const server = setupServer(...handlers)
