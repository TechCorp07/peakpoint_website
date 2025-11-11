import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Headphones, Clock, Users, Zap } from "lucide-react"

async function getServiceData() {
  try {
    const data = await strapi.getSubService("virtual-tech-support")
    return data?.data
  } catch (error) {
    return null
  }
}

export default async function VirtualTechSupportPage() {
  const serviceData = await getServiceData()

  const defaultData = {
    title: "Virtual Tech Support",
    subtitle: "Expert Technical Assistance, Anytime",
    description:
      "Comprehensive remote technical support services for your business. Our certified technicians provide fast, reliable assistance for all your IT needs, ensuring minimal downtime and maximum productivity.",
    features: [
      {
        icon: "Headphones",
        title: "Multi-Channel Support",
        description: "Phone, email, chat, and remote desktop support available across all channels.",
      },
      {
        icon: "Clock",
        title: "24/7 Availability",
        description: "Round-the-clock technical support to keep your business running smoothly.",
      },
      {
        icon: "Users",
        title: "Certified Technicians",
        description: "Experienced IT professionals with industry certifications and expertise.",
      },
      {
        icon: "Zap",
        title: "Rapid Response",
        description: "Average response time under 5 minutes with priority escalation protocols.",
      },
    ],
    benefits: [
      "24/7 Technical Support",
      "Multi-Language Support",
      "Remote Desktop Assistance",
      "Ticket Management System",
      "Knowledge Base Access",
      "SLA-Backed Service",
    ],
    stats: [
      { value: "<5min", label: "Response Time" },
      { value: "95%", label: "First-Call Resolution" },
      { value: "24/7", label: "Availability" },
      { value: "98%", label: "Customer Satisfaction" },
    ],
  }

  const data = serviceData || defaultData

  const iconMap: any = {
    Headphones,
    Clock,
    Users,
    Zap,
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-accent/5 py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                href="/services/technology"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-6"
              >
                ← Back to Technology Services
              </Link>
              <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">{data.title}</h1>
              <p className="text-2xl text-accent font-semibold mb-6">{data.subtitle}</p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{data.description}</p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
                <Link href="/contact">
                  Get Support <ArrowRight className="ml-2 h-5 w-5" />
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Support Services</h2>
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Service Features</h2>
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
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">Need Technical Support?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get expert technical assistance from our certified support team available 24/7.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
              <Link href="/contact">
                Contact Support <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
