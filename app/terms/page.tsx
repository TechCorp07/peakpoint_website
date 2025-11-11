import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | Peak Point Services",
  description: "Terms and conditions for using Peak Point BPO services",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-8">Terms and Conditions</h1>
        <p className="text-muted-foreground mb-8">Last Updated: January 2025</p>

        <div className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using Peak Point Services ("Peak Point," "we," "us," or "our"), you accept and agree to
              be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please
              do not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Services Description</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Peak Point provides Business Process Outsourcing (BPO) services including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Administrative Support Services</li>
              <li>Finance and Accounting Services</li>
              <li>Healthcare Revenue Cycle Management</li>
              <li>Customer Support Services</li>
              <li>AI and Data Intelligence Services</li>
              <li>IT Security and Compliance Services</li>
              <li>Marketing and Digital Services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Service Level Agreements</h2>
            <p className="text-muted-foreground leading-relaxed">
              Specific service level agreements (SLAs) will be defined in individual client contracts. These SLAs will
              outline performance metrics, response times, quality standards, and remediation procedures for service
              failures.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Protection and Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Peak Point is committed to protecting client data in accordance with applicable data protection laws
              including GDPR, HIPAA (where applicable), and local African data protection regulations. All data
              processing activities are governed by our Privacy Policy and Data Processing Agreements.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">5. Confidentiality</h2>
            <p className="text-muted-foreground leading-relaxed">
              Both parties agree to maintain the confidentiality of all proprietary information shared during the course
              of the business relationship. This includes but is not limited to business processes, customer data,
              financial information, and trade secrets.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Intellectual Property</h2>
            <p className="text-muted-foreground leading-relaxed">
              All intellectual property rights in materials created by Peak Point in the course of providing services
              shall be owned by the client, unless otherwise agreed in writing. Peak Point retains ownership of its
              proprietary methodologies, tools, and processes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Payment Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              Payment terms will be specified in individual service agreements. Standard payment terms are Net 30 days
              from invoice date. Late payments may incur interest charges as permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Termination</h2>
            <p className="text-muted-foreground leading-relaxed">
              Either party may terminate services with written notice as specified in the service agreement. Typical
              notice periods range from 30 to 90 days depending on the scope and complexity of services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Peak Point's liability for any claims arising from services provided shall be limited to the fees paid for
              the specific services in question during the 12 months preceding the claim, except in cases of gross
              negligence or willful misconduct.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction where Peak
              Point's primary operations are located, without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-foreground mb-4">11. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              For questions about these Terms and Conditions, please contact us at:
              <br />
              Email: legal@peakpoint.africa
              <br />
              Address: Peak Point Services, Africa
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
