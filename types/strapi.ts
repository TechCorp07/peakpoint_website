export interface StrapiImage {
  id: number
  url: string
  alternativeText?: string
  width: number
  height: number
}

export interface HeroSlide {
  id: number
  title: string
  subtitle: string
  ctaText: string
  ctaLink: string
  backgroundImage: StrapiImage
  backgroundVideo?: {
    url: string
  }
}

export interface Service {
  id: number
  title: string
  slug: string
  description: string
  icon: string
  features: string[]
  image: StrapiImage
}

export interface Industry {
  id: number
  name: string
  slug: string
  description: string
  icon: string
  challenges: string[]
  solutions: string[]
}

export interface Benefit {
  id: number
  title: string
  description: string
  image: StrapiImage
  order: number
}

export interface Testimonial {
  id: number
  name: string
  position: string
  company: string
  content: string
  avatar: StrapiImage
  rating: number
}

export interface CaseStudy {
  id: number
  title: string
  slug: string
  client: string
  industry: string
  challenge: string
  solution: string
  results: string[]
  image: StrapiImage
  metrics: {
    label: string
    value: string
  }[]
}

export interface Metric {
  id: number
  label: string
  value: string
  icon: string
  order: number
}

export interface Partner {
  id: number
  name: string
  logo: StrapiImage
  url?: string
}

export interface BlogPost {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  featuredImage: StrapiImage
  category: string
}

export interface TeamMember {
  id: number
  name: string
  position: string
  bio: string
  photo: StrapiImage
  linkedin?: string
}

export interface InsightPageHero {
  id: number
  page: "blog" | "news" | "case-studies" | "community"
  title: string
  description: string
  heroImage: StrapiImage
}

export interface FooterSettings {
  id: number
  socialLinks: {
    linkedin: string
    facebook: string
    twitter: string
    youtube: string
    whatsapp: string
  }
  contactInfo: {
    email: string
    phone: string
    address: string
  }
}
