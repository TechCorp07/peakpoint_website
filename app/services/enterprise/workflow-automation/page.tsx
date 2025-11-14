import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = "force-dynamic"

const defaultData = {
  title: "Workflow Automation",
  subtitle: "Streamline Operations, Boost Productivity",
  description:
    "Transform your business processes with intelligent automation solutions. Reduce manual tasks, eliminate errors, and accelerate operations with our enterprise-grade workflow automation services.",
  features: [
    {
      icon: "🔄",
      title: "Process Automation",
      description: "Automate repetitive tasks and complex workflows across departments and systems.",
    },
    {
      icon: "⚡",
      title: "Integration Services",
      description: "Seamlessly connect your existing tools and platforms for unified operations.",
    },
    {
      icon: "📊",
      title: "Analytics & Reporting",
      description: "Real-time insights and automated reporting for data-driven decision making.",
    },
    {
      icon: "⚙️",
      title: "Custom Solutions",
      description: "Tailored automation workflows designed specifically for your business needs.",
    },
  ],
  benefits: [
    "70% Reduction in Manual Tasks",
    "99.9% Process Accuracy",
    "24/7 Automated Operations",
    "Scalable Architecture",
    "ROI Within 6 Months",
    "Dedicated Support Team",
  ],
  stats: [
    { value: "70%", label: "Time Saved" },
    { value: "50+", label: "Integrations" },
    { value: "99.9%", label: "Uptime" },
    { value: "3x", label: "Productivity Gain" },
  ],
}

async function getServiceData() {
  try {
    const data = await strapi.getSubService("workflow-automation")
    return data?.data
  } catch (error) {
    return null
  }
}

export default async function WorkflowAutomationPage() {
  const serviceData = await getServiceData()

  const strapiData = serviceData?.attributes || serviceData

  const isStrapiDown = !strapiData || typeof strapiData !== "object" || !strapiData.title
  const data = isStrapiDown ? defaultData : { ...defaultData, ...strapiData }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">

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
                <Link href="/contact">Get Started →</Link>
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Automation Solutions</h2>
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Key Benefits</h2>
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
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Automate Your Workflows?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how workflow automation can transform your business operations.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
              <Link href="/contact">Schedule Demo →</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
