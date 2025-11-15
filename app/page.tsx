import { HeroSlider } from "@/components/home/hero-slider"
import { IndustriesSection } from "@/components/home/industries-section"
import { BenefitsCarousel } from "@/components/home/benefits-carousel"
import { TestimonialsSection } from "@/components/home/testimonials-section"
import { MetricsSection } from "@/components/home/metrics-section"
import { PartnersScroll } from "@/components/home/partners-scroll"
import { CaseStudiesSection } from "@/components/home/case-studies-section"
import { AIAssistant } from "@/components/ai-assistant/chat-widget"
import { strapi } from "@/lib/strapi"

async function getHomepageContent() {
  try {
    const data = await strapi.getHomepageContent()
    return data?.data || null
  } catch (error) {
    console.warn("Failed to fetch homepage content from CMS")
    return null
  }
}

async function getBenefitsSection() {
  try {
    const data = await strapi.getBenefitsSection()
    return data?.data || null
  } catch (error) {
    return null
  }
}

async function getMetricsSection() {
  try {
    const data = await strapi.getMetricsSection()
    return data?.data || null
  } catch (error) {
    return null
  }
}

async function getPartnersSection() {
  try {
    const data = await strapi.getPartnersSection()
    return data?.data || null
  } catch (error) {
    return null
  }
}

async function getCaseStudies() {
  try {
    const data = await strapi.getCaseStudies()
    return data?.data || null
  } catch (error) {
    return null
  }
}

export default async function HomePage() {
  const [homepageContent, benefitsSection, metricsSection, partnersSection, caseStudiesData] = await Promise.all([
    getHomepageContent(),
    getBenefitsSection(),
    getMetricsSection(),
    getPartnersSection(),
    getCaseStudies(),
  ])
  
  const isStrapiDown = !homepageContent

  const industriesData = homepageContent?.industriesSection || {}

  const heroSlides = homepageContent?.heroSlides?.map((slide: any) => ({
    id: slide.id,
    title: slide.title || "",
    description: slide.description || "",
    ctaText: slide.ctaText || "Learn More",
    ctaLink: slide.ctaLink || "/",
    backgroundImage: slide.backgroundImage?.data?.attributes?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.backgroundImage.data.attributes.url}`
      : "/placeholder.svg",
    order: slide.order || 0,
  })) || undefined

  const testimonialsCaseStudies = caseStudiesData?.slice(0, 3).map((study: any) => ({
    id: study.id,
    title: study.attributes?.title || "",
    client: study.attributes?.client || "",
    industry: study.attributes?.industry || "",
    description: study.attributes?.description || "",
    videoUrl: study.attributes?.videoUrl,
    image: study.attributes?.image?.data?.attributes?.url || "/placeholder.svg",
    metrics: study.attributes?.metrics || [],
    logo: study.attributes?.logo?.data?.attributes?.url || "/placeholder.svg",
    slug: study.attributes?.slug || "",
  }))

  const caseStudiesSectionData = caseStudiesData?.slice(0, 2).map((study: any) => ({
    id: study.id,
    title: study.attributes?.title || "",
    client: study.attributes?.client || "",
    industry: study.attributes?.industry || "",
    challenge: study.attributes?.challenge || "",
    result: study.attributes?.result || "",
    metrics: study.attributes?.metrics || [],
    image: study.attributes?.image?.data?.attributes?.url || "/placeholder.svg",
  }))

  return (
    <>
      {/* 🔍 TEMPORARY DEBUG PANEL - Remove after fixing */}
      <div style={{ 
        position: 'fixed', 
        top: 0, 
        right: 0, 
        background: 'black', 
        color: 'lime', 
        padding: '20px',
        maxWidth: '400px',
        maxHeight: '400px',
        overflow: 'auto',
        zIndex: 9999,
        fontSize: '10px',
        fontFamily: 'monospace'
      }}>
        <strong>RAW STRAPI DATA:</strong>
        <pre>{JSON.stringify(homepageContent?.heroSlides?.[0], null, 2)}</pre>
        <hr />
        <strong>TRANSFORMED DATA:</strong>
        <pre>{JSON.stringify(heroSlides?.[0], null, 2)}</pre>
      </div>
      
      <HeroSlider slides={heroSlides} showDevWarning={isStrapiDown} />
      <IndustriesSection
        title={industriesData.title}
        subtitle={industriesData.subtitle}
        industries={industriesData.industries}
        showDevWarning={isStrapiDown}
      />
      <BenefitsCarousel
        benefits={benefitsSection?.benefits}
        sectionTitle={benefitsSection?.sectionTitle}
        sectionSubtitle={benefitsSection?.sectionSubtitle}
        showDevWarning={!benefitsSection}
      />
      <TestimonialsSection caseStudies={testimonialsCaseStudies} />
      <MetricsSection
        metrics={metricsSection?.metrics}
        sectionTitle={metricsSection?.sectionTitle}
        sectionSubtitle={metricsSection?.sectionSubtitle}
        showDevWarning={!metricsSection}
      />
      <PartnersScroll
        partners={partnersSection?.partners}
        sectionTitle={partnersSection?.sectionTitle}
        showDevWarning={!partnersSection}
      />
      <CaseStudiesSection caseStudies={caseStudiesSectionData} />
      <AIAssistant />
    </>
  )
}
