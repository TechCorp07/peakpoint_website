import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowLeft, Share2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Article | Peak Point Insights",
  description: "Read the latest insights from Peak Point Services",
}

export default function InsightArticlePage({ params }: { params: { slug: string } }) {
  // This would fetch from Strapi CMS in production
  const article = {
    title: "The Future of BPO in Africa: Trends Shaping 2025",
    excerpt:
      "Explore the emerging trends transforming the BPO landscape across Africa, from AI integration to sustainable practices.",
    category: "Industry Insights",
    author: "Sarah Okonkwo",
    authorRole: "Chief Strategy Officer",
    authorImage: "/team/sarah-okonkwo.jpg",
    date: "January 15, 2025",
    readTime: "8 min read",
    image: "/insights/future-bpo-africa.jpg",
    content: `
      <p>The Business Process Outsourcing (BPO) industry in Africa is experiencing unprecedented growth and transformation. As we move through 2025, several key trends are reshaping how companies across the continent deliver services to global clients.</p>

      <h2>1. AI and Automation Integration</h2>
      <p>Artificial intelligence is no longer a future concept—it's here and transforming BPO operations across Africa. From intelligent chatbots handling customer inquiries to machine learning algorithms optimizing workforce management, AI is enabling African BPO providers to deliver higher quality services at lower costs.</p>

      <p>At Peak Point, we've integrated AI-powered quality assurance systems that monitor 100% of customer interactions, providing real-time feedback to agents and identifying training opportunities. This has resulted in a 35% improvement in first-call resolution rates.</p>

      <h2>2. Specialized Industry Expertise</h2>
      <p>Gone are the days of generic BPO services. Today's clients demand deep industry expertise, particularly in complex sectors like healthcare, fintech, and e-commerce. African BPO providers are investing heavily in specialized training and certifications to meet these demands.</p>

      <h2>3. Data Security and Compliance</h2>
      <p>With increasing regulatory requirements like GDPR, HIPAA, and local data protection laws, security has become a top priority. Leading African BPO providers are achieving international certifications like ISO 27001 and SOC 2 Type II to demonstrate their commitment to data protection.</p>

      <h2>4. Sustainable and Ethical Practices</h2>
      <p>Sustainability is becoming a key differentiator in the BPO industry. Companies are increasingly looking for partners who demonstrate commitment to environmental sustainability, fair labor practices, and community development.</p>

      <h2>5. The Rise of Nearshoring</h2>
      <p>African countries are becoming attractive nearshoring destinations for European and Middle Eastern companies, offering time zone advantages, cultural affinity, and cost benefits compared to traditional offshore locations.</p>

      <h2>Conclusion</h2>
      <p>The future of BPO in Africa is bright, driven by technological innovation, specialized expertise, and a commitment to quality and sustainability. Companies that embrace these trends will be well-positioned to compete on the global stage.</p>
    `,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 lg:px-8 py-4">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-accent transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <div className="mb-8">
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">{article.title}</h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">{article.excerpt}</p>

            <div className="flex items-center justify-between flex-wrap gap-4 pb-8 border-b border-border">
              <div className="flex items-center gap-4">
                <Image
                  src={article.authorImage || "/placeholder.svg"}
                  alt={article.author}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <div className="font-semibold text-foreground">{article.author}</div>
                  <div className="text-sm text-muted-foreground">{article.authorRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {article.date}
                </div>
                <div>{article.readTime}</div>
                <button className="flex items-center gap-2 hover:text-accent transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-12">
            <Image src={article.image || "/placeholder.svg"} alt={article.title} fill className="object-cover" />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-accent prose-strong:text-foreground"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>
    </div>
  )
}
