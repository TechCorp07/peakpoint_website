import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

async function getServiceData() {
  try {
    const data = await strapi.getServicePage("education")
    return data.data
  } catch (error) {
    console.warn("Failed to fetch education service data, using fallback")
    return null
  }
}

export default async function EducationPage() {
  const serviceData = await getServiceData()

  const defaultData = {
    title: "Education & Training Services",
    subtitle: "Empowering Your Workforce with Industry-Leading Training Programs",
    description:
      "Our comprehensive education and training services equip your team with the skills needed to excel in healthcare operations, data annotation, and revenue cycle management.",
    services: [
      {
        name: "MRI Imaging Training",
        description:
          "Comprehensive training programs for medical imaging professionals, covering MRI technology, safety protocols, and image interpretation.",
        features: [
          "MRI Technology Fundamentals",
          "Safety & Compliance",
          "Image Quality Assessment",
          "Hands-on Practice",
        ],
      },
      {
        name: "Data Annotation Training",
        description:
          "Specialized training in medical data annotation for AI/ML applications, ensuring accuracy and compliance with healthcare standards.",
        features: ["Annotation Tools Mastery", "Quality Control Methods", "HIPAA Compliance", "AI/ML Basics"],
      },
      {
        name: "RCM Training Programs",
        description:
          "End-to-end revenue cycle management training covering medical billing, coding, claims processing, and denial management.",
        features: [
          "Medical Coding (ICD-10, CPT)",
          "Claims Processing",
          "Denial Management",
          "Billing Software Training",
        ],
      },
    ],
    benefits: [
      "Industry-Certified Instructors",
      "Hands-on Learning Experience",
      "Flexible Online & On-site Options",
      "Certification Programs",
      "Ongoing Support & Resources",
      "Career Advancement Opportunities",
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
            src="/diverse-professional-team-collaborating.jpg"
            alt="Education & Training Services"
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
                <Link href="/services/education/enroll">Enroll Now →</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
              >
                <Link href="/services/education/training-resources">View Training Resources</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Detail */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-primary mb-16">Our Training Programs</h2>
          <div className="grid md:grid-cols-1 gap-12 max-w-5xl mx-auto">
            {data.services.map((service: any, index: number) => (
              <div
                key={index}
                className="bg-gradient-to-br from-secondary to-green-50/30 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
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
          <h2 className="text-4xl font-bold text-center text-primary mb-16">Why Choose Peak Point Training</h2>
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
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Upskill Your Team?</h2>
          <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Contact us to learn more about our training programs and how we can help your organization succeed.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-accent-foreground">
            <Link href="/services/education/enroll">Get Started Today →</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
