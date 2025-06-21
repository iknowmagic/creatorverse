export interface Creator {
  id: number
  name: string
  description: string
  imageURL: string
  url: string
  category: string
  followers?: string
}

export const creators: Creator[] = [
  {
    id: 1,
    name: 'PewDiePie',
    description: 'Gaming content creator and entertainer with millions of subscribers worldwide.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@pewdiepie',
    category: 'Streaming & Gaming',
    followers: '111M'
  },
  {
    id: 2,
    name: 'Khan Academy',
    description: 'Free educational content covering math, science, programming, and more.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://khanacademy.org',
    category: 'Educational Content',
    followers: '7.2M'
  },
  {
    id: 3,
    name: 'Kurzgesagt',
    description: 'Animated educational videos about science, technology, and philosophy.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@kurzgesagt',
    category: 'Educational Content',
    followers: '20.1M'
  },
  {
    id: 4,
    name: 'Dribbble',
    description: 'Platform showcasing creative work from designers around the world.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://dribbble.com',
    category: 'Art & Design',
    followers: '2.8M'
  },
  {
    id: 5,
    name: 'Fireship',
    description: 'Fast-paced coding tutorials and web development content.',
    imageURL:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@fireship',
    category: 'Tech & Coding',
    followers: '2.9M'
  },
  {
    id: 6,
    name: 'MrBeast',
    description: 'Viral content creator known for elaborate challenges and philanthropy.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@mrbeast',
    category: 'Lifestyle & Entertainment',
    followers: '212M'
  },
  {
    id: 7,
    name: 'The Try Guys',
    description: 'Comedy group creating entertaining lifestyle and challenge content.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@tryguys',
    category: 'Lifestyle & Entertainment',
    followers: '7.8M'
  },
  {
    id: 8,
    name: 'Pokimane',
    description: 'Popular gaming streamer and content creator on Twitch and YouTube.',
    imageURL:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    url: 'https://twitch.tv/pokimane',
    category: 'Streaming & Gaming',
    followers: '9.3M'
  }
]
