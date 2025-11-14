import { ComingSoon } from "./coming-soon"

interface CMSContentWrapperProps {
  data: any
  fallbackContent?: React.ReactNode
  showComingSoon?: boolean
  comingSoonProps?: {
    title?: string
    message?: string
    estimatedDate?: string
  }
  children: React.ReactNode
}

/**
 * Wrapper component that handles missing CMS content gracefully
 * Shows a Coming Soon page when data is unavailable instead of breaking
 */
export function CMSContentWrapper({
  data,
  fallbackContent,
  showComingSoon = true,
  comingSoonProps,
  children,
}: CMSContentWrapperProps) {
  // If data exists, render the children (actual content)
  if (data) {
    return <>{children}</>
  }

  // If no data and we have fallback content, use that
  if (fallbackContent) {
    return <>{fallbackContent}</>
  }

  // If no data and showComingSoon is true, show the coming soon page
  if (showComingSoon) {
    return (
      <main className="pt-20 min-h-screen bg-background">
        <ComingSoon {...comingSoonProps} />
      </main>
    )
  }

  // Last resort: render children anyway (might show errors but won't break)
  return <>{children}</>
}

/**
 * Helper function to safely get CMS data with fallback
 */
export function getCMSData<T>(response: any, fallbackData?: T): T | null {
  if (response?.data?.attributes) {
    return response.data.attributes as T
  }
  return fallbackData || null
}

/**
 * Helper function to merge CMS data with fallback data field by field
 */
export function mergeCMSData<T extends Record<string, any>>(
  cmsData: any,
  fallbackData: T
): T {
  if (!cmsData) return fallbackData

  const merged = { ...fallbackData }

  for (const key in fallbackData) {
    if (cmsData[key] !== undefined && cmsData[key] !== null) {
      // Handle nested image objects from Strapi
      if (cmsData[key]?.data?.attributes?.url) {
        merged[key] = cmsData[key].data.attributes.url as any
      } else {
        merged[key] = cmsData[key]
      }
    }
  }

  return merged
}
