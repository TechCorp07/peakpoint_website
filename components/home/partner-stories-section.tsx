"use client"

import { motion } from "framer-motion"
import { ExternalLink, Award } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface PartnerStory {
  id: number
  title: string
  partnerName: string
  partnerType: string
  description: string
  featuredImage: string
  partnerLogo: string
  metrics: { label: string; value: string; description?: string }[]
  slug: string
}

interface PartnerStoriesSectionProps {
  partnerStories?: PartnerStory[]
}

const defaultPartnerStories: PartnerStory[] = [
  {
    id: 1,
    title: "Microsoft Azure Partnership: Scaling Healthcare AI",
    partnerName: "Microsoft",
    partnerType: "Technology Partner",
    description:
      "Strategic partnership with Microsoft Azure to deliver cloud-based AI solutions for healthcare providers across Africa, enabling scalable and secure healthcare data processing.",
    featuredImage: "/partner-stories/microsoft-collaboration.jpg",
    partnerLogo: "/partners/microsoft-logo.png",
    metrics: [
      { label: "Healthcare Facilities", value: "12+", description: "Using our platform" },
      { label: "Diagnostic Speed", value: "75%", description: "Faster analysis" },
      { label: "Cost Savings", value: "40%", description: "Infrastructure reduction" },
    ],
    slug: "microsoft-azure-healthcare-ai",
  },
  {
    id: 2,
    title: "AWS Partnership: Secure Financial Processing",
    partnerName: "Amazon Web Services",
    partnerType: "Technology Partner",
    description:
      "Leveraging AWS infrastructure to provide secure, scalable financial data processing for fintech companies across Africa with 99.99% uptime guarantee.",
    featuredImage: "/partner-stories/aws-fintech.jpg",
    partnerLogo: "/partners/aws-logo.png",
    metrics: [
      { label: "Uptime", value: "99.99%", description: "Service availability" },
      { label: "Transactions/Day", value: "2M+", description: "Processed securely" },
      { label: "Compliance", value: "100%", description: "PCI-DSS certified" },
    ],
    slug: "aws-secure-financial-processing",
  },
  {
    id: 3,
    title: "ISO 27001 Certification Excellence",
    partnerName: "International Organization for Standardization",
    partnerType: "Certification Body",
    description:
      "Achieved ISO 27001:2013 certification, demonstrating our commitment to information security management best practices and data protection standards.",
    featuredImage: "/partner-stories/iso-certification.jpg",
    partnerLogo: "/partners/iso-logo.png",
    metrics: [
      { label: "Security Controls", value: "114", description: "Implemented" },
      { label: "Compliance Score", value: "100%", description: "All requirements" },
    ],
    slug: "iso-27001-certification",
  },
]

export function PartnerStoriesSection({ partnerStories = defaultPartnerStories }: PartnerStoriesSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Partner Stories</h2>
          <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
            Real results from real partnerships. See how we collaborate with leading technology partners and
            certification bodies to deliver exceptional solutions.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partnerStories.slice(0, 3).map((story, index) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <Image
                  src={story.featuredImage || "/placeholder.svg"}
                  alt={story.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    {story.partnerType}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Partner Logo */}
                <div className="mb-4 h-8 flex items-center">
                  <Image
                    src={story.partnerLogo || "/placeholder.svg"}
                    alt={story.partnerName}
                    width={120}
                    height={32}
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {story.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{story.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-border">
                  {story.metrics.slice(0, 3).map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-bold text-accent mb-0.5">{metric.value}</div>
                      <div className="text-[10px] text-muted-foreground leading-tight">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/partner-stories/${story.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors group/link"
                >
                  Read Full Story
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            href="/partner-stories"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
          >
            View All Partner Stories
            <ExternalLink className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}