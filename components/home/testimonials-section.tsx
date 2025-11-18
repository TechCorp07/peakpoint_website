"use client"

import { motion } from "framer-motion"
import { Play, ExternalLink } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CaseStudy {
  id: number
  title: string
  client: string
  industry: string
  description: string
  videoUrl?: string
  image: string
  metrics: { label: string; value: string; icon?: string }[]
  logo: string
  slug: string
}

interface TestimonialsSectionProps {
  caseStudies?: CaseStudy[]
}

const defaultCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Healthcare Revenue Cycle Transformation",
    client: "Regional Hospital Network",
    industry: "Healthcare",
    description:
      "Transformed revenue cycle management for a 12-hospital network, reducing claim denials and accelerating payments through AI-powered automation and expert medical billing teams.",
    videoUrl: "/videos/healthcare-case-study.mp4",
    image: "/healthcare-technology-integration.png",
    metrics: [
      { label: "Denial Rate Reduction", value: "65%" },
      { label: "Faster Payments", value: "40%" },
      { label: "Revenue Increase", value: "$2.4M" },
    ],
    logo: "/clients/healthcare-plus-logo.png",
    slug: "healthcare-revenue-cycle",
  },
  {
    id: 2,
    title: "E-commerce Support Scaling",
    client: "Leading Online Retailer",
    industry: "Retail",
    description:
      "Scaled customer support operations 3x during peak season while maintaining exceptional service quality and reducing operational costs by 35%.",
    image: "/customer-support-center.jpg",
    metrics: [
      { label: "Capacity Increase", value: "300%" },
      { label: "CSAT Score", value: "4.8/5" },
      { label: "Cost Savings", value: "35%" },
    ],
    logo: "/clients/retailcorp-logo.png",
    slug: "ecommerce-support-scaling",
  },
  {
    id: 3,
    title: "FinTech Operations Excellence",
    client: "Digital Banking Platform",
    industry: "Finance",
    description:
      "Delivered comprehensive back-office support for a rapidly growing fintech, enabling them to scale from 50K to 500K users while maintaining compliance and security.",
    videoUrl: "/videos/fintech-case-study.mp4",
    image: "/fintech-operations.jpg",
    metrics: [
      { label: "User Growth", value: "10x" },
      { label: "Processing Time", value: "-60%" },
      { label: "Compliance Rate", value: "100%" },
    ],
    logo: "/clients/fintech-solutions-logo.png",
    slug: "fintech-operations",
  },
]

export function TestimonialsSection({ caseStudies = defaultCaseStudies }: TestimonialsSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary/30 to-background opacity-100">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">
            Success Stories That Speak Volumes
          </h2>
          <p className="text-xl max-w-3xl mx-auto text-pretty text-muted">
            Real results from real partnerships. See how we've transformed operations for leading companies across
            Africa and beyond.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300"
            >
              {/* Image/Video Section */}
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <Image
                  src={study.image || "/placeholder.svg"}
                  alt={study.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {study.videoUrl && (
                  <div className="absolute inset-0 bg-primary/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shadow-lg">
                      <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-accent/90 backdrop-blur-sm text-primary text-xs font-semibold rounded-full">
                    {study.industry}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-6">
                {/* Client Logo */}
                <div className="mb-4 h-8 flex items-center">
                  <Image
                    src={study.logo || "/placeholder.svg"}
                    alt={study.client}
                    width={120}
                    height={32}
                    className="object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {study.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3">{study.description}</p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-4 pb-4 border-b border-border">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-lg font-bold text-accent mb-0.5">{metric.value}</div>
                      <div className="text-[10px] text-muted-foreground leading-tight">{metric.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link
                  href={`/case-studies/${study.slug}`}
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
            href="/insights/case-studies"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-semibold rounded-lg hover:bg-accent/90 transition-colors shadow-lg shadow-accent/20"
          >
            View All Case Studies
            <ExternalLink className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
