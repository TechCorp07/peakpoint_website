"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface Benefit {
  id: number
  title: string
  description: string
  impact: string
  image: string
  link: string
}

const defaultBenefits: Benefit[] = [
  {
    id: 1,
    title: "Cost Optimization",
    description: "Reduce operational expenses by up to 60% while maintaining quality",
    impact: "Average savings of $500K annually for mid-size enterprises",
    image: "/financial-growth-chart-with-upward-trend.jpg",
    link: "/benefits/cost-optimization",
  },
  {
    id: 2,
    title: "Scalability & Flexibility",
    description: "Scale your operations up or down based on business needs",
    impact: "Deploy teams of 5-500+ in under 2 weeks",
    image: "/diverse-professional-team-collaborating.jpg",
    link: "/benefits/scalability",
  },
  {
    id: 3,
    title: "Focus on Core Business",
    description: "Free up internal resources to focus on strategic initiatives",
    impact: "30% increase in productivity for core teams",
    image: "/modern-office-with-technology-and-professionals-co.jpg",
    link: "/benefits/core-focus",
  },
  {
    id: 4,
    title: "Access to Expertise",
    description: "Tap into specialized skills and industry knowledge",
    impact: "500+ certified professionals across all verticals",
    image: "/cybersecurity-shield-protecting-data.jpg",
    link: "/benefits/expertise",
  },
  {
    id: 5,
    title: "24/7 Operations",
    description: "Round-the-clock support across multiple African time zones",
    impact: "99.9% uptime with follow-the-sun coverage",
    image: "/global-24-7-operations-world-map.jpg",
    link: "/benefits/24-7-operations",
  },
  {
    id: 6,
    title: "Quality Assurance",
    description: "Enterprise-grade quality with continuous monitoring",
    impact: "99.8% accuracy rate with Six Sigma processes",
    image: "/quality-assurance-certification-badge.jpg",
    link: "/benefits/quality",
  },
]

interface BenefitsCarouselProps {
  benefits?: Benefit[]
  sectionTitle?: string
  sectionSubtitle?: string
  showDevWarning?: boolean
}

export function BenefitsCarousel({
  benefits = defaultBenefits,
  sectionTitle = "Why Partner With Peak Point",
  sectionSubtitle = "Discover the advantages that set us apart",
  showDevWarning = false,
}: BenefitsCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const tilesPerView = 3
  const totalSlides = Math.ceil(benefits.length / tilesPerView)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const visibleBenefits = benefits.slice(currentSlide * tilesPerView, (currentSlide + 1) * tilesPerView)

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/20 relative">
      {showDevWarning && (
        <div className="absolute top-0 left-0 right-0 z-20 bg-yellow-50 border-b border-yellow-200 py-2 px-4 text-center">
          <p className="text-xs text-yellow-800">
            ⚠️ Development Mode: Showing sample benefits. Connect Strapi CMS to manage benefits content.
          </p>
        </div>
      )}

      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance">{sectionTitle}</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">{sectionSubtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {visibleBenefits.map((benefit, index) => (
            <motion.div
              key={benefit.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-card rounded-2xl overflow-hidden border border-border hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden bg-secondary">
                <img
                  src={benefit.image || "/placeholder.svg?height=400&width=600"}
                  alt={benefit.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{benefit.description}</p>
                <div className="rounded-lg p-4 mb-4 bg-popover-foreground">
                  <p className="text-sm font-semibold text-accent">{benefit.impact}</p>
                </div>
                <Link
                  href={benefit.link}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent/80 transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {totalSlides > 1 && (
          <div className="flex justify-center gap-3 mt-12">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors"
              aria-label="Previous benefits"
            >
              ←
            </button>
            <div className="flex items-center gap-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? "w-8 bg-accent" : "w-2 bg-accent/30"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-accent/10 hover:bg-accent/20 flex items-center justify-center transition-colors"
              aria-label="Next benefits"
            >
              →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
