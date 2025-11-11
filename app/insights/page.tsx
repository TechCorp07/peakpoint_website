import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, User, ArrowRight, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Insights | Peak Point Services",
  description: "Latest news, blogs, case studies, and community updates from Peak Point",
}

// Placeholder data - will be replaced with Strapi CMS
const insights = [
  {
    id: 1,
    title: "The Future of BPO in Africa: Trends Shaping 2025",
    excerpt:
      "Explore the emerging trends transforming the BPO landscape across Africa, from AI integration to sustainable practices.",
    category: "Industry Insights",
    author: "Sarah Okonkwo",
    date: "January 15, 2025",
    image: "/insights/future-bpo-africa.jpg",
    slug: "future-bpo-africa-2025",
  },
  {
    id: 2,
    title: "How AI is Revolutionizing Healthcare Revenue Cycle Management",
    excerpt:
      "Discover how artificial intelligence is streamlining medical billing and reducing claim denials for healthcare providers.",
    category: "Healthcare",
    author: "Dr. Michael Chen",
    date: "January 12, 2025",
    image: "/insights/ai-healthcare-rcm.jpg",
    slug: "ai-healthcare-rcm",
  },
  {
    id: 3,
    title: "Building High-Performance Remote Teams: Lessons from Peak Point",
    excerpt: "Our proven strategies for creating engaged, productive remote teams across multiple African countries.",
    category: "Teamwork",
    author: "James Mwangi",
    date: "January 10, 2025",
    image: "/insights/remote-teams.jpg",
    slug: "building-remote-teams",
  },
  {
    id: 4,
    title: "Data Security in BPO: Best Practices for 2025",
    excerpt: "Essential security measures every business should implement when outsourcing critical operations.",
    category: "Security",
    author: "Amara Nkosi",
    date: "January 8, 2025",
    image: "/insights/data-security-bpo.jpg",
    slug: "data-security-best-practices",
  },
  {
    id: 5,
    title: "Community Spotlight: Peak Point's Impact in Local Communities",
    excerpt: "How our operations are creating jobs and driving economic growth across African communities.",
    category: "Community",
    author: "Fatima Hassan",
    date: "January 5, 2025",
    image: "/insights/community-impact.jpg",
    slug: "community-impact",
  },
  {
    id: 6,
    title: "Case Study: Scaling E-commerce Support During Peak Season",
    excerpt:
      "How we helped a leading retailer handle 300% traffic increase while maintaining 4.8/5 customer satisfaction.",
    category: "Case Studies",
    author: "Peak Point Team",
    date: "January 3, 2025",
    image: "/insights/ecommerce-case-study.jpg",
    slug: "ecommerce-scaling-case-study",
  },
]

const categories = ["All", "Industry Insights", "Healthcare", "Teamwork", "Security", "Community", "Case Studies"]

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary to-primary/90 py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">Insights & Stories</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Stay informed with the latest industry trends, success stories, and thought leadership from Peak Point.
              Explore our blogs, news, case studies, and community updates.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex gap-3 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 rounded-full border border-border hover:border-accent hover:bg-accent/10 transition-colors whitespace-nowrap text-sm font-medium"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="bg-card rounded-2xl overflow-hidden border border-border shadow-lg hover:shadow-xl transition-shadow">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-80 md:h-auto">
                <Image
                  src={insights[0].image || "/placeholder.svg"}
                  alt={insights[0].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold">
                    FEATURED
                  </span>
                  <span className="text-sm text-muted-foreground">{insights[0].category}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{insights[0].title}</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">{insights[0].excerpt}</p>
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {insights[0].author}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {insights[0].date}
                  </div>
                </div>
                <Link
                  href={`/insights/${insights[0].slug}`}
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold group"
                >
                  Read Article
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.slice(1).map((article) => (
              <Link
                key={article.id}
                href={`/insights/${article.slug}`}
                className="group bg-card rounded-xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-4 h-4 text-accent" />
                    <span className="text-xs font-semibold text-accent">{article.category}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {article.date}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
