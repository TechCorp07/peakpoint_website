import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, FileText, DollarSign, Shield, TrendingUp } from "lucide-react"

async function getServiceData() {
  try {
    const data = await strapi.getSubService("rcm-training")
    return data?.data
  } catch (error) {
    return null
  }
}

export default async function RCMTrainingPage() {
  const serviceData = await getServiceData()

  const defaultData = {
    title: "RCM Training Programs",
    subtitle: "Become a Revenue Cycle Management Expert",
    description:
      "Comprehensive training in medical billing, coding, and revenue cycle management. Prepare for industry certifications and launch your career in healthcare finance.",
    features: [
      {
        icon: "FileText",
        title: "Medical Coding",
        description: "Master ICD-10, CPT, and HCPCS coding systems with real-world case studies.",
      },
      {
        icon: "DollarSign",
        title: "Billing Operations",
        description: "Learn end-to-end billing processes, claims submission, and payment posting.",
      },
      {
        icon: "Shield",
        title: "Compliance Training",
        description: "HIPAA regulations, fraud prevention, and healthcare compliance standards.",
      },
      {
        icon: "TrendingUp",
        title: "Denial Management",
        description: "Strategies for preventing denials and managing appeals effectively.",
      },
    ],
    benefits: [
      "CPC & CCS Exam Preparation",
      "AAPC & AHIMA Approved",
      "Hands-On Practice with EHR Systems",
      "Job-Ready Skills Training",
      "Internship Opportunities",
      "Lifetime Learning Resources",
    ],
    stats: [
      { value: "800+", label: "Certified Graduates" },
      { value: "92%", label: "Pass Rate" },
      { value: "6-12", label: "Weeks to Complete" },
      { value: "100%", label: "Career Support" },
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
    FileText,
    DollarSign,
    Shield,
    TrendingUp,
  }

  return (
    <main className="pt-20 min-h-screen">
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-accent/5 py-24">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Link
                href="/services/education"
                className="inline-flex items-center text-sm text-muted-foreground hover:text-accent mb-6"
              >
                ← Back to Education Services
              </Link>
              <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">{data.title}</h1>
              <p className="text-2xl text-accent font-semibold mb-6">{data.subtitle}</p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{data.description}</p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
                <Link href="/contact">
                  Start Training <ArrowRight className="ml-2 h-5 w-5" />
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Training Modules</h2>
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Program Highlights</h2>
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
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">Start Your Healthcare Career</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get certified in revenue cycle management and join the growing healthcare finance industry.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
              <Link href="/contact">
                Apply Now <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
    </main>
  )
}
