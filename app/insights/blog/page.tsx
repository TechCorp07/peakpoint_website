"use client"

import { IndustryFilter } from "@/components/insights/industry-filter"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [availableIndustries, setAvailableIndustries] = useState<string[]>([])
  const [isCMSConnected, setIsCMSConnected] = useState(true) // Track if CMS returned data

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/insights?type=blog")
        const data = await response.json()
        const fetchedPosts = data?.data || []

        // Check if we got data from CMS
        if (Array.isArray(fetchedPosts) && fetchedPosts.length > 0) {
          setIsCMSConnected(true)
          setPosts(fetchedPosts)
          setFilteredPosts(fetchedPosts)

          const industries = Array.from(
            new Set(fetchedPosts.map((post: any) => post.attributes?.industry || post.industry).filter(Boolean)),
          ) as string[]
          setAvailableIndustries(industries)
        } else {
          // CMS connected but no data
          setIsCMSConnected(true)
          setPosts([])
          setFilteredPosts([])
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error)
        setIsCMSConnected(false)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleFilterChange = (industry: string) => {
    setActiveFilter(industry)

    if (industry === "all") {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter((post: any) => {
        const postIndustry = (post.attributes?.industry || post.industry)?.toLowerCase()
        return postIndustry === industry.toLowerCase()
      })
      setFilteredPosts(filtered)
    }
  }

  return (
    <main className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/modern-office-technology-collaboration.jpg"
            alt="Blog Hero Background"
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
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">Blog</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Industry insights, thought leadership, and expert perspectives on BPO, technology, and business
              transformation.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
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
          ) : isCMSConnected && posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📝</div>
              <h2 className="text-3xl font-bold text-foreground mb-4">No Blog Posts Available</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're currently working on new content. Check back soon for the latest insights and industry trends.
              </p>
              <Button asChild className="bg-accent hover:bg-accent-hover text-white">
                <Link href="/contact">Get in Touch →</Link>
              </Button>
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No posts found for this industry.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/insights/${post.attributes?.slug || post.slug}`}
                  className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-xl transition-all"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={
                        post.attributes?.featuredImage?.data?.attributes?.url ||
                        "/placeholder.svg?height=400&width=600"
                      }
                      alt={post.attributes?.title || post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    {(post.attributes?.industry || post.industry) && (
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-accent/10 text-accent rounded-full mb-3 capitalize">
                        {post.attributes?.industry || post.industry}
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                      {post.attributes?.title || post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                      {post.attributes?.excerpt || post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {(post.attributes?.author || post.author) && (
                        <div className="flex items-center gap-1">
                          <span>👤</span>
                          {post.attributes?.author || post.author}
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <span>📅</span>
                        {new Date(post.attributes?.publishedAt || post.publishedAt).toLocaleDateString()}
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