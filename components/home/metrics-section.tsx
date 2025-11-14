"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { TrendingUp, Users, Globe, Award, Target, Shield } from "lucide-react"

interface Metric {
  id: number
  value: number
  suffix: string
  label: string
  icon: string
}

const defaultMetrics: Metric[] = [
  { id: 1, value: 500, suffix: "+", label: "Global Clients", icon: "globe" },
  { id: 2, value: 2000, suffix: "+", label: "Team Members", icon: "users" },
  { id: 3, value: 98, suffix: "%", label: "Client Satisfaction", icon: "award" },
  { id: 4, value: 40, suffix: "%", label: "Cost Reduction", icon: "trending-up" },
]

function getIcon(iconName: string) {
  const icons: Record<string, React.ReactNode> = {
    globe: <Globe className="w-8 h-8" />,
    users: <Users className="w-8 h-8" />,
    award: <Award className="w-8 h-8" />,
    "trending-up": <TrendingUp className="w-8 h-8" />,
    target: <Target className="w-8 h-8" />,
    shield: <Shield className="w-8 h-8" />,
  }
  return icons[iconName] || icons.award
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = value / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [value])

  return (
    <span className="text-5xl md:text-6xl font-bold text-primary">
      {count}
      {suffix}
    </span>
  )
}

interface MetricsSectionProps {
  metrics?: Metric[]
  sectionTitle?: string
  sectionSubtitle?: string
  showDevWarning?: boolean
}

export function MetricsSection({
  metrics = defaultMetrics,
  sectionTitle = "Delivering Measurable Results",
  sectionSubtitle = "Our track record speaks for itself",
  showDevWarning = false,
}: MetricsSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-secondary via-blue-50/30 to-muted relative">

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{sectionTitle}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{sectionSubtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-4">
                {getIcon(metric.icon)}
              </div>
              <div className="text-5xl md:text-6xl font-bold text-primary">
                <AnimatedCounter value={metric.value} suffix={metric.suffix} />
              </div>
              <p className="text-lg text-muted-foreground mt-2">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
