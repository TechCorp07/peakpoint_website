"use client"

import { IndustryFilter } from "@/components/insights/industry-filter"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [filteredNews, setFilteredNews] = useState<any[]>([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [availableIndustries, setAvailableIndustries] = useState<string[]>([])

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/insights?type=news")
        const data = await response.json()
        const fetchedNews = data?.data || []

        const fallbackNews = [
          {
            id: 1,
            attributes: {
              title: "Peak Point Expands Operations to Three New African Countries",
              excerpt:
                "We're excited to announce our expansion into Kenya, Ghana, and Nigeria, creating 500+ new jobs.",
              publishedAt: "2025-01-18",
              slug: "expansion-announcement",
              industry: "enterprise",
              featuredImage: { data: { attributes: { url: "/placeholder.svg?height=400&width=600" } } },
            },
          },
          {
            id: 2,
            attributes: {
              title: "New Healthcare Partnership Announced",
              excerpt:
                "Peak Point partners with leading healthcare providers to enhance RCM services across the continent.",
              publishedAt: "2025-01-12",
              slug: "healthcare-partnership",
              industry: "healthcare",
              featuredImage: { data: { attributes: { url: "/placeholder.svg?height=400&width=600" } } },
            },
          },
        ]

        const displayNews = fetchedNews.length > 0 ? fetchedNews : fallbackNews
        setNews(displayNews)
        setFilteredNews(displayNews)

        const industries = Array.from(
          new Set(displayNews.map((item: any) => item.attributes.industry).filter(Boolean)),
        ) as string[]
        console.log("Available industries:", industries)
        setAvailableIndustries(industries)
      } catch (error) {
        console.error("Error fetching news:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleFilterChange = (industry: string) => {
    console.log("Filter changed to:", industry)
    setActiveFilter(industry)

    if (industry === "all") {
      console.log("Showing all news:", news.length)
      setFilteredNews(news)
    } else {
      const filtered = news.filter((item: any) => {
        const itemIndustry = item.attributes.industry?.toLowerCase()
        console.log("Comparing:", itemIndustry, "with", industry)
        return itemIndustry === industry.toLowerCase()
      })
      console.log("Filtered news:", filtered.length)
      setFilteredNews(filtered)
    }
  }

  return (
    <main className="pt-20 min-h-screen">
        <section className="relative bg-primary py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/business-news-announcement-press-conference.jpg" alt="News Hero Background" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/80" />
          </div>
          <div className="relative container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl">
              <Link
                href="/insights"
                className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6"
              >
                ← Back to Insights
              </Link>
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">News</h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Latest company updates, announcements, and industry news from Peak Point Services.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <IndustryFilter
              onFilterChange={handleFilterChange}
              activeFilter={activeFilter}
              availableIndustries={availableIndustries}
            />

            {loading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading news...</p>
              </div>
            ) : filteredNews.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No news found for this industry.</p>
              </div>
            ) : (
              <div className="max-w-4xl mx-auto space-y-8">
                {filteredNews.map((item: any) => (
                  <Link
                    key={item.id}
                    href={`/insights/${item.attributes.slug}`}
                    className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-xl transition-all"
                  >
                    <div className="md:flex">
                      <div className="md:w-1/3 relative aspect-video md:aspect-square">
                        <Image
                          src={
                            item.attributes.featuredImage?.data?.attributes?.url ||
                            "/placeholder.svg?height=400&width=600" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg" ||
                            "/placeholder.svg"
                          }
                          alt={item.attributes.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="md:w-2/3 p-8">
                        <div className="flex items-center gap-3 mb-3">
                          {item.attributes.industry && (
                            <span className="px-3 py-1 text-xs font-semibold bg-accent/10 text-accent rounded-full capitalize">
                              {item.attributes.industry}
                            </span>
                          )}
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>📅</span>
                            {new Date(item.attributes.publishedAt).toLocaleDateString()}
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                          {item.attributes.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{item.attributes.excerpt}</p>
                        <div className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-3 transition-all">
                          Read More <span>→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
    </main>
  )
}
