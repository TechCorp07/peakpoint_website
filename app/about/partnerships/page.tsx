import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { strapi } from "@/lib/strapi"

export const dynamic = "force-dynamic"

const fallbackData = {
  heroTitle: "Let's Transform Africa Together",
  heroSubtitle:
    "Partner with us to democratize healthcare technology access and create sustainable impact across the continent",
  heroImage: "/diverse-professional-team-collaborating.jpg",
  welcomeTitle: "Welcome, Future Partner",
  welcomeContent: `<p>We're excited that you're considering partnering with Peak Point Services. Whether you're a grant organization, impact investor, healthcare institution, or technology provider, we believe in the power of collaboration to create lasting change.</p><p>Our mission to bridge the healthcare technology gap in Africa aligns with the goals of organizations like GIZ, the Bill & Melinda Gates Foundation, Mastercard Foundation, and other impact-focused institutions. Together, we can ensure that the 5 billion people currently excluded from AI healthcare benefits gain access to life-saving technology and training.</p>`,
  opportunitiesTitle: "Partnership Opportunities",
  opportunities: [
    {
      icon: "🤝",
      title: "Grant Partnerships",
      description:
        "Fund training programs, infrastructure development, and community outreach initiatives that create measurable impact.",
      benefits: [
        { text: "Training center establishment" },
        { text: "Scholarship programs for underserved communities" },
        { text: "Technology infrastructure grants" },
        { text: "Research and impact assessment funding" },
      ],
    },
    {
      icon: "💼",
      title: "Impact Investment",
      description:
        "Invest in a sustainable, scalable social enterprise model that generates both financial returns and measurable social impact.",
      benefits: [
        { text: "Proven revenue model with 40%+ annual growth" },
        { text: "Clear path to profitability and scale" },
        { text: "Strong ESG metrics and impact reporting" },
        { text: "Alignment with SDGs 3, 4, 5, 8, 9, and 10" },
      ],
    },
    {
      icon: "🌍",
      title: "Strategic Alliances",
      description: "Collaborate on technology transfer, curriculum development, and market expansion initiatives.",
      benefits: [
        { text: "Healthcare institutions seeking BPO partners" },
        { text: "Medical technology providers" },
        { text: "Educational institutions and training partners" },
        { text: "Government and multilateral organizations" },
      ],
    },
  ],
  whyPartnerTitle: "Why Partner With Peak Point?",
  whyPartnerReasons: [
    {
      icon: "📊",
      title: "Proven Track Record",
      description: "15,000+ healthcare workers trained, 12 countries served, and $12M+ in economic impact generated.",
    },
    {
      icon: "🎯",
      title: "Clear Impact Metrics",
      description: "Transparent reporting on social, economic, and health outcomes with third-party verification.",
    },
    {
      icon: "⚖️",
      title: "Equity-Focused Approach",
      description: "85% women workforce, 40% youth employment, and priority access for underserved communities.",
    },
    {
      icon: "🔄",
      title: "Sustainable Business Model",
      description: "Self-sustaining revenue model ensures long-term impact beyond initial funding.",
    },
    {
      icon: "🌐",
      title: "Pan-African Reach",
      description: "Established presence in 12 countries with plans to expand to 20+ by 2027.",
    },
    {
      icon: "🤖",
      title: "AI Healthcare Focus",
      description: "Addressing the critical gap in diverse medical data for AI systems serving African populations.",
    },
  ],
  formTitle: "Start the Conversation",
  formSubtitle: "Share your interest and we'll schedule a personalized discussion about partnership opportunities.",
  nextStepsTitle: "What Happens Next?",
  nextSteps: [
    {
      number: 1,
      title: "Initial Review",
      description: "We review your inquiry and assess alignment with our mission and capacity.",
    },
    {
      number: 2,
      title: "Discovery Call",
      description: "We schedule a video call to discuss your goals and explore partnership models.",
    },
    {
      number: 3,
      title: "Proposal Development",
      description: "We co-create a partnership proposal with clear objectives, metrics, and timelines.",
    },
    {
      number: 4,
      title: "Launch & Impact",
      description: "We formalize the partnership and begin creating measurable impact together.",
    },
  ],
}

