import { strapi } from "@/lib/strapi"
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Peak Point Africa | Enterprise BPO Solutions",
  description:
    "Transform your business with Peak Point Africa - Leading BPO provider offering admin support, finance & accounting, healthcare RCM, AI intelligence, and customer support services across Africa.",
  keywords:
    "BPO, Business Process Outsourcing, Africa, Peak Point, Admin Support, Finance, Healthcare RCM, AI Intelligence, Customer Support",
  openGraph: {
    title: "Peak Point Africa | Enterprise BPO Solutions",
    description: "Outsource smarter. Operate leaner. Grow faster.",
    type: "website",
    url: "https://peakpoint.africa",
  },
    generator: 'v0.app'
}

// Fetch once at layout level
async function getLayoutData() {
  const [siteSettings, footerSettings, footerNav] = await Promise.all([
    strapi.getSiteSettings(),
    strapi.getFooterSettings(),
    strapi.getFooterNavigation(),
  ])
  
  return {
    siteSettings: siteSettings?.data || null,
    footerSettings: footerSettings?.data || null,
    footerNav: footerNav?.data || null,
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const layoutData = await getLayoutData()

  return (
    <html lang="en">
      <body>
        <Header 
          logo={layoutData.siteSettings?.logo?.data?.attributes?.url}
          siteName={layoutData.siteSettings?.siteName}
        />
        {children}
        <Footer 
          siteSettings={layoutData.siteSettings}
          footerSettings={layoutData.footerSettings}
          footerNav={layoutData.footerNav}
        />
      </body>
    </html>
  )
}
