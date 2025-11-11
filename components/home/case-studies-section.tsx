"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface CaseStudy {
  id: number
  title: string
  client: string
  industry: string
  challenge: string
  result: string
  metrics: { label: string; value: string }[]
  image: string
}

interface CaseStudiesSectionProps {
  caseStudies?: CaseStudy[]
}

const defaultCaseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Healthcare Revenue Cycle Transformation",
    client: "Regional Hospital Network",
    industry: "Healthcare",
    challenge: "High claim denial rates and slow payment cycles",
    result: "Reduced denial rates by 65% and accelerated payment cycles by 40%",
    metrics: [
      { label: "Denial Rate Reduction", value: "65%" },
      { label: "Faster Payments", value: "40%" },
      { label: "Revenue Increase", value: "$2.4M" },
    ],
    image: "/healthcare-technology-integration.png",
  },
  {
    id: 2,
    title: "Retail Customer Support Scaling",
    client: "E-commerce Platform",
    industry: "Retail",
    challenge: "Seasonal demand spikes overwhelming support team",
    result: "Scaled support capacity 3x while maintaining quality and reducing costs",
    metrics: [
      { label: "Capacity Increase", value: "300%" },
      { label: "CSAT Score", value: "4.8/5" },
      { label: "Cost Savings", value: "35%" },
    ],
    image: "/customer-support-center.jpg",
  },
]

export function CaseStudiesSection({ caseStudies = defaultCaseStudies }: CaseStudiesSectionProps) {
  return (
    <section className="py-24 bg-slate-200">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Our Partners Stories</h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">Real results from real partnerships</p>
        </motion.div>

        <div className="space-y-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grid md:grid-cols-2 gap-8 items-center rounded-2xl overflow-hidden hover:shadow-xl transition-shadow bg-popover-foreground"
            >
              <div className={`relative h-80 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                <Image src={study.image || "/placeholder.svg"} alt={study.title} fill className="object-cover" />
              </div>

              <div className={`p-8 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                  {study.industry}
                </span>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">{study.title}</h3>
                <p className="text-slate-600 mb-2">
                  <strong>Client:</strong> {study.client}
                </p>
                <p className="text-slate-600 mb-2">
                  <strong>Challenge:</strong> {study.challenge}
                </p>
                <p className="text-slate-900 font-medium mb-6">
                  <strong>Result:</strong> {study.result}
                </p>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="text-center">
                      <div className="text-2xl font-bold text-emerald-600 mb-1">{metric.value}</div>
                      <div className="text-xs text-slate-600">{metric.label}</div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/insights"
                  className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium group"
                >
                  Read Full Case Study
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
