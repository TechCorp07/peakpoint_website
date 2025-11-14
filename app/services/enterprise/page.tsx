import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

async function getServiceData() {
  try {
    const data = await strapi.getServicePage("enterprise")
    return data.data
  } catch (error) {
    console.warn("Failed to fetch enterprise service data, using fallback")
    return null
  }
}

export default async function EnterprisePage() {
  const serviceData = await getServiceData()

  const defaultData = {
    title: "Enterprise Solutions",
    subtitle: "Scalable Technology Solutions for Modern Enterprises",
    description:
      "Transform your enterprise operations with our comprehensive suite of automation, cloud infrastructure, and security solutions designed for scale and efficiency.",
    services: [
      {
        name: "Workflow Automation",
        description:
          "Streamline business processes with intelligent automation solutions that reduce manual work, minimize errors, and accelerate operations.",
        features: ["Process Automation", "RPA Implementation", "Integration Services", "Custom Workflow Design"],
      },
      {
        name: "Cloud Infrastructure Management",
        description:
          "Expert cloud infrastructure management services ensuring optimal performance, security, and cost-efficiency across AWS, Azure, and Google Cloud.",
        features: ["Cloud Migration", "Infrastructure Optimization", "Cost Management", "24/7 Monitoring"],
      },
      {
        name: "Advanced Security & SOC",
        description:
          "Comprehensive security operations center (SOC) services providing 24/7 threat monitoring, incident response, and compliance management.",
        features: [
          "Threat Detection & Response",
          "Security Monitoring",
          "Compliance Management",
          "Vulnerability Assessment",
        ],
      },
    ],
    benefits: [
      "Enterprise-Grade Security",
      "99.9% Uptime SLA",
      "Scalable Solutions",
      "Cost Optimization",
      "24/7 Expert Support",
      "Compliance Certified",
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
    <main className="pt-20 min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-primary/30 z-10" />
        <div className="absolute inset-0 z-0">
          <Image
            src="/data-analytics-dashboard-with-graphs-and-metrics.jpg"
            alt="Enterprise Solutions"
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
                <Link href="/contact">Request Demo →</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                <Link href="/case-studies">View Success Stories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">Our Enterprise Services</h2>
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
          <h2 className="text-4xl font-bold text-center text-primary mb-16">
            Why Choose Peak Point Enterprise Solutions
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.benefits.map((benefit: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-card p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
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
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Scale Your Enterprise?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how our enterprise solutions can help you achieve operational excellence and drive growth.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground">
            <Link href="/contact">Schedule Consultation →</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
