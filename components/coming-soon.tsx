import { Construction, Clock, Mail } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ComingSoonProps {
  title?: string
  message?: string
  showContactButton?: boolean
  estimatedDate?: string
}

export function ComingSoon({
  title = "Coming Soon",
  message = "We're working hard to bring you this content. Check back soon for updates!",
  showContactButton = true,
  estimatedDate,
}: ComingSoonProps) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-accent/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 bg-accent/10 rounded-full flex items-center justify-center">
                <Construction className="w-12 h-12 text-accent" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center animate-pulse">
                <Clock className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">{title}</h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">{message}</p>

          {estimatedDate && (
            <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-6 py-3 rounded-full mb-8">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Expected: {estimatedDate}</span>
            </div>
          )}

          {showContactButton && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button asChild size="lg" className="bg-accent hover:bg-accent-hover">
                <Link href="/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/">Back to Home</Link>
              </Button>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              In the meantime, explore our other services and offerings
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-4">
              <Link href="/services" className="text-accent hover:underline text-sm font-medium">
                Our Services
              </Link>
              <Link href="/about" className="text-accent hover:underline text-sm font-medium">
                About Us
              </Link>
              <Link href="/insights/blog" className="text-accent hover:underline text-sm font-medium">
                Blog & Insights
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