export default async function PartnershipsPage() {
  const response = await strapi.getPartnershipsPage()
  const partnershipsData = response?.data?.attributes || fallbackData

  const pageData = {
    heroTitle: partnershipsData.heroTitle || fallbackData.heroTitle,
    heroSubtitle: partnershipsData.heroSubtitle || fallbackData.heroSubtitle,
    heroImage: partnershipsData.heroImage?.data?.attributes?.url || fallbackData.heroImage,
    welcomeTitle: partnershipsData.welcomeTitle || fallbackData.welcomeTitle,
    welcomeContent: partnershipsData.welcomeContent || fallbackData.welcomeContent,
    opportunitiesTitle: partnershipsData.opportunitiesTitle || fallbackData.opportunitiesTitle,
    opportunities: partnershipsData.opportunities || fallbackData.opportunities,
    whyPartnerTitle: partnershipsData.whyPartnerTitle || fallbackData.whyPartnerTitle,
    whyPartnerReasons: partnershipsData.whyPartnerReasons || fallbackData.whyPartnerReasons,
    formTitle: partnershipsData.formTitle || fallbackData.formTitle,
    formSubtitle: partnershipsData.formSubtitle || fallbackData.formSubtitle,
    nextStepsTitle: partnershipsData.nextStepsTitle || fallbackData.nextStepsTitle,
    nextSteps: partnershipsData.nextSteps || fallbackData.nextSteps,
  }

  const isDevelopment = process.env.NODE_ENV === "development"
  const isStrapiDown = !response

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src={pageData.heroImage || "/placeholder.svg"}
            alt="Partnership collaboration"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-accent/80 to-primary/90" />
          <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">{pageData.heroTitle}</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              {pageData.heroSubtitle}
            </p>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold text-primary mb-6">{pageData.welcomeTitle}</h2>
              <div
                className="text-xl text-muted-foreground leading-relaxed space-y-4"
                dangerouslySetInnerHTML={{ __html: pageData.welcomeContent }}
              />
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-primary mb-12 text-center">{pageData.opportunitiesTitle}</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
              {pageData.opportunities.map((opportunity: any, index: number) => (
                <div key={index} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="text-5xl mb-6">{opportunity.icon}</div>
                  <h3 className="text-2xl font-bold text-primary mb-4">{opportunity.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">{opportunity.description}</p>
                  {opportunity.benefits && (
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {opportunity.benefits.map((benefit: any, idx: number) => (
                        <li key={idx}>• {benefit.text}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-primary mb-12 text-center">{pageData.whyPartnerTitle}</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {pageData.whyPartnerReasons.map((reason: any, index: number) => (
                <div key={index} className="flex gap-4">
                  <div className="text-3xl">{reason.icon}</div>
                  <div>
                    <h3 className="text-xl font-bold text-primary mb-2">{reason.title}</h3>
                    <p className="text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partnership Inquiry Form */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-bold text-primary mb-4">{pageData.formTitle}</h2>
                <p className="text-xl text-muted-foreground">{pageData.formSubtitle}</p>
              </div>

              <form className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label htmlFor="organization" className="block text-sm font-medium text-foreground mb-2">
                    Organization *
                  </label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="partnershipType" className="block text-sm font-medium text-foreground mb-2">
                    Partnership Interest *
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                  >
                    <option value="">Select partnership type...</option>
                    <option value="grant">Grant Partnership</option>
                    <option value="investment">Impact Investment</option>
                    <option value="strategic">Strategic Alliance</option>
                    <option value="technology">Technology Partnership</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                    Tell Us About Your Interest *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    placeholder="Share your organization's goals, areas of interest, and how you envision partnering with Peak Point..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                  />
                </div>

                <div className="mb-6">
                  <label className="flex items-start gap-3">
                    <input type="checkbox" required className="mt-1" />
                    <span className="text-sm text-muted-foreground">
                      I agree to receive communications from Peak Point Services regarding partnership opportunities and
                      impact updates. *
                    </span>
                  </label>
                </div>

                <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent-hover text-white text-lg">
                  Submit Partnership Inquiry
                </Button>

                <p className="text-sm text-muted-foreground text-center mt-6">
                  We typically respond within 2 business days. For urgent inquiries, please call us directly.
                </p>
              </form>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-primary mb-12 text-center">{pageData.nextStepsTitle}</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {pageData.nextSteps.map((step: any, index: number) => (
                <div key={index} className="text-center">
                  <div className="bg-accent/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold text-accent">
                    {step.number}
                  </div>
                  <h3 className="font-bold text-primary mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-primary mb-8">Learn More About Our Work</h2>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="outline" size="lg">
                <Link href="/about/our-story">Our Impact Story</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/insights/community">Community Impact</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/case-studies">Case Studies</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
