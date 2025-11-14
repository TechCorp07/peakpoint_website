import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { strapi } from "@/lib/strapi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

async function getCareersData() {
  try {
    const data = await strapi.getCareerListings()
    return {
      jobs: data?.data || [],
      isStrapiRunning: data !== null,
    }
  } catch (error) {
    console.warn("Failed to fetch careers data")
    return {
      jobs: [],
      isStrapiRunning: false,
    }
  }
}

export default async function CareersPage() {
  const { jobs, isStrapiRunning } = await getCareersData()

  const defaultJobs = [
    {
      title: "Medical AI Data Annotation Specialist",
      department: "Healthcare AI",
      location: "Nairobi, Kenya / Remote",
      type: "Full-time",
      description:
        "Train AI systems with diverse African medical data. Help ensure 5 billion people aren't excluded from AI healthcare benefits.",
      impact: "Contribute to inclusive AI diagnostic systems",
    },
    {
      title: "MRI Training Coordinator",
      department: "Medical Imaging",
      location: "Multiple African Locations",
      type: "Full-time",
      description:
        "Coordinate MRI imaging training programs for healthcare workers. Generate diverse medical data for AI training.",
      impact: "Train 500+ radiographers annually",
    },
    {
      title: "Healthcare RCM Specialist",
      department: "Healthcare Operations",
      location: "Remote",
      type: "Full-time",
      description:
        "Support healthcare revenue cycle management for global health systems. Certified medical coding required.",
      impact: "Support sustainable healthcare financing",
    },
    {
      title: "Partnership Development Manager",
      department: "Strategic Partnerships",
      location: "Remote / Travel Required",
      type: "Full-time",
      description:
        "Build relationships with grant organizations, impact investors, and healthcare institutions. Experience with GIZ, Gates Foundation, or similar preferred.",
      impact: "Secure funding for 10,000+ training slots",
    },
    {
      title: "Impact Measurement Analyst",
      department: "Impact & Evaluation",
      location: "Remote",
      type: "Full-time",
      description:
        "Track and report on our contribution to SDGs and healthcare equity. Experience with impact measurement frameworks required.",
      impact: "Measure outcomes for 15,000+ beneficiaries",
    },
    {
      title: "SOC Security Analyst",
      department: "Enterprise Security",
      location: "Johannesburg, SA",
      type: "Full-time",
      description:
        "Monitor and respond to security incidents in our 24/7 Security Operations Center protecting healthcare data.",
      impact: "Protect sensitive medical information",
    },
  ]

  const displayJobs = isStrapiRunning ? jobs : defaultJobs
  const hasJobs = displayJobs.length > 0

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
          <Image
            src="/diverse-professional-team-collaborating.jpg"
            alt="Careers at Peak Point"
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
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Build a Career That Transforms Africa
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              Join our mission to ensure 5 billion people aren't excluded from AI healthcare benefits. Every role
              contributes to bridging the healthcare technology gap.
            </p>
          </div>
        </section>

        {/* Impact of Working Here */}
        <section className="py-20 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold text-primary mb-6">Your Work Creates Real Impact</h2>
              <p className="text-xl text-muted-foreground leading-relaxed mb-12">
                At Peak Point, every team member contributes to solving one of healthcare's biggest challenges: the AI
                data gap that excludes billions from life-saving technology.
              </p>
              <div className="grid sm:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">🎓</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Continuous Learning</h3>
                  <p className="text-muted-foreground text-sm">
                    Access to medical AI training, certifications, and professional development programs
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">💰</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Competitive Compensation</h3>
                  <p className="text-muted-foreground text-sm">
                    Above-market salaries, health insurance, and performance bonuses aligned with impact metrics
                  </p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div className="text-4xl mb-4">🌍</div>
                  <h3 className="text-xl font-bold text-primary mb-3">Pan-African Opportunities</h3>
                  <p className="text-muted-foreground text-sm">
                    Work across 12 African countries with remote and hybrid options
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-primary mb-12 text-center">What We Value</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[
                {
                  title: "Health Equity First",
                  description: "Every decision considers how it affects healthcare access for underserved populations",
                },
                {
                  title: "Inclusive Excellence",
                  description: "85% women workforce, 40% youth employment - diversity drives our innovation",
                },
                {
                  title: "Data Integrity",
                  description: "Rigorous quality standards ensure African medical data contributes to accurate AI",
                },
                {
                  title: "Sustainable Impact",
                  description: "For-profit model that creates jobs while solving global health challenges",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200"
                >
                  <h3 className="text-2xl font-bold text-primary mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Open Positions */}
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-primary mb-4 text-center">Open Positions</h2>
            <p className="text-xl text-muted-foreground text-center mb-12 max-w-3xl mx-auto">
              Join a team that's bridging the AI healthcare gap. Each role contributes to our mission of ensuring
              inclusive healthcare technology access.
            </p>

            {!hasJobs && isStrapiRunning ? (
              <div className="max-w-3xl mx-auto text-center py-16">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-primary mb-4">No Open Positions at the Moment</h3>
                <p className="text-lg text-muted-foreground mb-8">
                  We're not currently hiring, but we're always interested in connecting with talented individuals who
                  share our mission. Send us your CV and we'll reach out when relevant opportunities arise.
                </p>
                <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-white">
                  <Link href="/contact">Submit Your CV</Link>
                </Button>
              </div>
            ) : (
              <div className="max-w-5xl mx-auto space-y-6">
                {displayJobs.map((job: any, index: number) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all border border-gray-200 group"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                            {job.title}
                          </h3>
                        </div>
                        <p className="text-muted-foreground mb-4 leading-relaxed">{job.description}</p>
                        {job.impact && (
                          <div className="bg-accent/10 px-4 py-2 rounded-lg inline-block mb-4">
                            <span className="text-sm font-semibold text-accent">Impact: {job.impact}</span>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-accent">📋</span>
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-accent">📍</span>
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-accent">⏰</span>
                            <span>{job.type}</span>
                          </div>
                        </div>
                      </div>
                      <Button asChild className="bg-accent hover:bg-accent-hover text-white shrink-0">
                        <Link href={`/about/careers/apply?job=${encodeURIComponent(job.title)}`}>Apply Now →</Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Application Process */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="text-4xl font-bold text-primary mb-12 text-center">Our Hiring Process</h2>
            <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                {
                  step: "1",
                  title: "Apply",
                  description: "Submit your application and tell us about your passion for health equity",
                },
                {
                  step: "2",
                  title: "Screen",
                  description: "Initial conversation about your experience and our mission",
                },
                {
                  step: "3",
                  title: "Interview",
                  description: "Meet the team and discuss how you'll contribute to our impact",
                },
                { step: "4", title: "Offer", description: "Join us in transforming healthcare access across Africa" },
              ].map((stage, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {stage.step}
                  </div>
                  <h3 className="text-xl font-bold text-primary mb-2">{stage.title}</h3>
                  <p className="text-sm text-muted-foreground">{stage.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-r from-primary via-primary/95 to-primary/90">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Don't See the Right Role?</h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We're always looking for talented, mission-driven individuals. Send us your CV and tell us how you want to
              contribute to bridging the AI healthcare gap.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-white text-lg px-8 py-6">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
