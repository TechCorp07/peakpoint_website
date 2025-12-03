import { Header } from "@/components/layout/header"
import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const dynamic = "force-dynamic"

const defaultData = {
  title: "Medical MRI Data Annotations",
  subtitle: "Precision Annotations for AI-Powered Healthcare",
  description:
    "Expert medical imaging annotation services for machine learning, research, and diagnostic AI development. HIPAA-compliant processes ensure data security and patient privacy.",
  features: [
    {
      icon: "🧠",
      title: "Image Segmentation",
      description: "Precise organ and tissue segmentation for training diagnostic AI models.",
    },
    {
      icon: "🎯",
      title: "Organ Detection",
      description: "Accurate identification and labeling of anatomical structures in MRI scans.",
    },
    {
      icon: "🛡️",
      title: "Pathology Identification",
      description: "Expert annotation of abnormalities, lesions, and disease markers.",
    },
    {
      icon: "⚡",
      title: "Quality Assurance",
      description: "Multi-level QA process with radiologist oversight for maximum accuracy.",
    },
  ],
  benefits: [
    "HIPAA Compliant Workflows",
    "Radiologist-Verified Annotations",
    "99.5%+ Annotation Accuracy",
    "Support for Multiple Imaging Modalities",
    "Scalable Annotation Teams",
    "Custom Annotation Protocols",
  ],
  stats: [
    { value: "99.5%", label: "Accuracy Rate" },
    { value: "10K+", label: "Images Annotated Daily" },
    { value: "100%", label: "HIPAA Compliant" },
    { value: "24/7", label: "Turnaround Time" },
  ],
}

async function getServiceData() {
  try {
    const data = await strapi.getSubService("medical-mri-annotations")
    return data?.data
  } catch (error) {
    return null
  }
}

export default async function MedicalMRIAnnotationsPage() {
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Our Annotation Services</h2>
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Why Choose Our Annotation Services</h2>
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
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">
              Ready to Accelerate Your AI Development?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let's discuss how our medical imaging annotation services can support your research and AI initiatives.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
              <Link href="/contact">Schedule a Consultation →</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
