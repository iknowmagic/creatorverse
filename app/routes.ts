import { type RouteConfig, index, route } from '@react-router/dev/routes'

export default [
  index('routes/home.tsx'),
  route('admin', 'routes/admin.tsx'),
  route('error', 'routes/error.tsx')
] satisfies RouteConfig
