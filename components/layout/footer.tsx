import Link from "next/link"
import Image from "next/image"

interface FooterProps {
  siteSettings: any
  footerSettings: any
  footerNav: any
}

export function Footer({ siteSettings, footerSettings, footerNav }: FooterProps) {
  // Use a static year or get from settings to avoid hydration issues
  const currentYear = footerSettings?.currentYear || new Date().getFullYear()

  const socialLinks = footerSettings?.socialLinks || {
    linkedin: "#",
    facebook: "#",
    twitter: "#",
    youtube: "#",
    whatsapp: "#",
  }

  const contactInfo = footerSettings?.contactInfo || {
    primaryEmail: "info@peakpoint.africa",
    secondaryEmail: "sales@peakpoint.africa",
    primaryPhone: "+254 XXX XXX XXX",
    secondaryPhone: "+1 XXX XXX XXXX (US)",
    officeLocation: "Nairobi, Kenya",
    regionLocation: "East Africa",
  }

  const industries = footerNav?.industries || [
    {
      name: "Healthcare",
      services: [
        { name: "RCM", href: "/services/healthcare/rcm" },
        { name: "Medical MRI Data Annotations", href: "/services/healthcare/mri-annotations" },
        { name: "Health Equity", href: "/services/healthcare/health-equity" },
      ],
    },
    {
      name: "Education",
      services: [
        { name: "MRI Imaging Training", href: "/services/education/mri-training" },
        { name: "Data Annotation Training", href: "/services/education/data-annotation" },
        { name: "RCM Trainings", href: "/services/education/rcm-training" },
      ],
    },
    {
      name: "Enterprise",
      services: [
        { name: "Workflow Automations", href: "/services/enterprise/workflow-automation" },
        { name: "Cloud Infrastructure", href: "/services/enterprise/cloud-infrastructure" },
        { name: "Advanced Security (SOC)", href: "/services/enterprise/security-soc" },
      ],
    },
    {
      name: "Technology",
      services: [
        { name: "Virtual Tech Support", href: "/services/technology/tech-support" },
        { name: "QA Testing", href: "/services/technology/qa-testing" },
        { name: "Medical Data Labelling", href: "/services/technology/data-labelling" },
        { name: "IT Helpdesk", href: "/services/technology/it-helpdesk" },
      ],
    },
  ]

  const companyTagline = footerNav?.companyTagline || "Outsource smarter, Operate leaner, Grow faster."
  const copyrightText = footerNav?.copyrightText || "Peak Point Africa. All rights reserved."

  const logo = siteSettings?.logo?.data?.attributes?.url || "/logo.png"
  const siteName = siteSettings?.siteName || "Peak Point Services"

  return (
    <footer className="relative bg-gradient-to-b from-secondary via-muted to-secondary/80 text-foreground border-t border-border">
      <div className="relative container mx-auto px-4 lg:px-8 py-10 leading-7">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image src={logo} alt={siteName} width={180} height={45} className="h-9 w-auto" />
            </Link>
            <p className="text-foreground/70 text-sm leading-relaxed mb-6">{companyTagline}</p>

            <div className="space-y-3 mb-6">
              {/* Email */}
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 flex-shrink-0 text-accent mt-0.5">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 text-sm">
                  <a href={`mailto:${contactInfo.primaryEmail}`} className="hover:text-accent block">
                    {contactInfo.primaryEmail}
                  </a>
                  {contactInfo.secondaryEmail && (
                    <a href={`mailto:${contactInfo.secondaryEmail}`} className="hover:text-accent block">
                      {contactInfo.secondaryEmail}
                    </a>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 flex-shrink-0 text-accent mt-0.5">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1 text-sm">
                  <a href={`tel:${contactInfo.primaryPhone}`} className="hover:text-accent block">
                    {contactInfo.primaryPhone}
                  </a>
                  {contactInfo.secondaryPhone && (
                    <a href={`tel:${contactInfo.secondaryPhone}`} className="hover:text-accent block">
                      {contactInfo.secondaryPhone}
                    </a>
                  )}
                </div>
              </div>

              {/* Office */}
              <div className="flex gap-3 items-start">
                <div className="w-5 h-5 flex-shrink-0 text-accent mt-0.5">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="flex-1 text-sm">
                  <p>{contactInfo.officeLocation}</p>
                  {contactInfo.regionLocation && <p>{contactInfo.regionLocation}</p>}
                </div>
              </div>

              {/* Business Hours */}
              {contactInfo.supportAvailability && (
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 flex-shrink-0 text-accent mt-0.5">
                    
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <Link
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </Link>
              <Link
                href={socialLinks.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Facebook"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link
                href={socialLinks.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Twitter"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </Link>
              <Link
                href={socialLinks.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="YouTube"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </Link>
              <Link
                href={socialLinks.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </Link>
            </div>
          </div>

          {industries.map((industry: any) => (
            <div key={industry.name}>
              <h3 className="font-bold text-lg mb-4 text-foreground">{industry.name}</h3>
              <ul className="space-y-3">
                {industry.services.map((service: any) => (
                  <li key={service.name}>
                    <Link
                      href={service.href}
                      className="text-foreground/70 hover:text-accent transition-colors text-sm"
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} {copyrightText}
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-accent transition-colors text-sm">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
