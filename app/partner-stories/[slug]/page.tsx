import { strapi } from "@/lib/strapi"
import { parseMarkdown } from "@/lib/markdown-utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ExternalLink, Calendar } from "lucide-react"

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

async function getPartnerStory(slug: string) {
  try {
    const response = await strapi.getPartnerStory(slug)
    if (!response || !response.data || response.data.length === 0) {
      return null
    }
    return response.data[0]
  } catch (error) {
    console.error("Error fetching partner story:", error)
    return null
  }
}

export default async function PartnerStoryDetailPage({ params }: PageProps) {
  // Next.js 15: Await params before accessing properties
  const resolvedParams = await params
  const partnerStory = await getPartnerStory(resolvedParams.slug)

  if (!partnerStory) {
    notFound()
  }

  const story = partnerStory.attributes || partnerStory

  const featuredImageUrl = story.featuredImage?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${story.featuredImage.data.attributes.url}`
    : story.featuredImage || "/placeholder.svg"

  const logoUrl = story.partnerLogo?.data?.attributes?.url
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${story.partnerLogo.data.attributes.url}`
    : story.partnerLogo || "/placeholder.svg"

  // Format date if available
  const formattedDate = story.partnershipDate
    ? new Date(story.partnershipDate).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      })
    : null

  // Parse markdown to HTML for rich text fields
  const challengeHtml = parseMarkdown(story.challenge)
  const collaborationHtml = parseMarkdown(story.collaboration)
  const impactHtml = parseMarkdown(story.impact)

  return (
    <main className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0">
          {featuredImageUrl && featuredImageUrl !== "/placeholder.svg" && (
            <>
              <Image src={featuredImageUrl} alt={story.title} fill className="object-cover" priority />
              <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary/90" />
            </>
          )}
        </div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <Link
              href="/partner-stories"
              className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6"
            >
              ← Back to Partner Stories
            </Link>

            {/* Partner Logo */}
            {logoUrl && logoUrl !== "/placeholder.svg" && (
              <div className="mb-6 h-16 flex items-center">
                <Image 
                  src={logoUrl} 
                  alt={story.partnerName} 
                  width={200} 
                  height={64} 
                  className="object-contain" 
                />
              </div>
            )}

            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm text-primary text-sm font-semibold rounded-full">
                {story.partnerType}
              </span>
              {formattedDate && (
                <span className="flex items-center gap-2 text-primary-foreground/80 text-sm">
                  <Calendar className="w-4 h-4" />
                  Partnership Since {formattedDate}
                </span>
              )}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">{story.title}</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">{story.description}</p>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="py-12 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {story.metrics?.map((metric: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-accent mb-2">{metric.value}</div>
                <div className="text-sm font-semibold text-foreground mb-1">{metric.label}</div>
                {metric.description && (
                  <div className="text-xs text-muted-foreground">{metric.description}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-16">
            {/* Challenge */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">The Challenge</h2>
              <div
                className="prose prose-lg max-w-none text-muted-foreground [&_strong]:font-bold [&_strong]:text-foreground [&_em]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
                dangerouslySetInnerHTML={{ __html: challengeHtml }}
              />
            </div>

            {/* Collaboration */}
            <div className="bg-gradient-to-br from-secondary/50 to-secondary/30 rounded-2xl p-8 md:p-12">
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Collaboration</h2>
              <div
                className="prose prose-lg max-w-none text-muted-foreground [&_strong]:font-bold [&_strong]:text-foreground [&_em]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
                dangerouslySetInnerHTML={{ __html: collaborationHtml }}
              />
            </div>

            {/* Impact */}
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">The Impact</h2>
              <div
                className="prose prose-lg max-w-none text-muted-foreground [&_strong]:font-bold [&_strong]:text-foreground [&_em]:italic [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_li]:mb-2"
                dangerouslySetInnerHTML={{ __html: impactHtml }}
              />
            </div>

            {/* Testimonial */}
            {story.testimonial && (
              <div className="bg-primary/5 border-l-4 border-accent rounded-r-2xl p-8 md:p-12">
                <blockquote className="text-xl text-foreground italic mb-4">"{story.testimonial}"</blockquote>
                {story.testimonialAuthor && (
                  <p className="text-muted-foreground font-semibold">— {story.testimonialAuthor}</p>
                )}
              </div>
            )}

            {/* Partner Website Link */}
            {story.partnerWebsite && (
              <div className="flex justify-center">
                <Button asChild size="lg" variant="outline" className="border-accent text-accent hover:bg-accent hover:text-white">
                  <a href={story.partnerWebsite} target="_blank" rel="noopener noreferrer">
                    Visit {story.partnerName} <ExternalLink className="ml-2 w-5 h-5" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">Become Our Partner</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join our network of leading partners to drive innovation and create impact together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-white">
              <Link href="/about/partnerships">Partner With Us →</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
              <Link href="/partner-stories">View All Stories</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
