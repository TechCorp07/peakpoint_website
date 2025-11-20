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
    return data || null
  } catch (error) {
    return null
  }
}

async function getPartnerStories() {
  try {
    const data = await strapi.getPartnerStories()
    return data || null
  } catch (error) {
    return null
  }
}

export default async function HomePage() {
  const [homepageContent, metricsSection, partnersSection, caseStudiesData] = await Promise.all([
     getHomepageContent(),
     getMetricsSection(),
     getPartnersSection(),
     getCaseStudies(),
   ])
   
  const isStrapiDown = !homepageContent

  const industriesData = homepageContent?.industriesSection || {}

  const benefitsSectionData = homepageContent?.benefitsSection || {}
  
  const transformedBenefits = benefitsSectionData?.benefits?.map((benefit: any) => ({
    id: benefit.id,
    title: benefit.title || "",
    description: benefit.description || "",
    impact: benefit.impact || "",
    image: benefit.image?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${benefit.image.url}`
      : benefit.image?.data?.attributes?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${benefit.image.data.attributes.url}`
        : "/placeholder.svg",
    link: benefit.link || "#"
  })) || []

  const heroSlides = homepageContent?.heroSlides?.map((slide: any) => ({
    id: slide.id,
    title: slide.title || "",
    description: slide.description || "",
    ctaText: slide.ctaText || "Learn More",
    ctaLink: slide.ctaLink || "/",
    backgroundImage: slide.backgroundImage?.url
      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.backgroundImage.url}`
      : "/placeholder.svg",
    order: slide.order || 0,
  })) || undefined

  const testimonialsCaseStudies = caseStudiesData?.slice(0, 3).map((study: any) => {
    // Handle both flat and nested Strapi response structures
    const attrs = study.attributes || study;

    return {
      id: study.id || study.documentId,
      title: attrs.title || "",
      client: attrs.client || "",
      industry: attrs.industry || "",
      description: attrs.description || attrs.solution || "", // Fallback to solution if no description
      videoUrl: attrs.videoUrl || undefined,
      image: attrs.image?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.image.url}`
        : attrs.image?.data?.attributes?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.image.data.attributes.url}`
          : "/placeholder.svg",
      metrics: Array.isArray(attrs.metrics) && attrs.metrics.length > 0
        ? attrs.metrics
        : [],
      logo: attrs.logo?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.logo.url}`
        : attrs.logo?.data?.attributes?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.logo.data.attributes.url}`
          : "/placeholder.svg",
      slug: attrs.slug || "",
    };
  });

  const caseStudiesSectionData = caseStudiesData?.slice(0, 2).map((study: any) => {
    // Handle both flat and nested Strapi response structures
    const attrs = study.attributes || study;

    return {
      id: study.id || study.documentId,
      title: attrs.title || "",
      client: attrs.client || "",
      industry: attrs.industry || "",
      challenge: attrs.challenge || "",
      result: attrs.solution || "", // Using solution as result
      metrics: Array.isArray(attrs.metrics) && attrs.metrics.length > 0
        ? attrs.metrics
        : [],
      image: attrs.image?.url
        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.image.url}`
        : attrs.image?.data?.attributes?.url
          ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${attrs.image.data.attributes.url}`
          : "/placeholder.svg",
    };
  });

  return (
    <>
      <HeroSlider slides={heroSlides} showDevWarning={isStrapiDown} />
      <IndustriesSection
        title={industriesData.title}
        subtitle={industriesData.subtitle}
        industries={industriesData.industries}
        showDevWarning={isStrapiDown}
      />
      <BenefitsCarousel
        benefits={transformedBenefits}
        sectionTitle={benefitsSectionData?.title}
        sectionSubtitle={benefitsSectionData?.subtitle}
        showDevWarning={!benefitsSectionData}
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
