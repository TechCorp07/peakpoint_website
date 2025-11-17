"use client"

import { IndustryFilter } from "@/components/insights/industry-filter"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function NewsPage() {
  const [news, setNews] = useState<any[]>([])
  const [filteredNews, setFilteredNews] = useState<any[]>([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [availableIndustries, setAvailableIndustries] = useState<string[]>([])
  const [isCMSConnected, setIsCMSConnected] = useState(true)

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/insights?type=news")
        const data = await response.json()
        const fetchedNews = data?.data || []

        if (Array.isArray(fetchedNews) && fetchedNews.length > 0) {
          setIsCMSConnected(true)
          setNews(fetchedNews)
          setFilteredNews(fetchedNews)

          const industries = Array.from(
            new Set(fetchedNews.map((item: any) => item.attributes?.industry || item.industry).filter(Boolean)),
          ) as string[]
          setAvailableIndustries(industries)
        } else {
          setIsCMSConnected(true)
          setNews([])
          setFilteredNews([])
        }
      } catch (error) {
        console.error("Error fetching news:", error)
        setIsCMSConnected(false)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  const handleFilterChange = (industry: string) => {
    setActiveFilter(industry)

    if (industry === "all") {
      setFilteredNews(news)
    } else {
      const filtered = news.filter((item: any) => {
        const itemIndustry = (item.attributes?.industry || item.industry)?.toLowerCase()
        return itemIndustry === industry.toLowerCase()
      })
      setFilteredNews(filtered)
    }
  }

  return (
    <main className="pt-20 min-h-screen">
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/business-news-announcement-press-conference.jpg"
            alt="News Hero Background"
            fill
            className="object-cover"
            priority
          />
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
          ) : isCMSConnected && news.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📰</div>
              <h2 className="text-3xl font-bold text-foreground mb-4">No News Available</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're currently updating our news section. Check back soon for the latest announcements and updates.
              </p>
              <Button asChild className="bg-accent hover:bg-accent-hover text-white">
                <Link href="/contact">Contact Us →</Link>
              </Button>
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
                  href={`/insights/${item.attributes?.slug || item.slug}`}
                  className="group block bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-xl transition-all"
                >
                  <div className="md:flex">
                    <div className="md:w-1/3 relative aspect-video md:aspect-square">
                      <Image
                        src={
                          item.attributes?.featuredImage?.data?.attributes?.url ||
                          "/placeholder.svg?height=400&width=600"
                        }
                        alt={item.attributes?.title || item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="md:w-2/3 p-8">
                      <div className="flex items-center gap-3 mb-3">
                        {(item.attributes?.industry || item.industry) && (
                          <span className="px-3 py-1 text-xs font-semibold bg-accent/10 text-accent rounded-full capitalize">
                            {item.attributes?.industry || item.industry}
                          </span>
                        )}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>📅</span>
                          {new Date(item.attributes?.publishedAt || item.publishedAt).toLocaleDateString()}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {item.attributes?.title || item.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {item.attributes?.excerpt || item.excerpt}
                      </p>
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
