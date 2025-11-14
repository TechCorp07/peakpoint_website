import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

async function getServiceData() {
  try {
    const data = await strapi.getServicePage("healthcare")
    return data.data
  } catch (error) {
    console.warn("Failed to fetch healthcare service data, using fallback")
    return null
  }
}

export default async function HealthcarePage() {
  const serviceData = await getServiceData()

  const defaultData = {
    title: "Healthcare BPO Services",
    subtitle: "Transforming Healthcare Operations with Precision and Compliance",
    description:
      "Our healthcare BPO solutions combine industry expertise with cutting-edge technology to streamline your operations, reduce costs, and improve patient outcomes.",
    services: [
      {
        name: "Revenue Cycle Management (RCM)",
        description:
          "End-to-end revenue cycle management services including medical billing, coding, claims processing, and denial management to maximize your revenue.",
        features: ["Medical Billing & Coding", "Claims Processing", "Denial Management", "Payment Posting"],
      },
      {
        name: "Medical MRI Data Annotations",
        description:
          "Precise medical imaging annotation services for AI/ML training, research, and diagnostic support with HIPAA-compliant processes.",
        features: ["Image Segmentation", "Organ Detection", "Pathology Identification", "Quality Assurance"],
      },
      {
        name: "Health Equity Solutions",
        description:
          "Data-driven solutions to identify and address healthcare disparities, ensuring equitable access and outcomes for all patient populations.",
        features: ["Disparity Analysis", "Community Outreach", "Cultural Competency Training", "Access Programs"],
      },
    ],
    benefits: [
      "HIPAA Compliant Operations",
      "Certified Medical Coders",
      "24/7 Support Coverage",
      "Advanced Analytics & Reporting",
      "Cost Reduction up to 40%",
      "Improved Patient Satisfaction",
    ],
  }

    const data = serviceData?.attributes 
    ? {
        title: serviceData.attributes.title || defaultData.title,
        subtitle: serviceData.attributes.subtitle || defaultData.subtitle,
        description: serviceData.attributes.description || defaultData.description,
        services: serviceData.attributes.services || defaultData.services,
        benefits: serviceData.attributes.benefits || defaultData.benefits,
      }
    : defaultData
  
  const isStrapiDown = !serviceData

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/30 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-office-with-technology-and-professionals-co.jpg"
            alt="Healthcare Services"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-20">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">{data.title}</h1>
            <p className="text-xl text-primary-foreground/90 mb-8 leading-relaxed">{data.subtitle}</p>
            <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">{data.description}</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/contact">Get Started →</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                <Link href="/case-studies">View Case Studies</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">Our Healthcare Services</h2>
          <div className="grid md:grid-cols-1 gap-12 max-w-5xl mx-auto">
            {data.services.map((service: any, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-br from-secondary to-blue-50/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <h3 className="text-2xl font-bold text-primary mb-4">{service.name}</h3>
                <p className="text-foreground/70 mb-6">{service.description}</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {service.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-center gap-2">
                      {/* Placeholder for icon, to be replaced with actual icon component */}
                      <span className="h-5 w-5 text-accent flex-shrink-0">✓</span>
                      <span className="text-foreground/70">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-b from-secondary to-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">Why Choose Peak Point Healthcare BPO</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.benefits.map((benefit: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Placeholder for icon, to be replaced with actual icon component */}
                <span className="h-6 w-6 text-accent flex-shrink-0">✓</span>
                <span className="text-foreground font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Transform Your Healthcare Operations?
          </h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how our healthcare BPO solutions can help you reduce costs, improve efficiency, and enhance
            patient care.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground">
            <Link href="/contact">Schedule a Consultation →</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
