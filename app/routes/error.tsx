import { ConfigError } from '../pages/ConfigError'

export function meta() {
  return [
    { title: 'Configuration Error - creatorverse' },
    { name: 'description', content: 'Configuration error page for creatorverse application.' }
  ]
}

export default function ErrorRoute() {
  return <ConfigError />
}
