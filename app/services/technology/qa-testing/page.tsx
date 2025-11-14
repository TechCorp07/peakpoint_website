import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle, Bug, TestTube, Smartphone, Globe } from "lucide-react"

async function getServiceData() {
  try {
    const data = await strapi.getSubService("qa-testing")
    return data?.data
  } catch (error) {
    return null
  }
}

export default async function QATestingPage() {
  const serviceData = await getServiceData()

  const defaultData = {
    title: "QA Testing & Validation",
    subtitle: "Ensure Quality, Deliver Excellence",
    description:
      "Comprehensive quality assurance and testing services to ensure your software meets the highest standards. From functional testing to performance validation, we've got you covered.",
    features: [
      {
        icon: "TestTube",
        title: "Functional Testing",
        description: "Thorough testing of all features and functionalities to ensure they work as intended.",
      },
      {
        icon: "Bug",
        title: "Bug Detection & Reporting",
        description: "Systematic identification and documentation of defects with detailed reproduction steps.",
      },
      {
        icon: "Smartphone",
        title: "Mobile App Testing",
        description: "Cross-platform testing for iOS and Android applications on real devices.",
      },
      {
        icon: "Globe",
        title: "Cross-Browser Testing",
        description: "Ensure consistent performance across all major browsers and platforms.",
      },
    ],
    benefits: [
      "Manual & Automated Testing",
      "Performance Testing",
      "Security Testing",
      "Usability Testing",
      "Regression Testing",
      "Detailed Test Reports",
    ],
    stats: [
      { value: "1000+", label: "Projects Tested" },
      { value: "99%", label: "Bug Detection Rate" },
      { value: "50+", label: "QA Engineers" },
      { value: "24/7", label: "Testing Coverage" },
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
    TestTube,
    Bug,
    Smartphone,
    Globe,
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Testing Services</h2>
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
            <h2 className="text-4xl font-bold text-center text-primary mb-16">Our Capabilities</h2>
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
            <h2 className="text-4xl font-bold text-primary-foreground mb-6">Ready to Ensure Quality?</h2>
            <p className="text-xl text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Let our QA experts help you deliver bug-free, high-quality software to your users.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
              <Link href="/contact">
                Start Testing <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
