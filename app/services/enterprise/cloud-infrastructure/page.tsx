import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Cloud, Server, Lock, Gauge } from "lucide-react"

async function getServiceData() {
  try {
    const data = await strapi.getSubService("cloud-infrastructure")
    return data?.data
  } catch (error) {
    return null
  }
}

export default async function CloudInfrastructurePage() {
  const serviceData = await getServiceData()

  const defaultData = {
    title: "Cloud Infrastructure Management",
    subtitle: "Scalable, Secure, Always Available",
    description:
      "Enterprise-grade cloud infrastructure services to power your digital transformation. From migration to optimization, we manage your cloud environment for maximum performance and cost efficiency.",
    features: [
      {
        icon: "Cloud",
        title: "Cloud Migration",
        description: "Seamless migration from on-premise to cloud with zero downtime and data integrity.",
      },
      {
        icon: "Server",
        title: "Infrastructure Management",
        description: "24/7 monitoring, maintenance, and optimization of your cloud resources.",
      },
      {
        icon: "Lock",
        title: "Security & Compliance",
        description: "Enterprise security protocols, compliance management, and disaster recovery.",
      },
      {
        icon: "Gauge",
        title: "Performance Optimization",
        description: "Continuous optimization for speed, reliability, and cost-effectiveness.",
      },
    ],
    benefits: [
      "Multi-Cloud Expertise (AWS, Azure, GCP)",
      "99.99% Uptime SLA",
      "Cost Optimization Strategies",
      "Automated Scaling",
      "24/7 Expert Support",
      "Disaster Recovery Planning",
    ],
    stats: [
      { value: "99.99%", label: "Uptime" },
      { value: "40%", label: "Cost Savings" },
      { value: "24/7", label: "Monitoring" },
      { value: "100+", label: "Migrations" },
    ],
  }

  const data = serviceData 
  ? {
      title: serviceData.title || defaultData.title,
      subtitle: serviceData.subtitle || defaultData.subtitle,
      description: serviceData.description || defaultData.description,
      features: serviceData.features || defaultData.features,
      benefits: serviceData.benefits || defaultData.benefits,
      stats: serviceData.stats || defaultData.stats,
    }
  : defaultData

  const iconMap: any = {
    Cloud,
    Server,
    Lock,
    Gauge,
  }

  return (
    <main className="pt-20 min-h-screen">
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-accent/5 py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                href="/services/enterprise"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-6"
              >
                ← Back to Enterprise Services
              </Link>
              <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">{data.title}</h1>
              <p className="text-2xl text-accent font-semibold mb-6">{data.subtitle}</p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{data.description}</p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {data.stats.map((stat: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Cloud Services</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {data.features.map((feature: any, index: number) => {
                const Icon = iconMap[feature.icon] || CheckCircle
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-secondary to-blue-50/30 rounded-xl p-8 hover:shadow-lg transition-shadow"
                  >
                    <Icon className="h-12 w-12 text-accent mb-4" />
                    <h3 className="text-2xl font-bold text-primary mb-3">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Why Choose Us</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-3 bg-card p-6 rounded-xl shadow-md">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Move to the Cloud?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss your cloud infrastructure needs and create a customized solution.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
              <Link href="/contact">
                Contact Us <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
    </main>
  )
}
