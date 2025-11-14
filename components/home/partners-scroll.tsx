"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface Partner {
  id: number
  name: string
  logo: string
  website?: string
}

const defaultPartners: Partner[] = [
  { id: 1, name: "Microsoft", logo: "/microsoft-logo.png" },
  { id: 2, name: "AWS", logo: "/aws-logo.png" },
  { id: 3, name: "Google Cloud", logo: "/partners/google-cloud.png" },
  { id: 4, name: "Salesforce", logo: "/salesforce-logo.png" },
  { id: 5, name: "Oracle", logo: "/oracle-logo-abstract.png" },
  { id: 6, name: "SAP", logo: "/sap-logo.png" },
]

interface PartnersScrollProps {
  partners?: Partner[]
  sectionTitle?: string
  showDevWarning?: boolean
}

export function PartnersScroll({
  partners = defaultPartners,
  sectionTitle = "Trusted Partners & Certifications",
  showDevWarning = false,
}: PartnersScrollProps) {
  const allPartners = [...partners, ...partners]

  return (
    <section className="py-16 bg-white border-y border-slate-200 relative">

      <div className="container mx-auto px-4 mb-8">
        <h3 className="text-2xl font-semibold text-center text-slate-900">{sectionTitle}</h3>
      </div>

      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-16"
          animate={{
            x: [0, -1920],
          }}
          transition={{
            x: {
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
        >
          {allPartners.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300"
            >
              <Image
                src={partner.logo || "/placeholder.svg"}
                alt={partner.name}
                width={120}
                height={60}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
