import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, ArrowRight, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Intelligent Automation | Peak Point Services",
  description: "Accelerate processing times while maintaining 99.9% data accuracy",
}

// Fetch benefits from Strapi
async function getBenefitData() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/benefits-section?populate[benefits][populate]=*`,
      { 
        next: { revalidate: 60 },
        headers: {
          'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
        }
      }
    )
    
    if (!response.ok) {
      console.error(`Failed to fetch benefits: ${response.status}`)
      return null
    }
    
    const data = await response.json()
    const benefits = data?.data?.benefits || []
    
    // Find the operational efficiency benefit by link
    const benefit = benefits.find((b: any) => 
      b.link?.includes('intelligent-automation')
    )
    
    return benefit
  } catch (error) {
    console.error('Error fetching benefit:', error)
    return null
  }
}

export default async function OperationalEfficiencyPage() {
  const benefit = await getBenefitData()
  
  // Fallback data if CMS is unavailable
  const data = benefit || {
    title: "Operational Efficiency",
    description: "We combine AI automation with elite talent to streamline workflows",
    impact: "Reduce operational costs by up to 40% immediately",
    caseStudyTitle: "Efficiency in Action",
    caseStudySubtitle: "Transforming Revenue Cycles for a 12-Hospital Network",
    challenge: "<p>A regional hospital network was losing millions annually due to administrative bloat. Their internal billing team was overwhelmed, leading to a 30% claim denial rate and a backlog of accounts receivable (A/R) exceeding 90 days.</p>",
    solution: "<p>We deployed our \"Cost Efficiency\" model, integrating an AI-powered claims scrubbing tool with a dedicated team of certified medical coders. The AI handled the repetitive data validation, while our experts managed complex appeals.</p>",
    results: [
      { metric: "65%", description: "Reduction in claim denial rates within 6 months" },
      { metric: "$2.4M", description: "Increase in recovered revenue in the first year" },
      { metric: "40%", description: "Decrease in administrative overhead costs" }
    ],
    industryInsight: "According to the HFMA, up to 90% of claim denials are preventable. Our intelligent process stops them before they happen.",
    image: { url: "/placeholder.svg" }
  }
  
  const heroImage = data.image?.url 
    ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.image.url}`
    : data.image?.data?.attributes?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${data.image.data.attributes.url}`
      : "/placeholder.svg"
  
  const additionalImages = Array.isArray(data.additionalImages) 
    ? data.additionalImages.map((img: any) => 
        img.url 
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.url}`
          : img?.data?.attributes?.url
            ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${img.data.attributes.url}`
            : null
      ).filter(Boolean)
    : []
  
  const results = Array.isArray(data.results) && data.results.length > 0
    ? data.results
    : data.results || []
  
  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt={data.caseStudyTitle || data.title}
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
              {data.caseStudyTitle || data.title}
            </h1>
            <p className="text-2xl text-primary-foreground/90 mb-8 leading-relaxed">
              {data.caseStudySubtitle || data.description}
            </p>
            {data.impact && (
              <div className="inline-block bg-accent px-6 py-3 rounded-full">
                <p className="text-lg font-semibold text-accent-foreground">
                  {data.impact}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <p className="text-xl text-foreground leading-relaxed">
              {data.description}
            </p>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      {data.challenge && (
        <section className="py-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-card rounded-2xl p-8 md:p-12 shadow-lg border border-border">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  The Challenge
                </h2>
                <div 
                  className="prose prose-lg max-w-none text-foreground/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data.challenge }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Solution Section */}
      {data.solution && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-8 md:p-12 border border-accent/20">
                <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6">
                  The Peak Point Solution
                </h2>
                <div 
                  className="prose prose-lg max-w-none text-foreground/90 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: data.solution }}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results Section */}
      {results.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12 text-center">
                The Results
              </h2>
              <div className="grid gap-6">
                {results.map((result: any, index: number) => (
                  <div 
                    key={index}
                    className="bg-card rounded-xl p-6 shadow-md border border-border hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-8 h-8 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-primary mb-2">
                          {result.metric}
                        </h3>
                        <p className="text-foreground/80 leading-relaxed">
                          {result.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Industry Insight Section */}
      {data.industryInsight && (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-blue-50 to-green-50/30 rounded-2xl p-8 border-l-4 border-accent">
                <p className="text-lg text-foreground/90 leading-relaxed italic">
                  <strong className="text-primary">Industry Insight:</strong> {data.industryInsight}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Additional Images Gallery */}
      {additionalImages.length > 0 && (
        <section className="py-20 bg-secondary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-primary mb-12 text-center">
                Visual Impact
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {additionalImages.map((img: string, index: number) => (
                  <div 
                    key={index}
                    className="relative aspect-video rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
                  >
                    <Image
                      src={img}
                      alt={`Operational Efficiency - Image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Video Section */}
      {data.videoUrl && (
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-primary mb-12 text-center">
                See It In Action
              </h2>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src={data.videoUrl}
                  title="Operational Efficiency Video"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Operations?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can deliver similar results for your organization.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground">
              <Link href="/contact">
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}