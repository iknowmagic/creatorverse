// Type definitions for categories and tags
export type ContainerCategory =
  | 'Streaming & Gaming'
  | 'Educational Content'
  | 'Tech & Coding'
  | 'Art & Design'
  | 'Lifestyle & Entertainment'

export type CreatorTag =
  | 'Streaming & Gaming'
  | 'Educational Content'
  | 'Tech & Coding'
  | 'Art & Design'
  | 'Lifestyle & Entertainment'
  | 'Music & Entertainment'
  | 'Fitness & Health'
  | 'Food & Cooking'
  | 'Travel & Adventure'
  | 'Business & Finance'
  | 'Comedy & Entertainment'
  | 'DIY & Crafts'
  | 'Sports & Fitness'
  | 'News & Politics'
  | 'Science & Nature'
  | 'Beauty & Fashion'

export interface Creator {
  id: number
  name: string
  description: string
  imageURL: string
  url: string
  category: ContainerCategory // Container category (5 main ones)
  tag: CreatorTag // Specific tag (original categories)
  followers?: string
}

export const creators: Creator[] = [
  // Streaming & Gaming
  {
    id: 1,
    name: 'PewDiePie',
    description: 'Gaming content creator and entertainer with millions of subscribers worldwide.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@pewdiepie',
    category: 'Streaming & Gaming',
    tag: 'Streaming & Gaming',
    followers: '111M'
  },
  {
    id: 2,
    name: 'Pokimane',
    description: 'Popular gaming streamer and content creator on Twitch and YouTube.',
    imageURL:
      'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    url: 'https://twitch.tv/pokimane',
    category: 'Streaming & Gaming',
    tag: 'Streaming & Gaming',
    followers: '9.3M'
  },
  {
    id: 3,
    name: 'Ninja',
    description: 'Professional gamer and streamer known for Fortnite content.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://twitch.tv/ninja',
    category: 'Streaming & Gaming',
    tag: 'Streaming & Gaming',
    followers: '18.5M'
  },
  {
    id: 4,
    name: 'Markiplier',
    description: 'Gaming YouTuber known for horror games and charity work.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@markiplier',
    category: 'Streaming & Gaming',
    tag: 'Streaming & Gaming',
    followers: '35.7M'
  },
  {
    id: 5,
    name: 'Shroud',
    description: 'Former professional CS:GO player turned variety streamer.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://twitch.tv/shroud',
    category: 'Streaming & Gaming',
    tag: 'Streaming & Gaming',
    followers: '10.2M'
  },
  {
    id: 6,
    name: 'Jacksepticeye',
    description: 'Irish gaming YouTuber known for energetic commentary.',
    imageURL:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@jacksepticeye',
    category: 'Streaming & Gaming',
    tag: 'Streaming & Gaming',
    followers: '29.8M'
  },
  {
    id: 7,
    name: 'xQc',
    description: 'Former Overwatch pro player and variety Twitch streamer.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://twitch.tv/xqc',
    category: 'Streaming & Gaming',
    tag: 'Streaming & Gaming',
    followers: '12.1M'
  },
  {
    id: 8,
    name: 'Valkyrae',
    description: 'Gaming content creator and co-owner of 100 Thieves.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@valkyrae',
    category: 'Streaming & Gaming',
    tag: 'Streaming & Gaming',
    followers: '4.1M'
  },
  {
    id: 9,
    name: 'Dream',
    description: 'Minecraft content creator known for speedruns and challenges.',
    imageURL:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@dream',
    category: 'Streaming & Gaming',
    tag: 'Streaming & Gaming',
    followers: '30.9M'
  },
  {
    id: 10,
    name: 'TommyInnit',
    description: 'British Minecraft YouTuber and member of Dream SMP.',
    imageURL:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@tommyinnit',
    category: 'Streaming & Gaming',
    tag: 'Streaming & Gaming',
    followers: '14.9M'
  },

  // Educational Content
  {
    id: 11,
    name: 'Khan Academy',
    description: 'Free educational content covering math, science, programming, and more.',
    imageURL:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400&h=400&fit=crop&crop=face',
    url: 'https://khanacademy.org',
    category: 'Educational Content',
    tag: 'Educational Content',
    followers: '7.2M'
  },
  {
    id: 12,
    name: 'Kurzgesagt',
    description: 'Animated educational videos about science, technology, and philosophy.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@kurzgesagt',
    category: 'Educational Content',
    tag: 'Educational Content',
    followers: '20.1M'
  },
  {
    id: 13,
    name: 'Crash Course',
    description: 'Educational content covering history, science, literature, and more.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@crashcourse',
    category: 'Educational Content',
    tag: 'Educational Content',
    followers: '14.8M'
  },
  {
    id: 14,
    name: 'Veritasium',
    description: 'Science education channel with fascinating experiments and explanations.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@veritasium',
    category: 'Educational Content',
    tag: 'Science & Nature',
    followers: '13.4M'
  },
  {
    id: 15,
    name: 'TED-Ed',
    description: 'Animated educational videos on a wide range of topics.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@teded',
    category: 'Educational Content',
    tag: 'Educational Content',
    followers: '18.7M'
  },
  {
    id: 16,
    name: 'SciShow',
    description: 'Science education and news from Hank Green and team.',
    imageURL:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@scishow',
    category: 'Educational Content',
    tag: 'Science & Nature',
    followers: '7.2M'
  },
  {
    id: 17,
    name: 'MinutePhysics',
    description: 'Physics concepts explained in simple, animated videos.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@minutephysics',
    category: 'Educational Content',
    tag: 'Science & Nature',
    followers: '5.1M'
  },
  {
    id: 18,
    name: 'CGP Grey',
    description: 'Educational videos on politics, geography, economics, and more.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@cgpgrey',
    category: 'Educational Content',
    tag: 'Educational Content',
    followers: '5.3M'
  },
  {
    id: 19,
    name: 'AsapSCIENCE',
    description: 'Science topics explained through fun animations and experiments.',
    imageURL:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@asapscience',
    category: 'Educational Content',
    tag: 'Science & Nature',
    followers: '10.1M'
  },
  {
    id: 20,
    name: '3Blue1Brown',
    description: 'Mathematical concepts visualized through beautiful animations.',
    imageURL:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@3blue1brown',
    category: 'Educational Content',
    tag: 'Science & Nature',
    followers: '5.8M'
  },

  // Tech & Coding
  {
    id: 21,
    name: 'Fireship',
    description: 'Fast-paced coding tutorials and web development content.',
    imageURL:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@fireship',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '2.9M'
  },
  {
    id: 22,
    name: 'Programming with Mosh',
    description: 'Comprehensive programming tutorials and courses.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@programmingwithmosh',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '3.1M'
  },
  {
    id: 23,
    name: 'The Net Ninja',
    description: 'Web development tutorials covering modern frameworks and tools.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@netninja',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '1.2M'
  },
  {
    id: 24,
    name: 'Traversy Media',
    description: 'Web development and programming tutorials for all skill levels.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@traversymedia',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '2.1M'
  },
  {
    id: 25,
    name: 'freeCodeCamp',
    description: 'Free coding bootcamp with comprehensive programming courses.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@freecodecamp',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '8.7M'
  },
  {
    id: 26,
    name: 'Linus Tech Tips',
    description: 'Technology reviews, build guides, and tech news.',
    imageURL:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@linustechtips',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '15.4M'
  },
  {
    id: 27,
    name: 'CS Dojo',
    description: 'Programming tutorials and career advice for developers.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@csdojo',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '1.9M'
  },
  {
    id: 28,
    name: 'TechLead',
    description: 'Programming career advice and software engineering insights.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@techlead',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '1.1M'
  },
  {
    id: 29,
    name: 'Marques Brownlee',
    description: 'Technology reviews and analysis of the latest gadgets.',
    imageURL:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@mkbhd',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '17.8M'
  },
  {
    id: 30,
    name: 'Ben Awad',
    description: 'Full-stack web development tutorials and live coding.',
    imageURL:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@benawad',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '450K'
  },

  // Art & Design
  {
    id: 31,
    name: 'Dribbble',
    description: 'Platform showcasing creative work from designers around the world.',
    imageURL:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400&h=400&fit=crop&crop=face',
    url: 'https://dribbble.com',
    category: 'Art & Design',
    tag: 'Art & Design',
    followers: '2.8M'
  },
  {
    id: 32,
    name: 'Peter McKinnon',
    description: 'Photography and video editing tutorials and inspiration.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@petermckinnon',
    category: 'Art & Design',
    tag: 'Art & Design',
    followers: '5.2M'
  },
  {
    id: 33,
    name: 'Proko',
    description: 'Art instruction and drawing tutorials for all skill levels.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@proko',
    category: 'Art & Design',
    tag: 'Art & Design',
    followers: '2.7M'
  },
  {
    id: 34,
    name: 'Adobe Creative Cloud',
    description: 'Official tutorials for Photoshop, Illustrator, and other Creative Suite apps.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@adobecreativecloud',
    category: 'Art & Design',
    tag: 'Art & Design',
    followers: '1.8M'
  },
  {
    id: 35,
    name: 'The Art Assignment',
    description: 'Contemporary art exploration and creative challenges.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@theartassignment',
    category: 'Art & Design',
    tag: 'Art & Design',
    followers: '650K'
  },
  {
    id: 36,
    name: 'Draw with Jazza',
    description: 'Art tutorials, challenges, and creative content.',
    imageURL:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@drawwithjazza',
    category: 'Art & Design',
    tag: 'Art & Design',
    followers: '5.8M'
  },
  {
    id: 37,
    name: 'Feng Zhu Design',
    description: 'Concept art and digital painting tutorials.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@fengzhudesign',
    category: 'Art & Design',
    tag: 'Art & Design',
    followers: '890K'
  },
  {
    id: 38,
    name: 'The Futur',
    description: 'Design business education and creative entrepreneurship.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@thefutur',
    category: 'Art & Design',
    tag: 'Art & Design',
    followers: '1.4M'
  },
  {
    id: 39,
    name: 'Blender Guru',
    description: '3D modeling and animation tutorials using Blender.',
    imageURL:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@blenderguru',
    category: 'Art & Design',
    tag: 'Art & Design',
    followers: '2.1M'
  },
  {
    id: 40,
    name: 'Aaron Blaise',
    description: 'Animation and digital art tutorials from Disney veteran.',
    imageURL:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@aaronblaise',
    category: 'Art & Design',
    tag: 'Art & Design',
    followers: '1.3M'
  },

  // Lifestyle & Entertainment
  {
    id: 41,
    name: 'MrBeast',
    description: 'Viral content creator known for elaborate challenges and philanthropy.',
    imageURL:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@mrbeast',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '212M'
  },
  {
    id: 42,
    name: 'The Try Guys',
    description: 'Comedy group creating entertaining lifestyle and challenge content.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@tryguys',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '7.8M'
  },
  {
    id: 43,
    name: 'Emma Chamberlain',
    description: 'Lifestyle vlogger and coffee entrepreneur.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@emmachamberlain',
    category: 'Lifestyle & Entertainment',
    tag: 'Lifestyle & Entertainment',
    followers: '11.9M'
  },
  {
    id: 44,
    name: 'David Dobrik',
    description: 'Comedy vlogger known for his vlogs and pranks.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@daviddobrik',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '18.2M'
  },
  {
    id: 45,
    name: 'James Charles',
    description: 'Beauty guru and makeup artist with millions of followers.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@jamescharles',
    category: 'Lifestyle & Entertainment',
    tag: 'Beauty & Fashion',
    followers: '23.5M'
  },
  {
    id: 46,
    name: 'Good Mythical Morning',
    description: 'Daily talk show with Rhett and Link featuring comedy and food.',
    imageURL:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@goodmythicalmorning',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '17.9M'
  },
  {
    id: 47,
    name: 'Dude Perfect',
    description: 'Sports entertainment group known for trick shots and challenges.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@dudeperfect',
    category: 'Lifestyle & Entertainment',
    tag: 'Sports & Fitness',
    followers: '59.3M'
  },
  {
    id: 48,
    name: 'Michelle Schroeder-Gardner',
    description: 'Personal finance expert and lifestyle blogger.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://makingsenseofcents.com',
    category: 'Educational Content',
    tag: 'Business & Finance',
    followers: '1.2M'
  },
  {
    id: 49,
    name: 'Safiya Nygaard',
    description: 'Beauty and lifestyle content creator with unique experiments.',
    imageURL:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@safiya',
    category: 'Lifestyle & Entertainment',
    tag: 'Beauty & Fashion',
    followers: '9.7M'
  },
  {
    id: 50,
    name: 'Shane Dawson',
    description: 'YouTuber known for conspiracy theories and documentary-style content.',
    imageURL:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@shanedawson',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '19.6M'
  },

  // Music & Entertainment (maps to Lifestyle & Entertainment)
  {
    id: 51,
    name: 'T-Series',
    description: 'Indian music and film production company.',
    imageURL:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@tseries',
    category: 'Lifestyle & Entertainment',
    tag: 'Music & Entertainment',
    followers: '245M'
  },
  {
    id: 52,
    name: 'Justin Bieber',
    description: 'Global pop superstar and recording artist.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@justinbieber',
    category: 'Lifestyle & Entertainment',
    tag: 'Music & Entertainment',
    followers: '71.6M'
  },
  {
    id: 53,
    name: 'Taylor Swift',
    description: 'Grammy-winning singer-songwriter and global music icon.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@taylorswift',
    category: 'Lifestyle & Entertainment',
    tag: 'Music & Entertainment',
    followers: '51.2M'
  },
  {
    id: 54,
    name: 'BTS',
    description: 'South Korean boy band and global K-pop phenomenon.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@bts',
    category: 'Lifestyle & Entertainment',
    tag: 'Music & Entertainment',
    followers: '73.8M'
  },
  {
    id: 55,
    name: 'Ariana Grande',
    description: 'Pop and R&B singer with multiple Grammy awards.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@arianagrande',
    category: 'Lifestyle & Entertainment',
    tag: 'Music & Entertainment',
    followers: '52.1M'
  },

  // Fitness & Health (maps to Lifestyle & Entertainment)
  {
    id: 56,
    name: 'Yoga with Adriene',
    description: 'Free yoga classes and wellness content for all levels.',
    imageURL:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@yogawithadriene',
    category: 'Lifestyle & Entertainment',
    tag: 'Fitness & Health',
    followers: '12.1M'
  },
  {
    id: 57,
    name: 'Athlean-X',
    description: 'Science-based fitness and workout programs.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@athleanx',
    category: 'Lifestyle & Entertainment',
    tag: 'Fitness & Health',
    followers: '13.6M'
  },
  {
    id: 58,
    name: 'Calisthenic Movement',
    description: 'Bodyweight training and calisthenics tutorials.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@calisthenicmovement',
    category: 'Lifestyle & Entertainment',
    tag: 'Fitness & Health',
    followers: '1.8M'
  },
  {
    id: 59,
    name: 'FitnessBlender',
    description: 'Home workout videos and fitness programs.',
    imageURL:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@fitnessblender',
    category: 'Lifestyle & Entertainment',
    tag: 'Fitness & Health',
    followers: '6.8M'
  },
  {
    id: 60,
    name: 'Blogilates',
    description: 'Pilates workouts and healthy lifestyle content.',
    imageURL:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@blogilates',
    category: 'Lifestyle & Entertainment',
    tag: 'Fitness & Health',
    followers: '5.6M'
  },

  // Food & Cooking (maps to Lifestyle & Entertainment)
  {
    id: 61,
    name: 'Bon Appétit',
    description: 'Professional cooking tutorials and food culture content.',
    imageURL:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@bonappetit',
    category: 'Lifestyle & Entertainment',
    tag: 'Food & Cooking',
    followers: '6.2M'
  },
  {
    id: 62,
    name: 'Binging with Babish',
    description: 'Recreating foods from movies, TV shows, and pop culture.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@bingingwithbabish',
    category: 'Lifestyle & Entertainment',
    tag: 'Food & Cooking',
    followers: '10.8M'
  },
  {
    id: 63,
    name: 'Gordon Ramsay',
    description: 'Celebrity chef with cooking tutorials and restaurant content.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@gordonramsay',
    category: 'Lifestyle & Entertainment',
    tag: 'Food & Cooking',
    followers: '20.3M'
  },
  {
    id: 64,
    name: 'Tasty',
    description: 'Quick and easy recipe videos and cooking hacks.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@buzzfeedtasty',
    category: 'Lifestyle & Entertainment',
    tag: 'Food & Cooking',
    followers: '21.4M'
  },
  {
    id: 65,
    name: 'Claire Saffitz',
    description: 'Baking tutorials and gourmet food recreations.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@clairesaffitz',
    category: 'Lifestyle & Entertainment',
    tag: 'Food & Cooking',
    followers: '1.2M'
  },

  // Travel & Adventure (maps to Lifestyle & Entertainment)
  {
    id: 66,
    name: 'Mark Wiens',
    description: 'Food and travel adventures around the world.',
    imageURL:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@markwiens',
    category: 'Lifestyle & Entertainment',
    tag: 'Travel & Adventure',
    followers: '9.1M'
  },
  {
    id: 67,
    name: 'Drew Binsky',
    description: 'Travel content creator visiting every country in the world.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@drewbinsky',
    category: 'Lifestyle & Entertainment',
    tag: 'Travel & Adventure',
    followers: '4.7M'
  },
  {
    id: 68,
    name: 'Kara and Nate',
    description: 'Couple documenting their travels to 100 countries.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@karaandnate',
    category: 'Lifestyle & Entertainment',
    tag: 'Travel & Adventure',
    followers: '3.2M'
  },
  {
    id: 69,
    name: 'FunForLouis',
    description: 'Daily travel vlogs and adventure content.',
    imageURL:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@funforlouis',
    category: 'Lifestyle & Entertainment',
    tag: 'Travel & Adventure',
    followers: '1.9M'
  },
  {
    id: 70,
    name: 'Hey Nadine',
    description: 'Solo female travel content and destination guides.',
    imageURL:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@heynadine',
    category: 'Lifestyle & Entertainment',
    tag: 'Travel & Adventure',
    followers: '800K'
  },

  // Business & Finance (maps to Educational Content)
  {
    id: 71,
    name: 'Graham Stephan',
    description: 'Real estate investing and personal finance advice.',
    imageURL:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@grahamstephan',
    category: 'Educational Content',
    tag: 'Business & Finance',
    followers: '4.1M'
  },
  {
    id: 72,
    name: 'Dave Ramsey',
    description: 'Financial advice and debt-free living strategies.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@daveramsey',
    category: 'Educational Content',
    tag: 'Business & Finance',
    followers: '2.8M'
  },
  {
    id: 73,
    name: 'Gary Vaynerchuk',
    description: 'Entrepreneur and business marketing expert.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@garyvee',
    category: 'Educational Content',
    tag: 'Business & Finance',
    followers: '3.4M'
  },
  {
    id: 74,
    name: 'Andrei Jikh',
    description: 'Stock market investing and financial education.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@andreijikh',
    category: 'Educational Content',
    tag: 'Business & Finance',
    followers: '1.9M'
  },
  {
    id: 75,
    name: 'Meet Kevin',
    description: 'Real estate and stock market investment strategies.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@meetkevin',
    category: 'Educational Content',
    tag: 'Business & Finance',
    followers: '1.7M'
  },

  // Comedy & Entertainment (maps to Lifestyle & Entertainment)
  {
    id: 76,
    name: 'Ryan Higa',
    description: 'Comedy sketches and parody videos.',
    imageURL:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@ryanhiga',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '21.1M'
  },
  {
    id: 77,
    name: 'CollegeHumor',
    description: 'Comedy sketches and funny content.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@collegehumor',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '14.7M'
  },
  {
    id: 78,
    name: 'Key & Peele',
    description: 'Comedy duo with hilarious sketches and characters.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@keyandpeele',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '9.8M'
  },
  {
    id: 79,
    name: 'Saturday Night Live',
    description: 'Official SNL channel with sketches and highlights.',
    imageURL:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@snl',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '13.2M'
  },
  {
    id: 80,
    name: 'Smosh',
    description: 'Comedy sketches, gaming, and entertainment content.',
    imageURL:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@smosh',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '25.8M'
  },

  // DIY & Crafts (maps to Art & Design)
  {
    id: 81,
    name: '5-Minute Crafts',
    description: 'Quick DIY projects and life hacks.',
    imageURL:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@5minutecrafts',
    category: 'Art & Design',
    tag: 'DIY & Crafts',
    followers: '80.1M'
  },
  {
    id: 82,
    name: 'Steve Ramsey',
    description: 'Woodworking projects and tutorials for beginners.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@steveandramsey',
    category: 'Art & Design',
    tag: 'DIY & Crafts',
    followers: '2.1M'
  },
  {
    id: 83,
    name: 'DIY Perks',
    description: 'Electronic DIY projects and modifications.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@diyperks',
    category: 'Art & Design',
    tag: 'DIY & Crafts',
    followers: '4.2M'
  },
  {
    id: 84,
    name: 'Moriah Elizabeth',
    description: 'Craft tutorials and squishy makeovers.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@moriahelizabeth',
    category: 'Art & Design',
    tag: 'DIY & Crafts',
    followers: '9.3M'
  },
  {
    id: 85,
    name: 'ZHC',
    description: 'Custom art and craft transformations.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@zhc',
    category: 'Art & Design',
    tag: 'DIY & Crafts',
    followers: '24.6M'
  },

  // Sports & Fitness content
  {
    id: 87,
    name: 'Overtime',
    description: 'Basketball content and athlete spotlights.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@overtime',
    category: 'Lifestyle & Entertainment',
    tag: 'Sports & Fitness',
    followers: '7.8M'
  },
  {
    id: 88,
    name: 'F2 Freestylers',
    description: 'Football freestyle skills and soccer content.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@f2freestylers',
    category: 'Lifestyle & Entertainment',
    tag: 'Sports & Fitness',
    followers: '13.1M'
  },
  {
    id: 89,
    name: 'All Gas No Brakes',
    description: 'Sports journalism and cultural commentary.',
    imageURL:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@allgasnobrakes',
    category: 'Educational Content',
    tag: 'News & Politics',
    followers: '1.2M'
  },
  {
    id: 90,
    name: 'Yes Theory',
    description: 'Adventure challenges and pushing comfort zones.',
    imageURL:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@yestheory',
    category: 'Lifestyle & Entertainment',
    tag: 'Travel & Adventure',
    followers: '8.1M'
  },

  // News & Politics (maps to Educational Content)
  {
    id: 91,
    name: 'Philip DeFranco',
    description: 'News commentary and current events discussion.',
    imageURL:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@philipdefranco',
    category: 'Educational Content',
    tag: 'News & Politics',
    followers: '6.4M'
  },
  {
    id: 92,
    name: 'Vox',
    description: 'Explanatory journalism and news analysis.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@vox',
    category: 'Educational Content',
    tag: 'News & Politics',
    followers: '10.8M'
  },
  {
    id: 93,
    name: 'Last Week Tonight',
    description: 'Comedy news show with John Oliver.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@lastweektonight',
    category: 'Educational Content',
    tag: 'News & Politics',
    followers: '9.2M'
  },
  {
    id: 94,
    name: 'The Daily Show',
    description: 'Comedy central news satire and political commentary.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@thedailyshow',
    category: 'Educational Content',
    tag: 'News & Politics',
    followers: '8.7M'
  },
  {
    id: 95,
    name: 'BBC News',
    description: 'International news coverage and reporting.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@bbcnews',
    category: 'Educational Content',
    tag: 'News & Politics',
    followers: '16.3M'
  },

  // Science & Nature (maps to Educational Content)
  {
    id: 96,
    name: 'National Geographic',
    description: 'Nature documentaries and wildlife content.',
    imageURL:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@nationalgeographic',
    category: 'Educational Content',
    tag: 'Science & Nature',
    followers: '22.4M'
  },
  {
    id: 97,
    name: 'SmarterEveryDay',
    description: 'Science experiments and engineering explanations.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@smartereveryday',
    category: 'Educational Content',
    tag: 'Science & Nature',
    followers: '11.1M'
  },
  {
    id: 98,
    name: 'The Brain Scoop',
    description: 'Natural history and museum science content.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@thebrainscoop',
    category: 'Educational Content',
    tag: 'Science & Nature',
    followers: '650K'
  },
  {
    id: 99,
    name: 'Deep Look',
    description: 'Ultra-close-up videos of tiny worlds and creatures.',
    imageURL:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@deeplook',
    category: 'Educational Content',
    tag: 'Science & Nature',
    followers: '2.1M'
  },
  {
    id: 100,
    name: "It's Okay to be Smart",
    description: 'Science education with a focus on curiosity and wonder.',
    imageURL:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@itsokaytobesmart',
    category: 'Educational Content',
    tag: 'Science & Nature',
    followers: '1.8M'
  },

  // Additional creators
  {
    id: 101,
    name: 'Corridor Crew',
    description: 'VFX artists react and break down movie effects.',
    imageURL:
      'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@corridorcrew',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '6.8M'
  },
  {
    id: 102,
    name: 'Primitive Technology',
    description: 'Building tools and shelters using only natural materials.',
    imageURL:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@primitivetechnology',
    category: 'Art & Design',
    tag: 'DIY & Crafts',
    followers: '10.4M'
  },
  {
    id: 103,
    name: 'Cody Ko',
    description: 'Comedy commentary and reaction videos.',
    imageURL:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@codyko',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '5.9M'
  },
  {
    id: 104,
    name: 'Danny Gonzalez',
    description: 'Comedy content and commentary on internet culture.',
    imageURL:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@dannygonzalez',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '6.2M'
  },
  {
    id: 105,
    name: 'Casually Explained',
    description: 'Animated comedy videos explaining various topics.',
    imageURL:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@casuallyexplained',
    category: 'Lifestyle & Entertainment',
    tag: 'Comedy & Entertainment',
    followers: '3.8M'
  },
  {
    id: 106,
    name: 'Tom Scott',
    description: 'Educational videos about interesting places and concepts.',
    imageURL:
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@tomscott',
    category: 'Educational Content',
    tag: 'Educational Content',
    followers: '6.1M'
  },
  {
    id: 107,
    name: 'Half as Interesting',
    description: 'Quick educational videos on fascinating topics.',
    imageURL:
      'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@halfasinteresting',
    category: 'Educational Content',
    tag: 'Educational Content',
    followers: '3.2M'
  },
  {
    id: 108,
    name: 'Wendover Productions',
    description: 'Educational videos on logistics, geography, and economics.',
    imageURL:
      'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@wendoverproductions',
    category: 'Educational Content',
    tag: 'Educational Content',
    followers: '4.7M'
  },
  {
    id: 109,
    name: 'Numberphile',
    description: 'Mathematics videos featuring interesting numbers and concepts.',
    imageURL:
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@numberphile',
    category: 'Educational Content',
    tag: 'Educational Content',
    followers: '4.3M'
  },
  {
    id: 110,
    name: 'Computerphile',
    description: 'Computer science concepts explained by experts.',
    imageURL:
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop&crop=face',
    url: 'https://youtube.com/@computerphile',
    category: 'Tech & Coding',
    tag: 'Tech & Coding',
    followers: '2.1M'
  }
]

