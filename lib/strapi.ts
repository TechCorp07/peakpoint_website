import { cache } from 'react'

interface StrapiResponse<T> {
  data: T
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

class StrapiClient {
  private baseUrl: string
  private apiToken: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || ""
    this.apiToken = process.env.STRAPI_API_TOKEN || ""
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
    try {
      const url = `${this.baseUrl}/api${endpoint}`
      const headers = {
        "Content-Type": "application/json",
        ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
        ...options?.headers,
      }

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 10000)

      try {
        const response = await fetch(url, {
          ...options,
          headers,
          signal: controller.signal,
          next: { revalidate: 300 },
        })

        clearTimeout(timeout)

        if (!response.ok) {
          console.warn(`Strapi API error: ${response.status} ${response.statusText} for ${endpoint}`)
          return null
        }

        const contentType = response.headers.get("content-type")
        if (!contentType || !contentType.includes("application/json")) {
          console.warn(`Strapi returned non-JSON response for ${endpoint}. Is Strapi running?`)
          return null
        }

        return response.json()
      } catch (error) {
        console.warn(`Failed to fetch from Strapi (${endpoint}):`, error instanceof Error ? error.message : error)
        return null
      } finally {
        clearTimeout(timeout)
      }
    } catch (error) {
      console.warn(`Failed to fetch from Strapi (${endpoint}):`, error instanceof Error ? error.message : error)
      return null
    }
  }

  // Hero Slides
  async getHeroSlides() {
    return this.fetch<StrapiResponse<any[]>>("/hero-slides?populate=*")
  }

  // Services
  async getServices() {
    return this.fetch<StrapiResponse<any[]>>("/services?populate=*")
  }

  async getService(slug: string) {
    return this.fetch<StrapiResponse<any>>(`/services?filters[slug][$eq]=${slug}&populate=*`)
  }

  // Service Pages (for individual service detail pages)
  async getServicePage(slug: string) {
    return this.fetch<StrapiResponse<any>>(`/service-pages?filters[slug][$eq]=${slug}&populate=*`)
  }

  // Sub-Service Pages
  async getSubService(slug: string) {
    const res = await this.fetch<StrapiResponse<any[]>>(
      `/sub-services?filters[slug][$eq]=${slug}&populate=*`
    )

    if (!res || !Array.isArray(res.data)) {
      console.warn("Unexpected sub-service response from Strapi:", res)
      return null
    }

    if (res.data.length === 0) {
      console.warn(`Sub-service not found for slug: ${slug}`)
      return null
    }

    return res.data[0]
  }


  // Industries
  async getIndustries() {
    return this.fetch<StrapiResponse<any[]>>("/industries?populate=*")
  }

  // Benefits
  async getBenefits() {
    return this.fetch<StrapiResponse<any[]>>("/benefits?populate=*")
  }

  // Benefits Section (single type)
  async getBenefitsSection() {
    return this.fetch<StrapiResponse<any>>("/benefits-section?populate=*")
  }

  // Metrics
  async getMetrics() {
    return this.fetch<StrapiResponse<any[]>>("/metrics")
  }

  // Metrics Section (single type)
  async getMetricsSection() {
    return this.fetch<StrapiResponse<any>>("/metrics-section?populate=*")
  }

  // Partners
  async getPartners() {
    return this.fetch<StrapiResponse<any[]>>("/partners?populate=*")
  }

  // Partners Section (single type)
  async getPartnersSection() {
    return this.fetch<StrapiResponse<any>>("/partners-section?populate=*")
  }

  // Partnerships Page (single type)
  async getPartnershipsPage() {
    return this.fetch<StrapiResponse<any>>("/partnerships-page?populate=*")
  }

  // Blog Posts
  async getBlogPosts(page = 1, pageSize = 10) {
    return this.fetch<StrapiResponse<any[]>>(
      `/blog-posts?populate=*&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`,
    )
  }

  async getBlogPost(slug: string) {
    return this.fetch<StrapiResponse<any>>(`/blog-posts?filters[slug][$eq]=${slug}&populate=*`)
  }

  // Career Listings
  async getCareerListings() {
    return this.fetch<StrapiResponse<any[]>>("/career-listings?populate=*")
  }

  // Insights with category filter
  async getInsights(category?: string, page = 1, pageSize = 10) {
    const categoryFilter = category ? `&filters[category][$eq]=${category}` : ""
    return this.fetch<StrapiResponse<any[]>>(
      `/insights?populate=*${categoryFilter}&pagination[page]=${page}&pagination[pageSize]=${pageSize}&sort=publishedAt:desc`,
    )
  }

  async getInsight(slug: string) {
    return this.fetch<StrapiResponse<any>>(`/insights?filters[slug][$eq]=${slug}&populate=*`)
  }

  // Team Members
  async getTeamMembers() {
    return this.fetch<StrapiResponse<any[]>>("/team-members?populate=*")
  }

  // Training Resources
  async getTrainingResources(type?: string, category?: string) {
    let filters = ""
    if (type) filters += `&filters[type][$eq]=${type}`
    if (category) filters += `&filters[category][$eq]=${category}`
    return this.fetch<StrapiResponse<any[]>>(`/training-resources?populate=*${filters}&sort=publishedAt:desc`)
  }

  // Training Programs
  async getTrainingPrograms() {
    return this.fetch<StrapiResponse<any[]>>("/training-programs?populate=*&sort=name:asc")
  }

  // Impact Story (for Our Story page)
  async getImpactStory() {
    return this.fetch<StrapiResponse<any>>("/impact-story?populate=*")
  }

  // Footer Settings
  getFooterSettings = cache(async () => {
    return this.fetch<StrapiResponse<any>>("/footer-setting?populate[socialLinks]=*&populate[contactInfo]=*")
  })

  // Footer Navigation (single type)
  getFooterNavigation = cache(async () => {
    return this.fetch<StrapiResponse<any>>(
      "/footer-navigation?populate[industries][populate]=services"
    )})

  // Site Settings
  getSiteSettings = cache(async () => {
    return this.fetch<StrapiResponse<any>>("/site-setting?populate=*")
  })

  // Homepage Content (single type)
  async getHomepageContent() {
    return this.fetch<StrapiResponse<any>>(
      "/homepage-content?populate[heroSlides][populate]=backgroundImage&populate[industriesSection][populate][industries][populate]=subServices&populate[benefitsSection][populate][benefits][populate]=image"
    )}

  // About Page (single type)
  async getAboutPage() {
    return this.fetch<StrapiResponse<any>>("/about-page?populate=*")
  }

  // CTA Buttons
  async getCTAButtons() {
    return this.fetch<StrapiResponse<any[]>>("/cta-buttons")
  }

  async getCTAButton(key: string) {
    return this.fetch<StrapiResponse<any>>(`/cta-buttons?filters[key][$eq]=${key}`)
  }

  // Partner Stories
  async getPartnerStories() {
    const res = await this.fetch<StrapiResponse<any[]>>("/partner-stories?populate=*")
    if (!res || !Array.isArray(res.data)) {
      console.warn("Unexpected partner stories response from Strapi:", res)
      return null
    }
    return res.data
  }

  async getPartnerStory(slug: string) {
    return this.fetch<StrapiResponse<any>>(
      `/partner-stories?filters[slug][$eq]=${slug}&populate[partnerLogo][populate]=*&populate[featuredImage][populate]=*&populate[metrics][populate]=*`
    )
  }

  // Case Studies
  async getCaseStudies() {
    const res = await this.fetch<StrapiResponse<any[]>>("/case-studies?populate=*")
    if (!res || !Array.isArray(res.data)) {
      console.warn("Unexpected case studies response from Strapi:", res)
      return null
    }

    return res.data
  }

  async getCaseStudy(slug: string) {
    return this.fetch<StrapiResponse<any>>(`/case-studies?filters[slug][$eq]=${slug}&populate=*`)
  }

  // Testimonials
  async getTestimonials() {
    return this.fetch<StrapiResponse<any[]>>("/testimonials?populate=*")
  }
}

export const strapi = new StrapiClient()
