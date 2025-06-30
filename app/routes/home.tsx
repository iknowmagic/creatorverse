import Homepage from '../pages/homepage'

export function meta() {
  return [
    { title: 'creatorverse' },
    { name: 'description', content: 'A collection of content creators from around the world.' }
  ]
}

export default function Home() {
  return <Homepage />
}
