"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { IndustryFilter } from "@/components/insights/industry-filter"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [filteredPosts, setFilteredPosts] = useState<any[]>([])
  const [activeFilter, setActiveFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [availableIndustries, setAvailableIndustries] = useState<string[]>([])

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await fetch("/api/insights?type=blog")
        const data = await response.json()
        const fetchedPosts = data?.data || []

        const fallbackPosts = [
          {
            id: 1,
            attributes: {
              title: "The Future of BPO in Africa: Trends Shaping 2025",
              excerpt:
                "Explore the emerging trends transforming the BPO landscape across Africa, from AI integration to sustainable practices.",
              author: "Sarah Okonkwo",
              publishedAt: "2025-01-15",
              slug: "future-bpo-africa-2025",
              industry: "technology",
              featuredImage: { data: { attributes: { url: "/placeholder.svg?height=400&width=600" } } },
            },
          },
          {
            id: 2,
            attributes: {
              title: "Building High-Performance Remote Teams",
              excerpt:
                "Our proven strategies for creating engaged, productive remote teams across multiple African countries.",
              author: "James Mwangi",
              publishedAt: "2025-01-10",
              slug: "building-remote-teams",
              industry: "enterprise",
              featuredImage: { data: { attributes: { url: "/placeholder.svg?height=400&width=600" } } },
            },
          },
          {
            id: 3,
            attributes: {
              title: "Healthcare RCM: Maximizing Revenue in 2025",
              excerpt:
                "Learn how modern revenue cycle management is transforming healthcare operations and improving patient outcomes.",
              author: "Dr. Amara Nwosu",
              publishedAt: "2025-01-08",
              slug: "healthcare-rcm-2025",
              industry: "healthcare",
              featuredImage: { data: { attributes: { url: "/placeholder.svg?height=400&width=600" } } },
            },
          },
          {
            id: 4,
            attributes: {
              title: "Data Annotation Training: Empowering the Next Generation",
              excerpt:
                "How our comprehensive training programs are creating skilled data annotation professionals across Africa.",
              author: "Michael Banda",
              publishedAt: "2025-01-05",
              slug: "data-annotation-training",
              industry: "education",
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
        console.log("[v0] Available industries:", industries)
        setAvailableIndustries(industries)
      } catch (error) {
        console.error("[v0] Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handleFilterChange = (industry: string) => {
    console.log("[v0] Filter changed to:", industry)
    setActiveFilter(industry)

    if (industry === "all") {
      console.log("[v0] Showing all posts:", posts.length)
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter((post: any) => {
        const postIndustry = post.attributes.industry?.toLowerCase()
        console.log("[v0] Comparing:", postIndustry, "with", industry)
        return postIndustry === industry.toLowerCase()
      })
      console.log("[v0] Filtered posts:", filtered.length)
      setFilteredPosts(filtered)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative bg-primary py-24 overflow-hidden">
          <div className="absolute inset-0">
            <Image src="/modern-office-technology-collaboration.jpg" alt="Blog Hero Background" fill className="object-cover" priority />
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
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts found for this industry.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                          "/placeholder.svg"
                        }
                        alt={post.attributes.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      {post.attributes.industry && (
                        <span className="inline-block px-3 py-1 text-xs font-semibold bg-accent/10 text-accent rounded-full mb-3 capitalize">
                          {post.attributes.industry}
                        </span>
                      )}
                      <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                        {post.attributes.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
                        {post.attributes.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <span>👤</span>
                          {post.attributes.author}
                        </div>
                        <div className="flex items-center gap-1">
                          <span>📅</span>
                          {new Date(post.attributes.publishedAt).toLocaleDateString()}
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
      <Footer />
    </div>
  )
}
