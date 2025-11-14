"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { strapi } from "@/lib/strapi"

interface HeaderProps {
  logo?: string
  siteName?: string
}

export function Header({ logo = "/logo.png", siteName = "Peak Point Services" }: HeaderProps) {
  const siteSettings = strapi.getSiteSettings()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return <HeaderClient logo={logo} siteName={siteName} />
}

function HeaderClient({ logo, siteName }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const servicesLinks = [
    { href: "/services/healthcare", label: "Healthcare" },
    { href: "/services/education", label: "Education" },
    { href: "/services/enterprise", label: "Enterprise" },
    { href: "/services/technology", label: "Technology" },
  ]

  const insightsLinks = [
    { href: "/insights/blog", label: "Blog" },
    { href: "/insights/news", label: "News" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/insights/community", label: "Community & Teamwork" },
  ]

  const aboutLinks = [
    { href: "/about/our-story", label: "Our Story" },
    { href: "/about/team", label: "Team" },
    { href: "/about/careers", label: "Careers" },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center group">
            <Image
              src={logo || "/placeholder.svg"} alt={siteName} width={200} height={50}
              className="h-10 w-auto transition-transform group-hover:scale-105" priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {/* Services Dropdown */}
            <div className="relative group">
              <button className="text-foreground/70 hover:text-foreground transition-colors font-medium relative px-4 py-2 flex items-center gap-1">
                Services
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {servicesLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-foreground/70 hover:text-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Insights Dropdown */}
            <div className="relative group">
              <button className="text-foreground/70 hover:text-foreground transition-colors font-medium relative px-4 py-2 flex items-center gap-1">
                Insights
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-56 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {insightsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-foreground/70 hover:text-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* About Us Dropdown */}
            <div className="relative group">
              <button className="text-foreground/70 hover:text-foreground transition-colors font-medium relative px-4 py-2 flex items-center gap-1">
                About Us
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:rotate-180"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-3 text-foreground/70 hover:text-foreground hover:bg-muted transition-colors first:rounded-t-lg last:rounded-b-lg"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Link */}
            <Link
              href="/contact"
              className="text-foreground/70 hover:text-foreground transition-colors font-medium relative group px-4 py-2"
            >
              Contact
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all group-hover:w-full" />
            </Link>
          </nav>

          <div className="hidden md:block">
            <Button asChild className="bg-accent text-white hover:bg-accent-hover font-semibold">
              <Link href="/contact">Impact</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border max-h-[80vh] overflow-y-auto">
            <nav className="flex flex-col gap-4">
              {/* Services Mobile */}
              <div>
                <div className="text-foreground font-semibold mb-2">Services</div>
                {servicesLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-foreground/70 hover:text-foreground transition-colors py-2 pl-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Insights Mobile */}
              <div>
                <div className="text-foreground font-semibold mb-2">Insights</div>
                {insightsLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-foreground/70 hover:text-foreground transition-colors py-2 pl-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* About Us Mobile */}
              <div>
                <div className="text-foreground font-semibold mb-2">About Us</div>
                {aboutLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-foreground/70 hover:text-foreground transition-colors py-2 pl-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <Link
                href="/contact"
                className="text-foreground/70 hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>

              <Button asChild className="bg-accent text-white hover:bg-accent-hover font-semibold mt-2">
                <Link href="/contact">Get Started</Link>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
