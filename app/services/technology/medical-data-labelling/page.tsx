import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Brain, ImageIcon, FileText, Target } from "lucide-react"

async function getServiceData() {
  try {
    const data = await strapi.getSubService("medical-data-labelling")
    return data?.data
  } catch (error) {
    return null
  }
}

export default async function MedicalDataLabellingPage() {
  const serviceData = await getServiceData()

  const defaultData = {
    title: "Medical Data Labelling",
    subtitle: "Precision Annotation for Healthcare AI",
    description:
      "Expert medical data annotation services for AI and machine learning in healthcare. Our certified medical professionals provide accurate labeling for diagnostic imaging, clinical data, and medical records.",
    features: [
      {
        icon: "ImageIcon",
        title: "Medical Imaging Annotation",
        description: "Precise labeling of X-rays, MRIs, CT scans, and ultrasound images for diagnostic AI.",
      },
      {
        icon: "Brain",
        title: "Pathology Labeling",
        description: "Expert annotation of pathology slides and tissue samples for research and diagnostics.",
      },
      {
        icon: "FileText",
        title: "Clinical Data Annotation",
        description: "Structured labeling of EHR data, clinical notes, and medical documentation.",
      },
      {
        icon: "Target",
        title: "Quality Assurance",
        description: "Multi-level review process ensuring 99%+ accuracy in medical annotations.",
      },
    ],
    benefits: [
      "HIPAA Compliant Processes",
      "Certified Medical Professionals",
      "Multi-Specialty Expertise",
      "99%+ Annotation Accuracy",
      "Secure Data Handling",
      "Custom Annotation Schemas",
    ],
    stats: [
      { value: "10M+", label: "Images Annotated" },
      { value: "99.5%", label: "Accuracy Rate" },
      { value: "50+", label: "Medical Experts" },
      { value: "100%", label: "HIPAA Compliant" },
    ],
  }

  const data = serviceData || defaultData

  const iconMap: any = {
    ImageIcon,
    Brain,
    FileText,
    Target,
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Annotation Services</h2>
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
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">Power Your Healthcare AI</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Get expert medical data annotation services to train accurate and reliable healthcare AI models.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
              <Link href="/contact">
                Start Your Project <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
