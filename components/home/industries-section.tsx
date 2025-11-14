"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Heart, GraduationCap, Building2, Smartphone, ChevronRight } from "lucide-react"

interface SubService {
  name: string
  description: string
}

interface Industry {
  id: number
  name: string
  icon: string
  description: string
  subServices: SubService[]
}

const iconMap: Record<string, React.ReactNode> = {
  heart: <Heart className="w-10 h-10" />,
  "graduation-cap": <GraduationCap className="w-10 h-10" />,
  building: <Building2 className="w-10 h-10" />,
  smartphone: <Smartphone className="w-10 h-10" />,
}

const defaultIndustries: Industry[] = [
  {
    id: 1,
    name: "Healthcare",
    icon: "heart",
    description: "Comprehensive healthcare solutions from revenue cycle management to medical data services.",
    subServices: [
      { name: "RCM (Revenue Cycle Management)", description: "End-to-end medical billing and claims processing" },
      { name: "Medical MRI Data Annotations", description: "Precise medical imaging data labeling for AI training" },
      { name: "Health Equity Solutions", description: "Improving healthcare access and outcomes for all communities" },
      { name: "Patient Support Services", description: "24/7 patient care coordination and support" },
    ],
  },
  {
    id: 2,
    name: "Education",
    icon: "graduation-cap",
    description: "Training and educational services to build skilled workforce for the future.",
    subServices: [
      { name: "MRI Imaging Training", description: "Professional training for medical imaging specialists" },
      { name: "Data Annotation Training", description: "Comprehensive AI data labeling certification programs" },
      { name: "RCM Training Programs", description: "Healthcare revenue cycle management education" },
      { name: "Professional Development", description: "Continuous learning and skill enhancement programs" },
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    icon: "building",
    description: "Enterprise-grade solutions for workflow automation, cloud management, and security.",
    subServices: [
      { name: "Workflow Automations", description: "Intelligent process automation to boost productivity" },
      { name: "Cloud Infrastructure Management", description: "Expert cloud operations and optimization" },
      { name: "Advanced Security Tools", description: "SOC (Security Operations Center) and threat monitoring" },
      { name: "Business Process Optimization", description: "Streamline operations for maximum efficiency" },
    ],
  },
  {
    id: 4,
    name: "Technology",
    icon: "smartphone",
    description: "Technical support and quality assurance services for technology companies.",
    subServices: [
      { name: "Virtual Tech Support", description: "24/7 remote technical assistance and troubleshooting" },
      { name: "QA Testing & Validation", description: "Comprehensive software quality assurance" },
      { name: "Medical Data Labelling", description: "Specialized healthcare data annotation services" },
      { name: "IT Helpdesk", description: "Multi-tier IT support and ticket management" },
    ],
  },
]

interface IndustriesSectionProps {
  title?: string
  subtitle?: string
  industries?: Industry[]
  showDevWarning?: boolean
}

export function IndustriesSection({
  title = "Industries We Serve",
  subtitle = "Specialized BPO solutions across healthcare, education, enterprise, and technology sectors",
  industries = defaultIndustries,
  showDevWarning = false,
}: IndustriesSectionProps) {
  const [selectedIndustry, setSelectedIndustry] = useState<number | null>(null)

  return (
    <section className="py-24 bg-gradient-to-b from-secondary via-blue-50/30 to-secondary">
      <div className="container mx-auto px-4 lg:px-8">

        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4 text-balance">{title}</h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto text-pretty">{subtitle}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {industries.map((industry, index) => (
            <motion.button
              key={industry.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => setSelectedIndustry(selectedIndustry === industry.id ? null : industry.id)}
              className={`group relative p-8 transition-all duration-300 rounded-2xl ${
                selectedIndustry === industry.id
                  ? "bg-gradient-to-br from-primary to-primary/90 shadow-2xl shadow-primary/20 scale-105"
                  : "bg-card hover:bg-gradient-to-br hover:from-blue-50 hover:to-green-50/30 shadow-lg hover:shadow-xl border border-border"
              }`}
            >
              <div
                className={`mb-4 transition-colors ${selectedIndustry === industry.id ? "text-accent-alt" : "text-accent-alt group-hover:text-accent"}`}
              >
                {iconMap[industry.icon] || iconMap.heart}
              </div>
              <h3
                className={`font-bold text-xl mb-2 ${selectedIndustry === industry.id ? "text-primary-foreground" : "text-primary"}`}
              >
                {industry.name}
              </h3>
              <p
                className={`text-sm ${selectedIndustry === industry.id ? "text-primary-foreground/90" : "text-muted-foreground"}`}
              >
                {industry.description}
              </p>
              <ChevronRight
                className={`absolute bottom-6 right-6 w-5 h-5 transition-transform ${selectedIndustry === industry.id ? "text-primary-foreground rotate-90" : "text-muted-foreground group-hover:translate-x-1"}`}
              />
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedIndustry && (
            <motion.div
              key={selectedIndustry}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {industries
                .filter((ind) => ind.id === selectedIndustry)
                .map((industry) => (
                  <div key={industry.id} className="bg-card border border-border rounded-2xl p-8 shadow-xl">
                    <h3 className="text-2xl font-bold text-primary mb-6">{industry.name} Services</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {industry.subServices.map((service) => (
                        <div
                          key={service.name}
                          className="p-6 rounded-xl bg-gradient-to-br from-blue-50/50 to-green-50/30 border border-border hover:shadow-lg transition-shadow"
                        >
                          <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-accent-alt" />
                            {service.name}
                          </h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