// Container categories (5 main ones)
export const categories: ContainerCategory[] = [
  'Streaming & Gaming',
  'Educational Content',
  'Tech & Coding',
  'Art & Design',
  'Lifestyle & Entertainment'
]

// All unique tags
export const tags: CreatorTag[] = [
  'Streaming & Gaming',
  'Educational Content',
  'Tech & Coding',
  'Art & Design',
  'Lifestyle & Entertainment',
  'Music & Entertainment',
  'Fitness & Health',
  'Food & Cooking',
  'Travel & Adventure',
  'Business & Finance',
  'Comedy & Entertainment',
  'DIY & Crafts',
  'Sports & Fitness',
  'News & Politics',
  'Science & Nature',
  'Beauty & Fashion'
]

// Randomization functions
export function randomizeArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export const randomCreators = (): Creator[] => randomizeArray(creators)

export const selectedCreators = (): Creator[] => randomCreators().slice(0, 20)

export const orderedCreators = (): Creator[] => {
  const categoryOrder: ContainerCategory[] = [
    'Streaming & Gaming',
    'Educational Content',
    'Tech & Coding',
    'Art & Design',
    'Lifestyle & Entertainment'
  ]

  return [...creators].sort((a, b) => {
    // First sort by category order
    const categoryIndexA = categoryOrder.indexOf(a.category)
    const categoryIndexB = categoryOrder.indexOf(b.category)

    if (categoryIndexA !== categoryIndexB) {
      return categoryIndexA - categoryIndexB
    }

    // Then sort by name alphabetically within the same category
    return a.name.localeCompare(b.name)
  })
}

// Helper functions
export function getCreatorsByCategory(category: string): Creator[] {
  return creators.filter(creator => creator.category === category)
}

export function getCreatorsByTag(tag: string): Creator[] {
  return creators.filter(creator => creator.tag === tag)
}

export function getCategoryCounts(): Record<string, number> {
  return creators.reduce(
    (acc, creator) => {
      acc[creator.category] = (acc[creator.category] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
}

export function getTagCounts(): Record<string, number> {
  return creators.reduce(
    (acc, creator) => {
      acc[creator.tag] = (acc[creator.tag] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )
}
