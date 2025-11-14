import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { AIAssistant } from "@/components/ai-assistant/chat-widget"
import { Target, Eye, Award, Users, TrendingUp, Globe2, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { strapi } from "@/lib/strapi"

export const dynamic = "force-dynamic"

const fallbackData = {
  heroTitle: "Transforming Business Through Innovation",
  heroDescription:
    "Peak Point Services is Africa's premier BPO partner, delivering world-class solutions across healthcare, education, enterprise, and technology sectors.",
  stats: [
    { value: "2000+", label: "Professionals" },
    { value: "500+", label: "Global Clients" },
    { value: "15+", label: "Countries Served" },
    { value: "99.8%", label: "Client Satisfaction" },
  ],
  whoWeAreTitle: "Who We Are",
  whoWeAreContent: [
    "Founded with a vision to bridge the gap between African talent and global opportunities, Peak Point has grown into a trusted BPO partner for businesses worldwide.",
    "We combine cutting-edge technology with human expertise to deliver exceptional results. Our team of over 2,000 professionals across multiple locations ensures 24/7 support for our clients.",
    "From healthcare to finance, retail to technology, we've helped hundreds of companies optimize their operations, reduce costs, and scale efficiently.",
  ],
  whoWeAreImage: "/modern-office-with-technology-and-professionals-co.jpg",
  missionTitle: "Our Mission",
  missionContent:
    "To empower businesses globally by providing innovative, reliable, and cost-effective BPO solutions that drive growth and operational excellence.",
  visionTitle: "Our Vision",
  visionContent:
    "To be the leading BPO provider in Africa and a globally recognized partner for businesses seeking excellence in outsourcing.",
  valuesTitle: "Our Core Values",
  valuesSubtitle: "The principles that guide everything we do",
  values: [
    {
      icon: "Award",
      title: "Excellence",
      description: "We strive for excellence in everything we do, delivering quality that exceeds expectations",
    },
    {
      icon: "TrendingUp",
      title: "Innovation",
      description: "Embracing technology and new ideas to stay ahead of industry trends",
    },
    {
      icon: "Shield",
      title: "Integrity",
      description: "Operating with honesty, transparency, and ethical standards in all interactions",
    },
    {
      icon: "Users",
      title: "Partnership",
      description: "Building lasting relationships where your success becomes our success",
    },
  ],
}

const getIconComponent = (iconName: string) => {
  const icons: Record<string, any> = {
    Award: <Award />,
    TrendingUp: <TrendingUp />,
    Shield: <Shield />,
    Users: <Users />,
  }
  return icons[iconName] || <Award />
}

export default async function AboutPage() {
  const response = await strapi.getAboutPage()
  const aboutData = response?.data?.attributes || fallbackData

  const pageData = {
    heroTitle: aboutData.heroTitle || fallbackData.heroTitle,
    heroDescription: aboutData.heroDescription || fallbackData.heroDescription,
    stats: aboutData.stats || fallbackData.stats,
    whoWeAreTitle: aboutData.whoWeAreTitle || fallbackData.whoWeAreTitle,
    whoWeAreContent: aboutData.whoWeAreContent || fallbackData.whoWeAreContent,
    whoWeAreImage: aboutData.whoWeAreImage?.data?.attributes?.url || fallbackData.whoWeAreImage,
    missionTitle: aboutData.missionTitle || fallbackData.missionTitle,
    missionContent: aboutData.missionContent || fallbackData.missionContent,
    visionTitle: aboutData.visionTitle || fallbackData.visionTitle,
    visionContent: aboutData.visionContent || fallbackData.visionContent,
    valuesTitle: aboutData.valuesTitle || fallbackData.valuesTitle,
    valuesSubtitle: aboutData.valuesSubtitle || fallbackData.valuesSubtitle,
    values: aboutData.values || fallbackData.values,
  }

  const isDevelopment = process.env.NODE_ENV === "development"
  const isStrapiDown = !response

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <section className="relative bg-gradient-to-br from-blue-50 via-white to-accent/5 py-24 overflow-hidden">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">{pageData.heroTitle}</h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{pageData.heroDescription}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
                  <Link href="/contact">Partner With Us</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/about/our-story">Our Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {pageData.stats.map((stat: any, index: number) => (
                <div key={index}>
                  <div className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</div>
                  <div className="text-sm md:text-base text-primary-foreground/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={pageData.whoWeAreImage || "/placeholder.svg"}
                  alt="Peak Point Team"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-primary mb-6">{pageData.whoWeAreTitle}</h2>
                {Array.isArray(pageData.whoWeAreContent) ? (
                  pageData.whoWeAreContent.map((paragraph: string, index: number) => (
                    <p key={index} className="text-lg text-muted-foreground mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  ))
                ) : (
                  <div
                    className="text-lg text-muted-foreground mb-6 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: pageData.whoWeAreContent }}
                  />
                )}
                <Button asChild variant="outline" size="lg">
                  <Link href="/about/our-story">Read Our Full Story</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-b from-secondary/30 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="bg-card rounded-2xl p-10 shadow-lg border border-border hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-4">{pageData.missionTitle}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{pageData.missionContent}</p>
              </div>
              <div className="bg-card rounded-2xl p-10 shadow-lg border border-border hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-4">{pageData.visionTitle}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">{pageData.visionContent}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-4">{pageData.valuesTitle}</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{pageData.valuesSubtitle}</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {pageData.values.map((value: any, index: number) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {getIconComponent(value.icon)}
                  </div>
                  <h4 className="text-xl font-bold text-primary mb-3">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-gradient-to-br from-secondary/20 to-background">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Link
                href="/about/our-story"
                className="group bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-border"
              >
                <Globe2 className="w-12 h-12 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-primary mb-3">Our Story</h3>
                <p className="text-muted-foreground mb-4">
                  Learn about our journey and how we became Africa's premier BPO partner
                </p>
                <span className="text-accent font-semibold group-hover:underline">Read More →</span>
              </Link>
              <Link
                href="/about/team"
                className="group bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-border"
              >
                <Users className="w-12 h-12 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-primary mb-3">Our Team</h3>
                <p className="text-muted-foreground mb-4">Meet the experienced leaders driving our mission forward</p>
                <span className="text-accent font-semibold group-hover:underline">Meet the Team →</span>
              </Link>
              <Link
                href="/about/careers"
                className="group bg-card rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-border"
              >
                <TrendingUp className="w-12 h-12 text-accent mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-2xl font-bold text-primary mb-3">Careers</h3>
                <p className="text-muted-foreground mb-4">Join our team and build a rewarding career in BPO services</p>
                <span className="text-accent font-semibold group-hover:underline">View Openings →</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <AIAssistant />
    </div>
  )
}
