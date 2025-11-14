"use client"

import { IndustryFilter } from "@/components/insights/industry-filter"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function CommunityPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [availableIndustries, setAvailableIndustries] = useState<string[]>([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/insights?type=community")
        const data = await response.json()
        const fetchedPosts = data?.data || []

        const fallbackPosts = [
          {
            id: 1,
            attributes: {
              title: "Community Spotlight: Peak Point's Impact in Local Communities",
              excerpt: "How our operations are creating jobs and driving economic growth across African communities.",
              publishedAt: "2025-01-05",
              slug: "community-impact",
              industry: "enterprise",
              featuredImage: { data: { attributes: { url: "/placeholder.svg?height=400&width=600" } } },
            },
          },
          {
            id: 2,
            attributes: {
              title: "Team Building Success: Healthcare Division",
              excerpt: "Our healthcare team's journey in building strong collaborative relationships.",
              publishedAt: "2025-01-03",
              slug: "healthcare-team-building",
              industry: "healthcare",
              featuredImage: { data: { attributes: { url: "/placeholder.svg?height=400&width=600" } } },
            },
          },
        ]

        const displayPosts = fetchedPosts.length > 0 ? fetchedPosts : fallbackPosts
        setPosts(displayPosts)
        setFilteredPosts(displayPosts)

        const industries = Array.from(
          new Set(displayPosts.map((post: any) => post.attributes.industry).filter(Boolean)),
        ) as string[]
        setAvailableIndustries(industries)
      } catch (error) {
        console.error("Error fetching community posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleFilterChange = (industry: string) => {
    console.log("Filter changed to:", industry)
    setActiveFilter(industry)

    if (industry === "all") {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter((post: any) => post.attributes.industry?.toLowerCase() === industry.toLowerCase())
      setFilteredPosts(filtered)
    }
  }

  return (
    <main className="pt-20 min-h-screen">
        <section className="relative bg-primary py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/diverse-team-collaboration-community-teamwork.jpg"
              alt="Community Hero Background"
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
              <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">Community & Teamwork</h1>
              <p className="text-xl text-primary-foreground/90 leading-relaxed">
                Stories of impact, collaboration, and community building from across our organization and the regions we
                serve.
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
                <p className="text-muted-foreground">Loading posts...</p>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found for this industry.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {filteredPosts.map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/insights/${post.attributes.slug}`}
                    className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-xl transition-all"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={
                          post.attributes.featuredImage?.data?.attributes?.url ||
                          "/placeholder.svg?height=400&width=600" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg" ||
                          "/placeholder.svg"
                        }
                        alt={post.attributes.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <span>❤️</span>
                        {post.attributes.industry ? post.attributes.industry : "Community"}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {post.attributes.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{post.attributes.excerpt}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>📅</span>
                        {new Date(post.attributes.publishedAt).toLocaleDateString()}
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
