"use client"

import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect, useState } from "react"
import Image from "next/image"

interface ImpactStoryData {
  hero: {
    title: string
    subtitle: string
    backgroundImage: string
  }
  mission: string
  vision: string
  problemStatement: {
    title: string
    description: string
    statistics: Array<{ label: string; value: string }>
  }
  solution: {
    title: string
    description: string
    approaches: Array<{ title: string; description: string }>
  }
  impactMetrics: Array<{ value: string; label: string; description: string }>
  focusAreas: Array<{ title: string; description: string; icon: string }>
  sdgAlignment: Array<{ goal: number; title: string; description: string }>
  theoryOfChange: {
    inputs: string[]
    activities: string[]
    outputs: string[]
    outcomes: string[]
    impact: string
  }
}

export default function OurStoryPage() {
  const [data, setData] = useState<ImpactStoryData | null>(null)

  useEffect(() => {
    // Fetch from CMS
    fetch("/api/impact-story")
      .then((res) => res.json())
      .then(setData)
      .catch(() => setData(defaultData))
  }, [])

  const defaultData: ImpactStoryData = {
    hero: {
      title: "Bridging the AI Healthcare Gap in Africa",
      subtitle:
        "Ensuring 5 billion people aren't left behind in the AI healthcare revolution through inclusive training, diverse data, and equitable access",
      backgroundImage: "/african-healthcare-technology.jpg",
    },
    mission:
      "To democratize access to healthcare technology and AI training across Africa, ensuring that African populations are represented in medical AI systems and that healthcare workers have the skills to leverage these technologies for better patient outcomes.",
    vision:
      "An Africa where every healthcare worker has access to cutting-edge AI training, where African medical data contributes to global AI systems, and where every patient benefits from AI-powered healthcare that recognizes and serves their unique needs.",
    problemStatement: {
      title: "The AI Healthcare Data Gap: 5 Billion People Excluded",
      description:
        "Most AI health systems are trained on data from high-income countries, leaving nearly 5 billion people in low and middle-income countries invisible in diagnostic models. Over 80% of genetics studies include only people of European descent (less than 20% of the world's population). Without representative data, AI-powered tools can misdiagnose or fail to recognize conditions in African populations, deepening global health inequalities rather than reducing them.",
      statistics: [
        { label: "People Excluded from AI Healthcare", value: "5B+" },
        { label: "Genetics Studies with African Data", value: "<20%" },
        { label: "Healthcare Worker Shortage in Africa", value: "6.1M" },
        { label: "Countries We're Transforming", value: "12+" },
      ],
    },
    solution: {
      title: "Our Approach: Building Inclusive AI Healthcare Infrastructure",
      description:
        "Peak Point Services addresses the AI healthcare gap through comprehensive training programs, diverse medical data annotation, and sustainable employment creation that ensures African populations are represented in global AI systems.",
      approaches: [
        {
          title: "Medical AI Data Annotation Training",
          description:
            "We train African healthcare professionals to annotate medical images and data for AI systems, ensuring diverse representation in diagnostic algorithms. This creates both employment and ensures AI systems work accurately for African populations.",
        },
        {
          title: "MRI & Medical Imaging Excellence",
          description:
            "By providing world-class training in MRI imaging and interpretation, we enable healthcare workers to contribute high-quality medical data that represents African populations in global AI training datasets.",
        },
        {
          title: "Healthcare Technology Access",
          description:
            "We establish training centers with medical imaging technology, giving healthcare workers hands-on experience with tools they wouldn't otherwise access, while generating diverse data for AI systems.",
        },
        {
          title: "Equity-Centered Employment",
          description:
            "Our BPO model creates meaningful, well-paying jobs (85% women, 40% youth) in healthcare AI support services, ensuring underserved communities benefit economically from the AI revolution.",
        },
      ],
    },
    impactMetrics: [
      {
        value: "15,000+",
        label: "Healthcare Workers Trained",
        description: "In medical imaging, AI data annotation, and RCM",
      },
      { value: "12", label: "African Countries", description: "With active training and employment programs" },
      {
        value: "2.5M+",
        label: "Medical Images Annotated",
        description: "Contributing to diverse AI training datasets",
      },
      { value: "85%", label: "Women in Workforce", description: "Promoting gender equality in healthcare tech" },
      { value: "40%", label: "Youth Employment", description: "Creating opportunities for under-30 professionals" },
      { value: "$12M+", label: "Economic Impact", description: "In wages and local economic development" },
    ],
    focusAreas: [
      {
        title: "Medical AI Data Annotation",
        description:
          "Training professionals to annotate medical images for AI systems, ensuring African populations are represented in diagnostic algorithms",
        icon: "🤖",
      },
      {
        title: "MRI & Medical Imaging",
        description:
          "Training radiographers in MRI, CT, and X-ray imaging to generate diverse medical data for AI training",
        icon: "🏥",
      },
      {
        title: "Healthcare Revenue Cycle",
        description: "Training specialists in healthcare billing and coding to support health systems globally",
        icon: "💼",
      },
      {
        title: "Health Equity Programs",
        description:
          "Ensuring underserved communities have access to AI healthcare training and employment opportunities",
        icon: "⚖️",
      },
    ],
    sdgAlignment: [
      {
        goal: 3,
        title: "Good Health and Well-being",
        description: "Ensuring AI healthcare systems work for all populations",
      },
      {
        goal: 4,
        title: "Quality Education",
        description: "Providing world-class medical AI and technology training",
      },
      { goal: 5, title: "Gender Equality", description: "85% women workforce in healthcare tech" },
      { goal: 8, title: "Decent Work and Economic Growth", description: "Creating sustainable AI-era jobs" },
      {
        goal: 9,
        title: "Industry, Innovation and Infrastructure",
        description: "Building AI healthcare infrastructure in Africa",
      },
      {
        goal: 10,
        title: "Reduced Inequalities",
        description: "Bridging the AI healthcare gap for 5 billion people",
      },
    ],
    theoryOfChange: {
      inputs: ["Training Infrastructure", "Medical Technology", "AI Expertise", "Funding & Partnerships"],
      activities: [
        "Medical AI Data Annotation",
        "MRI Imaging Training",
        "Diverse Dataset Creation",
        "Technology Access",
      ],
      outputs: [
        "15,000+ Trained Professionals",
        "2.5M+ Annotated Images",
        "85% Women Workforce",
        "12 Countries Served",
      ],
      outcomes: ["Inclusive AI Systems", "Economic Empowerment", "Reduced Health Inequalities", "Career Development"],
      impact:
        "AI healthcare systems that recognize and serve African populations, ensuring 5 billion people aren't left behind in the AI revolution",
    },
  }

  const displayData = data || defaultData

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section with Background Image */}
        <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
          <Image
            src={displayData.hero.backgroundImage || "/placeholder.svg"}
            alt="Healthcare in Africa"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/75" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
            <Link
              href="/about"
              className="inline-flex items-center text-sm text-white/80 hover:text-white mb-6 transition-colors"
            >
              ← Back to About Us
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight max-w-5xl mx-auto">
              {displayData.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {displayData.hero.subtitle}
            </p>
          </div>
        </section>

        {/* Impact Metrics */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-primary mb-4">Our Impact at Scale</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Measurable outcomes that demonstrate our commitment to transforming healthcare access across Africa
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {displayData.impactMetrics.map((metric, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                >
                  <div className="text-5xl font-bold text-accent mb-2">{metric.value}</div>
                  <div className="text-xl font-semibold text-primary mb-2">{metric.label}</div>
                  <div className="text-sm text-muted-foreground">{metric.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-primary mb-6">{displayData.problemStatement.title}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                {displayData.problemStatement.description}
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {displayData.problemStatement.statistics.map((stat, index) => (
                  <div key={index} className="bg-gradient-to-br from-accent/10 to-accent/5 p-6 rounded-xl">
                    <div className="text-3xl font-bold text-accent mb-2">{stat.value}</div>
                    <div className="text-sm font-medium text-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-4xl font-bold text-primary mb-6 text-center">{displayData.solution.title}</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12 text-center max-w-3xl mx-auto">
                {displayData.solution.description}
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                {displayData.solution.approaches.map((approach, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                    <h3 className="text-2xl font-bold text-primary mb-4">{approach.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{approach.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Focus Areas */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-primary mb-16 text-center">Our Focus Areas</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {displayData.focusAreas.map((area, index) => (
                <div key={index} className="text-center group">
                  <div className="text-6xl mb-6">{area.icon}</div>
                  <h3 className="text-xl font-bold text-primary mb-3">{area.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <div className="bg-gradient-to-br from-primary to-primary/90 p-10 rounded-2xl shadow-xl text-white">
                <div className="text-5xl mb-6">🎯</div>
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg leading-relaxed text-white/90">{displayData.mission}</p>
              </div>
              <div className="bg-gradient-to-br from-accent to-accent/90 p-10 rounded-2xl shadow-xl text-white">
                <div className="text-5xl mb-6">👁️</div>
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg leading-relaxed text-white/90">{displayData.vision}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SDG Alignment */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-primary mb-6 text-center">
              UN Sustainable Development Goals Alignment
            </h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Our work directly contributes to achieving the United Nations Sustainable Development Goals
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {displayData.sdgAlignment.map((sdg, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl border border-gray-200"
                >
                  <div className="flex items-center mb-3">
                    <div className="bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-3">
                      {sdg.goal}
                    </div>
                    <h3 className="font-bold text-primary text-sm">{sdg.title}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{sdg.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Theory of Change */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-primary mb-6 text-center">Our Theory of Change</h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              A systematic approach to creating sustainable impact in healthcare access across Africa
            </p>
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-5 gap-4">
                {/* Inputs */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
                  <h3 className="font-bold text-primary mb-4 text-center">Inputs</h3>
                  <ul className="space-y-2">
                    {displayData.theoryOfChange.inputs.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Activities */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-green-500">
                  <h3 className="font-bold text-primary mb-4 text-center">Activities</h3>
                  <ul className="space-y-2">
                    {displayData.theoryOfChange.activities.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Outputs */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-yellow-500">
                  <h3 className="font-bold text-primary mb-4 text-center">Outputs</h3>
                  <ul className="space-y-2">
                    {displayData.theoryOfChange.outputs.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Outcomes */}
                <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-orange-500">
                  <h3 className="font-bold text-primary mb-4 text-center">Outcomes</h3>
                  <ul className="space-y-2">
                    {displayData.theoryOfChange.outcomes.map((item, i) => (
                      <li key={i} className="text-sm text-muted-foreground">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {/* Impact */}
                <div className="bg-gradient-to-br from-accent to-accent/90 p-6 rounded-xl shadow-lg text-white">
                  <h3 className="font-bold mb-4 text-center">Impact</h3>
                  <p className="text-sm leading-relaxed">{displayData.theoryOfChange.impact}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership CTA */}
        <section className="py-20 bg-gradient-to-r from-primary via-primary/95 to-primary/90">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Partner With Us to Bridge the AI Healthcare Gap
            </h2>
            <p className="text-xl text-white/90 mb-4 max-w-3xl mx-auto leading-relaxed">
              We welcome partnerships with grant organizations, impact investors, healthcare institutions, and
              technology providers who share our vision of inclusive AI healthcare.
            </p>
            <p className="text-lg text-white/80 mb-10 max-w-2xl mx-auto">
              Whether you're from GIZ, Bill & Melinda Gates Foundation, Mastercard Foundation, or other impact-focused
              organizations, let's discuss how we can ensure 5 billion people aren't excluded from AI healthcare
              benefits.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-white text-lg px-8 py-6">
                <Link href="/about/partnerships">Discuss Partnership Opportunities</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white text-primary hover:bg-white/90 border-white text-lg px-8 py-6"
              >
                <Link href="/insights/community">View Our Impact Stories</Link>
              </Button>
            </div>
            <div className="mt-12 grid sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-white">
                <div className="text-3xl mb-2">🤝</div>
                <div className="font-semibold mb-1">Grant Partnerships</div>
                <div className="text-sm text-white/80">Funding for inclusive AI training programs</div>
              </div>
              <div className="text-white">
                <div className="text-3xl mb-2">💼</div>
                <div className="font-semibold mb-1">Impact Investment</div>
                <div className="text-sm text-white/80">Sustainable model addressing AI healthcare inequality</div>
              </div>
              <div className="text-white">
                <div className="text-3xl mb-2">🌍</div>
                <div className="font-semibold mb-1">Strategic Alliances</div>
                <div className="text-sm text-white/80">Healthcare AI institutions and technology providers</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
