import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

async function getCaseStudies() {
  try {
    const data = await strapi.getCaseStudies()
    if (!Array.isArray(data)) {
      console.warn("getCaseStudies() did not return an array:", data)
      return null
    }

    return data
  } catch (error) {
    console.warn("Failed to fetch case studies, using fallback", error)
    return null
  }
}

export default async function CaseStudiesPage() {
  const caseStudiesData = await getCaseStudies()

  const defaultCaseStudies = [
    {
      slug: "healthcare-rcm-transformation",
      title: "Healthcare RCM Transformation",
      client: "Major Healthcare Provider",
      industry: "Healthcare",
      challenge: "Struggling with high claim denial rates and slow revenue cycle",
      solution: "Implemented end-to-end RCM services with AI-powered coding",
      results: [
        { metric: "40%", label: "Reduction in Claim Denials" },
        { metric: "60%", label: "Faster Payment Processing" },
        { metric: "$2.5M", label: "Annual Cost Savings" },
      ],
      image: "/case-study-healthcare.jpg",
      testimonial: "Peak Point transformed our revenue cycle operations. The results exceeded our expectations.",
      testimonialAuthor: "CFO, Healthcare Provider",
    },
    {
      slug: "enterprise-automation",
      title: "Enterprise Workflow Automation",
      client: "Fortune 500 Technology Company",
      industry: "Enterprise",
      challenge: "Manual processes causing delays and errors across departments",
      solution: "Deployed intelligent automation across 15 business processes",
      results: [
        { metric: "75%", label: "Process Time Reduction" },
        { metric: "95%", label: "Error Reduction" },
        { metric: "$5M", label: "Annual Savings" },
      ],
      image: "/case-study-enterprise.jpg",
      testimonial: "The automation solutions delivered by Peak Point have revolutionized our operations.",
      testimonialAuthor: "CTO, Technology Company",
    },
    {
      slug: "education-training-program",
      title: "Medical Coding Training Program",
      client: "Regional Hospital Network",
      industry: "Education",
      challenge: "Shortage of qualified medical coders affecting operations",
      solution: "Comprehensive training program with certification",
      results: [
        { metric: "50+", label: "Certified Coders Trained" },
        { metric: "98%", label: "Certification Pass Rate" },
        { metric: "30%", label: "Productivity Increase" },
      ],
      image: "/case-study-education.jpg",
      testimonial: "The training program exceeded our expectations and solved our staffing challenges.",
      testimonialAuthor: "HR Director, Hospital Network",
    },
  ]

  const isStrapiDown = !Array.isArray(caseStudiesData)

  // Transform Strapi data to include proper image URLs
  const transformedCaseStudies = caseStudiesData?.map((study: any) => {
    const attrs = study.attributes || study

    return {
      slug: attrs.slug || "",
      title: attrs.title || "",
      client: attrs.client || "",
      industry: attrs.industry || "",
      challenge: attrs.challenge || "",
      solution: attrs.solution || "",
      results: attrs.results || [],
      image: attrs.image?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.image.url}`
        : attrs.image?.data?.attributes?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.image.data.attributes.url}`
          : "/placeholder.svg",
      testimonial: attrs.testimonial || "",
      testimonialAuthor: attrs.testimonialAuthor || "",
    }
  })

  const caseStudies = isStrapiDown ? defaultCaseStudies : (transformedCaseStudies || [])

  return (
    <main className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/business-success-growth-charts-analytics.jpg"
            alt="Case Studies Hero Background"
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
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">Case Studies</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Real results from real partnerships. Discover how we've helped organizations transform their operations
              and achieve measurable success.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {!isStrapiDown && caseStudies.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">📊</div>
              <h2 className="text-3xl font-bold text-foreground mb-4">No Case Studies Available</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're currently updating our case studies. Check back soon to see how we've helped organizations
                transform their operations.
              </p>
              <Button asChild className="bg-accent hover:bg-accent-hover text-white">
                <Link href="/contact">Discuss Your Project →</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-1 gap-16 max-w-6xl mx-auto">
              {caseStudies.map((study: any, index: number) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-xl transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      <div className="text-sm font-semibold text-accent mb-2">{study.industry}</div>
                      <h2 className="text-3xl font-bold text-foreground mb-4">{study.title}</h2>
                      <p className="text-muted-foreground mb-4">
                        <strong className="text-foreground">Challenge:</strong> {study.challenge}
                      </p>
                      <p className="text-muted-foreground mb-6">
                        <strong className="text-foreground">Solution:</strong> {study.solution}
                      </p>

                      {/* Results */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {study.results.map((result: any, idx: number) => (
                          <div key={idx} className="text-center">
                            <div className="text-3xl font-bold text-accent mb-1">{result.metric}</div>
                            <div className="text-sm text-muted-foreground">{result.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Testimonial */}
                      <div className="bg-secondary rounded-lg p-4 mb-6">
                        <p className="text-foreground italic mb-2">"{study.testimonial}"</p>
                        <p className="text-sm text-muted-foreground">— {study.testimonialAuthor}</p>
                      </div>

                      {/* Button */}
                      <Button asChild className="bg-accent hover:bg-accent-hover text-white">
                        <Link href={`/case-studies/${study.slug}`}>Read Full Story →</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Write Your Success Story?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how Peak Point can help you achieve similar results and transform your operations.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-white">
            <Link href="/contact">Get Started →</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
