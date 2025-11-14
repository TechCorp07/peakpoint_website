import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = "force-dynamic"

const defaultData = {
  title: "IT Helpdesk Services",
  subtitle: "Reliable IT Support for Your Business",
  description:
    "Comprehensive IT helpdesk services providing first-line support for all your technology needs. From password resets to complex troubleshooting, our team keeps your business running smoothly.",
  features: [
    {
      icon: "🎧",
      title: "Multi-Channel Support",
      description: "Support via phone, email, chat, and ticketing system for maximum accessibility.",
    },
    {
      icon: "🔧",
      title: "Technical Troubleshooting",
      description: "Expert resolution of hardware, software, and network issues.",
    },
    {
      icon: "🛡️",
      title: "Security Management",
      description: "Password resets, access management, and security incident handling.",
    },
    {
      icon: "⏱️",
      title: "Fast Response Times",
      description: "Average response time under 10 minutes with priority escalation.",
    },
  ],
  benefits: [
    "24/7 Helpdesk Coverage",
    "ITIL-Certified Technicians",
    "Ticket Management System",
    "Knowledge Base & Self-Service",
    "Asset Management",
    "SLA-Backed Service Levels",
  ],
  stats: [
    { value: "<10min", label: "Response Time" },
    { value: "90%", label: "First-Call Resolution" },
    { value: "24/7", label: "Support Available" },
    { value: "99%", label: "Customer Satisfaction" },
  ],
}

async function getServiceData() {
  try {
    const data = await strapi.getSubService("it-helpdesk")
    return data?.data
  } catch (error) {
    return null
  }
}

export default async function ITHelpdeskPage() {
  const serviceData = await getServiceData()

  const strapiData = serviceData?.attributes || serviceData

  const isStrapiDown = !strapiData || typeof strapiData !== "object" || !strapiData.title
  const data = isStrapiDown ? defaultData : { ...defaultData, ...strapiData }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {isStrapiDown && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="container mx-auto px-4 lg:px-8">
              <p className="text-sm text-yellow-700">
                ⚠️ <strong>Development Mode:</strong> Showing sample content. Connect Strapi CMS to manage real content.
              </p>
            </div>
          </div>
        )}

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
                <Link href="/contact">Get Support →</Link>
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Helpdesk Services</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {data.features.map((feature: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-secondary to-blue-50/30 rounded-xl p-8 hover:shadow-lg transition-shadow"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold text-primary mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Service Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {data.benefits.map((benefit: string, index: number) => (
                <div key={index} className="flex items-start gap-3 bg-card p-6 rounded-xl shadow-md">
                  <span className="text-accent text-xl">✓</span>
                  <span className="text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">Need IT Support?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get reliable IT helpdesk services to keep your business technology running smoothly.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
              <Link href="/contact">Contact Helpdesk →</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
