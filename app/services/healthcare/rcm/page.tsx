import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = "force-dynamic"

const defaultData = {
  title: "Revenue Cycle Management (RCM)",
  subtitle: "Maximize Revenue, Minimize Denials",
  description:
    "Our comprehensive RCM services streamline your entire revenue cycle from patient registration to final payment, ensuring maximum reimbursement and minimal administrative burden.",
  features: [
    {
      icon: "💰",
      title: "Medical Billing & Coding",
      description: "Certified coders ensure accurate ICD-10, CPT, and HCPCS coding for optimal reimbursement.",
    },
    {
      icon: "📈",
      title: "Claims Processing",
      description: "Fast, accurate claims submission with real-time tracking and status updates.",
    },
    {
      icon: "🛡️",
      title: "Denial Management",
      description: "Proactive denial prevention and expert appeals management to recover lost revenue.",
    },
    {
      icon: "⏱️",
      title: "Payment Posting",
      description: "Timely and accurate payment posting with detailed reconciliation reports.",
    },
  ],
  benefits: [
    "95%+ First-Pass Claim Acceptance Rate",
    "30-40% Reduction in Days in A/R",
    "HIPAA Compliant Processes",
    "Certified Medical Coders (CPC, CCS)",
    "Real-Time Analytics Dashboard",
    "Dedicated Account Manager",
  ],
  stats: [
    { value: "95%", label: "Clean Claims Rate" },
    { value: "40%", label: "Cost Reduction" },
    { value: "24/7", label: "Support Coverage" },
    { value: "99.9%", label: "Accuracy Rate" },
  ],
}

async function getServiceData() {
  try {
    const data = await strapi.getSubService("rcm")
    return data?.data
  } catch (error) {
    return null
  }
}

export default async function RCMPage() {
  const serviceData = await getServiceData()

  const strapiData = serviceData?.attributes || serviceData

  const isStrapiDown = !strapiData || typeof strapiData !== "object" || !strapiData.title
  const data = isStrapiDown ? defaultData : { ...defaultData, ...strapiData }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        {/* Strapi down warning banner */}
        {isStrapiDown && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="container mx-auto px-4 lg:px-8">
              <p className="text-sm text-yellow-700">
                ⚠️ <strong>Development Mode:</strong> Showing sample content. Connect Strapi CMS to manage real content.
              </p>
            </div>
          </div>
        )}

        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-accent/5 py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                href="/services/healthcare"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-6"
              >
                ← Back to Healthcare Services
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

        {/* Stats Section */}
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

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Comprehensive RCM Services</h2>
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

        {/* Benefits Section */}
        <section className="py-20 bg-gradient-to-b from-secondary to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Why Choose Our RCM Services</h2>
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

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-primary/80">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Optimize Your Revenue Cycle?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how our RCM services can help you increase collections and reduce administrative costs.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
              <Link href="/contact">Schedule a Consultation →</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
