import { strapi } from "@/lib/strapi"
import { parseMarkdown } from "@/lib/markdown-utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ExternalLink, TrendingUp } from "lucide-react"

interface PageProps {
    params: Promise<{
        slug: string
    }>
}

async function getCaseStudy(slug: string) {
    try {
        const response = await strapi.getCaseStudy(slug)
        if (!response || !response.data || response.data.length === 0) {
            return null
        }
        return response.data[0]
    } catch (error) {
        console.error("Error fetching case study:", error)
        return null
    }
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
    // Next.js 15: Await params before accessing properties
    const resolvedParams = await params
    const caseStudy = await getCaseStudy(resolvedParams.slug)

    if (!caseStudy) {
        notFound()
    }

    const study = caseStudy.attributes || caseStudy

    // Handle image URLs
    const imageUrl = study.image?.data?.attributes?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${study.image.data.attributes.url}`
        : study.image || "/placeholder.svg"

    const logoUrl = study.logo?.data?.attributes?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${study.logo.data.attributes.url}`
        : study.logo || "/placeholder.svg"

    // Parse markdown to HTML for rich text fields
    const challengeHtml = study.challenge ? parseMarkdown(study.challenge) : ""
    const solutionHtml = study.solution ? parseMarkdown(study.solution) : ""

    // Handle results - could be from 'results' JSON field or 'metrics' component
    const resultsMetrics = study.results || []
    const componentMetrics = study.metrics || []

    // Combine both types of metrics
    const allMetrics = [
        ...resultsMetrics.map((r: any) => ({
            value: r.metric || r.value,
            label: r.label,
            description: r.description
        })),
        ...componentMetrics.map((m: any) => ({
            value: m.value,
            label: m.label,
            description: m.description
        }))
    ]

    return (
        <main className="pt-20 min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-primary py-24 overflow-hidden">
                <div className="absolute inset-0">
                    {imageUrl && imageUrl !== "/placeholder.svg" && (
                        <>
                            <Image src={imageUrl} alt={study.title} fill className="object-cover" priority />
                            <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary/90" />
                        </>
                    )}
                </div>
                <div className="relative container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl">
                        <Link
                            href="/case-studies"
                            className="inline-flex items-center text-primary-foreground/80 hover:text-primary-foreground mb-6"
                        >
                            ← Back to Case Studies
                        </Link>

                        {/* Client Logo */}
                        {logoUrl && logoUrl !== "/placeholder.svg" && (
                            <div className="mb-6 h-16 flex items-center">
                                <Image
                                    src={logoUrl}
                                    alt={study.client || "Client"}
                                    width={200}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                        )}

                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm text-primary text-sm font-semibold rounded-full">
                                {study.industry}
                            </span>
                            {study.client && (
                                <span className="text-primary-foreground/80 text-sm font-medium">
                                    Client: {study.client}
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">{study.title}</h1>
                        {study.description && (
                            <p className="text-xl text-primary-foreground/90 leading-relaxed">{study.description}</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Metrics Bar */}
            {allMetrics.length > 0 && (
                <section className="py-12 bg-secondary/30 border-y border-border">
                    <div className="container mx-auto px-4 lg:px-8">
                        <div className={`grid ${allMetrics.length === 3 ? 'grid-cols-3' : allMetrics.length === 4 ? 'grid-cols-2 md:grid-cols-4' : 'grid-cols-2 md:grid-cols-3'} gap-8 max-w-5xl mx-auto`}>
                            {allMetrics.map((metric: any, index: number) => (
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
            )}

            {/* Main Content */}
            <section className="py-20">
                <div className="container mx-auto px-4 lg:px-8">
                    <div className="max-w-4xl mx-auto space-y-16">
                        {/* Challenge Section */}
                        {challengeHtml && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                                        <TrendingUp className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl font-bold text-foreground">The Challenge</h2>
                                </div>
                                <div
                                    className="prose prose-lg max-w-none text-muted-foreground leading-relaxed
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                    prose-li:text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: challengeHtml }}
                                />
                            </div>
                        )}

                        {/* Solution Section */}
                        {solutionHtml && (
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-accent/10 text-accent rounded-xl flex items-center justify-center">
                                        <svg
                                            className="w-6 h-6"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl font-bold text-foreground">Our Solution</h2>
                                </div>
                                <div
                                    className="prose prose-lg max-w-none text-muted-foreground leading-relaxed
                    prose-headings:text-foreground prose-headings:font-bold
                    prose-p:text-muted-foreground prose-p:leading-relaxed
                    prose-strong:text-foreground prose-strong:font-semibold
                    prose-ul:text-muted-foreground prose-ol:text-muted-foreground
                    prose-li:text-muted-foreground"
                                    dangerouslySetInnerHTML={{ __html: solutionHtml }}
                                />
                            </div>
                        )}

                        {/* Video Section */}
                        {study.videoUrl && (
                            <div className="rounded-2xl overflow-hidden shadow-xl">
                                <video
                                    controls
                                    className="w-full"
                                    poster={imageUrl}
                                >
                                    <source src={study.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                        )}

                        {/* Testimonial */}
                        {study.testimonial && (
                            <div className="bg-primary/5 border-l-4 border-accent rounded-r-2xl p-8 md:p-12">
                                <blockquote className="text-xl text-foreground italic mb-4">"{study.testimonial}"</blockquote>
                                {study.testimonialAuthor && (
                                    <p className="text-muted-foreground font-semibold">— {study.testimonialAuthor}</p>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
                <div className="container mx-auto px-4 lg:px-8 text-center">
                    <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Write Your Success Story?</h2>
                    <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
                        Let's discuss how Peak Point can help you achieve similar results and transform your operations.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-white">
                            <Link href="/contact">Get Started →</Link>
                        </Button>
                        <Button asChild size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                            <Link href="/case-studies">View All Case Studies</Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}