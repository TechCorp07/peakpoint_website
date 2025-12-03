import { strapi } from "@/lib/strapi"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

async function getTeamData() {
  try {
    const data = await strapi.getTeamMembers()
    return data
  } catch (error) {
    console.warn("Failed to fetch team data, using fallback")
    return null
  }
}

export default async function TeamPage() {
  const teamData = await getTeamData()

  const defaultTeam = [
    {
      name: "Dr. Sarah Mwangi",
      role: "Chief Executive Officer & Co-Founder",
      bio: "Healthcare AI researcher with 15+ years bridging technology gaps in African healthcare systems. Former WHO consultant on health equity.",
      image: "/team-ceo.jpg",
      linkedin: "#",
      expertise: "Healthcare AI, Health Equity, Strategic Partnerships",
    },
    {
      name: "James Ochieng",
      role: "Chief Operating Officer",
      bio: "Operations leader focused on sustainable employment creation. Built training programs serving 15,000+ healthcare workers across 12 African countries.",
      image: "/team-coo.jpg",
      linkedin: "#",
      expertise: "Operations Excellence, Training Programs, Impact Scaling",
    },
    {
      name: "Dr. Amara Nkosi",
      role: "Chief Medical Officer",
      bio: "Radiologist and medical imaging expert ensuring African populations are represented in AI diagnostic systems. Pioneer in diverse medical data annotation.",
      image: "/team-cto.jpg",
      linkedin: "#",
      expertise: "Medical Imaging, AI Data Annotation, Clinical Training",
    },
    {
      name: "Fatima Hassan",
      role: "Chief Impact Officer",
      bio: "Impact measurement specialist tracking how our work contributes to SDGs and reduces healthcare inequalities for 5 billion people.",
      image: "/team-cfo.jpg",
      linkedin: "#",
      expertise: "Impact Measurement, SDG Alignment, Grant Management",
    },
    {
      name: "Michael Banda",
      role: "VP of Healthcare AI Training",
      bio: "Leading medical AI data annotation programs that ensure African medical data contributes to global AI training datasets.",
      image: "/team-vp-health.jpg",
      linkedin: "#",
      expertise: "AI Training, Medical Data Annotation, Quality Assurance",
    },
    {
      name: "Grace Kamau",
      role: "VP of Partnerships & Development",
      bio: "Building strategic partnerships with organizations like GIZ, Gates Foundation, and Mastercard Foundation to scale our impact.",
      image: "/team-vp-tech.jpg",
      linkedin: "#",
      expertise: "Partnership Development, Grant Writing, Stakeholder Engagement",
    },
  ]

  const teamArray = teamData?.data ? teamData.data.map((member: any) => {
    const attrs = member.attributes || member;

    let imageUrl = "/placeholder.svg";

    if (attrs.image?.data?.attributes?.url) {
      imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.image.data.attributes.url}`;
    } else if (attrs.image?.url) {
      imageUrl = `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.image.url}`;
    }
    return {
      name: attrs.name || "",
      role: attrs.role || "",
      bio: attrs.bio || "",
      image: imageUrl,
      linkedin: attrs.linkedin || "#",
      expertise: attrs.expertise || "",
    };
  }) : null

  const isStrapiDown = !teamArray || teamArray.length === 0
  const team = isStrapiDown ? defaultTeam : teamArray

  return (
    <main className="pt-20 min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/diverse-team-collaboration-community-teamwork.jpg"
          alt="Peak Point Leadership Team"
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
            Leadership Committed to Healthcare Equity
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Meet the mission-driven leaders ensuring 5 billion people aren't excluded from AI healthcare benefits
          </p>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-6">Our Leadership Philosophy</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              Our leadership team combines deep healthcare expertise, technology innovation, and unwavering commitment
              to Africa's transformation. We're not just building a business—we're bridging the AI healthcare gap that
              excludes billions from life-saving technology.
            </p>
            <div className="grid sm:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🎯</div>
                <div className="text-3xl font-bold text-accent mb-2">85%</div>
                <div className="text-sm font-semibold text-primary mb-1">Women in Leadership</div>
                <div className="text-xs text-muted-foreground">Promoting gender equality in healthcare tech</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🌍</div>
                <div className="text-3xl font-bold text-accent mb-2">12</div>
                <div className="text-sm font-semibold text-primary mb-1">African Countries</div>
                <div className="text-xs text-muted-foreground">Pan-African leadership experience</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <div className="text-4xl mb-4">🤝</div>
                <div className="text-3xl font-bold text-accent mb-2">50+</div>
                <div className="text-sm font-semibold text-primary mb-1">Years Combined</div>
                <div className="text-xs text-muted-foreground">Healthcare & AI expertise</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-4xl font-bold text-primary mb-4 text-center">Meet Our Leadership</h2>
          <p className="text-xl text-muted-foreground text-center mb-16 max-w-3xl mx-auto">
            Diverse expertise united by a shared mission to democratize healthcare technology access across Africa
          </p>
          {!isStrapiDown && team.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-6">👥</div>
              <h3 className="text-3xl font-bold text-foreground mb-4">Team Information Coming Soon</h3>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                We're currently updating our team profiles. Check back soon to meet the leaders driving Africa's
                healthcare transformation.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {team.map((member: any, index: number) => (
                <div
                  key={index}
                  className="bg-gradient-to-b from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 group"
                >
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg?height=400&width=400"}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">{member.name}</h3>
                    <p className="text-accent font-semibold mb-3">{member.role}</p>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{member.bio}</p>
                    {member.expertise && (
                      <div className="mb-4">
                        <div className="text-xs font-semibold text-primary mb-2">Areas of Expertise:</div>
                        <div className="text-xs text-muted-foreground">{member.expertise}</div>
                      </div>
                    )}
                    <a
                      href={member.linkedin}
                      className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium text-sm"
                    >
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                      <span>Connect on LinkedIn</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Advisory Board */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-primary mb-6">Advisory Board & Partners</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Our work is guided by leading experts in healthcare AI, global health equity, and sustainable
              development from institutions including WHO, African CDC, and leading research universities.
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="text-4xl mb-4">🏥</div>
                <h3 className="text-xl font-bold text-primary mb-3">Healthcare AI Advisors</h3>
                <p className="text-muted-foreground text-sm">
                  Leading radiologists, medical AI researchers, and health equity experts ensuring our training
                  programs meet global standards
                </p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
                <div className="text-4xl mb-4">🌍</div>
                <h3 className="text-xl font-bold text-primary mb-3">Impact & Development Advisors</h3>
                <p className="text-muted-foreground text-sm">
                  Former UN officials, grant specialists, and impact measurement experts guiding our SDG alignment and
                  partnership strategy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-primary/95 to-primary/90">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Join Our Mission-Driven Team</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We're building a team of passionate professionals committed to ensuring AI healthcare benefits reach every
            corner of Africa. If you share our vision, we want to hear from you.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-white text-lg px-8 py-6">
              <Link href="/about/careers">View Open Positions</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white text-primary hover:bg-white/90 border-white text-lg px-8 py-6"
            >
              <Link href="/about/partnerships">Partner With Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
