import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ExternalLink } from "lucide-react"

async function getPartnerStories() {
  try {
    const data = await strapi.getPartnerStories()
    if (!Array.isArray(data)) {
      console.warn("getPartnerStories() did not return an array:", data)
      return null
    }
    return data
  } catch (error) {
    console.warn("Failed to fetch partner stories, using fallback", error)
    return null
  }
}

export default async function PartnerStoriesPage() {
  const partnerStoriesData = await getPartnerStories()

  const defaultPartnerStories = [
    {
      slug: "microsoft-azure-healthcare-ai",
      title: "Microsoft Azure Partnership: Scaling Healthcare AI",
      partnerName: "Microsoft",
      partnerType: "Technology Partner",
      description:
        "Strategic partnership with Microsoft Azure to deliver cloud-based AI solutions for healthcare providers across Africa.",
      featuredImage: "/partner-stories/microsoft-collaboration.jpg",
      partnerLogo: "/partners/microsoft-logo.png",
      metrics: [
        { label: "Healthcare Facilities", value: "12+", description: "Using our platform" },
        { label: "Diagnostic Speed", value: "75%", description: "Faster analysis" },
        { label: "Cost Savings", value: "40%", description: "Infrastructure reduction" },
      ],
    },
    {
      slug: "aws-secure-financial-processing",
      title: "AWS Partnership: Secure Financial Data Processing",
      partnerName: "Amazon Web Services",
      partnerType: "Technology Partner",
      description:
        "Leveraging AWS infrastructure to provide secure, scalable financial data processing for fintech companies.",
      featuredImage: "/partner-stories/aws-fintech.jpg",
      partnerLogo: "/partners/aws-logo.png",
      metrics: [
        { label: "Uptime", value: "99.99%", description: "Service availability" },
        { label: "Transactions/Day", value: "2M+", description: "Processed securely" },
        { label: "Compliance", value: "100%", description: "PCI-DSS certified" },
      ],
    },
    {
      slug: "iso-27001-certification",
      title: "ISO 27001 Certification: Information Security Excellence",
      partnerName: "International Organization for Standardization",
      partnerType: "Certification Body",
      description: "Achieved ISO 27001:2013 certification, demonstrating our commitment to information security.",
      featuredImage: "/partner-stories/iso-certification.jpg",
      partnerLogo: "/partners/iso-logo.png",
      metrics: [
        { label: "Security Controls", value: "114", description: "Implemented and audited" },
        { label: "Compliance Score", value: "100%", description: "All critical requirements" },
      ],
    },
  ]

  const isStrapiDown = !Array.isArray(partnerStoriesData)

  // Transform Strapi data to include proper image URLs
  const transformedPartnerStories = partnerStoriesData?.map((story: any) => {
    const attrs = story.attributes || story

    return {
      slug: attrs.slug || "",
      title: attrs.title || "",
      partnerName: attrs.partnerName || "",
      partnerType: attrs.partnerType || "",
      description: attrs.description || "",
      featuredImage: attrs.featuredImage?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.featuredImage.url}`
        : attrs.featuredImage?.data?.attributes?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.featuredImage.data.attributes.url}`
          : "/placeholder.svg",
      partnerLogo: attrs.partnerLogo?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.partnerLogo.url}`
        : attrs.partnerLogo?.data?.attributes?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.partnerLogo.data.attributes.url}`
          : "/placeholder.svg",
      metrics: attrs.metrics || [],
    }
  }) || []

  const partnerStories = isStrapiDown ? defaultPartnerStories : transformedPartnerStories

  return (
    <main className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/business-partnership-collaboration.jpg"
            alt="Partner Stories Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 to-primary/80" />
        </div>
        <div className="relative container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">Our Partner Stories</h1>
            <p className="text-xl text-primary-foreground/90 leading-relaxed">
              Real results from real partnerships. Discover how we collaborate with leading technology partners and
              certification bodies to deliver exceptional solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Partner Stories Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          {!isStrapiDown && partnerStories.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🤝</div>
              <h2 className="text-3xl font-bold text-foreground mb-4">No Partner Stories Available</h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're currently updating our partner stories. Check back soon to see our latest collaborations.
              </p>
              <Button asChild className="bg-accent hover:bg-accent-hover text-white">
                <Link href="/contact">Become a Partner →</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-1 gap-16 max-w-6xl mx-auto">
              {partnerStories.map((story: any, index: number) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-xl transition-all"
                >
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Image */}
                    <div className="relative h-64 md:h-auto">
                      <Image
                        src={story.featuredImage || "/placeholder.svg"}
                        alt={story.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
                          {story.partnerType}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8">
                      {/* Partner Logo */}
                      <div className="mb-4 h-12 flex items-center">
                        <Image
                          src={story.partnerLogo || "/placeholder.svg"}
                          alt={story.partnerName}
                          width={150}
                          height={48}
                          className="object-contain"
                        />
                      </div>

                      <h2 className="text-3xl font-bold text-foreground mb-4">{story.title}</h2>
                      <p className="text-muted-foreground mb-6">{story.description}</p>

                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {story.metrics?.map((metric: any, idx: number) => (
                          <div key={idx} className="text-center">
                            <div className="text-2xl font-bold text-accent mb-1">{metric.value}</div>
                            <div className="text-xs text-muted-foreground">{metric.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* Button */}
                      <Button asChild className="bg-accent hover:bg-accent-hover text-white">
                        <Link href={`/partner-stories/${story.slug}`}>
                          Read Full Story <ExternalLink className="ml-2 w-4 h-4" />
                        </Link>
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
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">Become Our Partner</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join our network of leading partners to drive innovation and create impact together.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-white">
            <Link href="/about/partnerships">Partner With Us →</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}