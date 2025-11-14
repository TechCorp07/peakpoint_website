"use client"

import { Headphones, Calculator, Heart, Brain, Users, Shield, TrendingUp, Mail } from "lucide-react"

const services = [
  {
    icon: <Users className="w-12 h-12" />,
    title: "Business Process Outsourcing",
    description:
      "End-to-end BPO solutions tailored to your business needs. From back-office operations to front-office support, we handle it all.",
    features: ["Process Optimization", "Quality Assurance", "Scalable Solutions", "24/7 Operations"],
  },
  {
    icon: <Mail className="w-12 h-12" />,
    title: "Administrative Support",
    description:
      "Professional administrative services to keep your business running smoothly. Focus on growth while we handle the details.",
    features: ["Data Entry", "Document Management", "Scheduling", "Email Management"],
  },
  {
    icon: <Calculator className="w-12 h-12" />,
    title: "Finance & Accounting",
    description:
      "Comprehensive financial services from bookkeeping to complex financial analysis. Accurate, compliant, and cost-effective.",
    features: ["Bookkeeping", "Accounts Payable/Receivable", "Financial Reporting", "Tax Preparation"],
  },
  {
    icon: <Heart className="w-12 h-12" />,
    title: "Healthcare Revenue Cycle Management",
    description:
      "Specialized RCM services to maximize revenue and minimize denials. HIPAA-compliant and industry-certified.",
    features: ["Medical Billing", "Claims Processing", "Denial Management", "Patient Collections"],
  },
  {
    icon: <Brain className="w-12 h-12" />,
    title: "AI & Data Intelligence",
    description:
      "Harness the power of AI and data analytics to drive insights and automation. Transform data into actionable intelligence.",
    features: ["Data Analytics", "AI Implementation", "Process Automation", "Predictive Modeling"],
  },
  {
    icon: <Headphones className="w-12 h-12" />,
    title: "Customer Support",
    description: "World-class customer support that enhances your brand. Multi-channel support available 24/7/365.",
    features: ["Phone Support", "Email Support", "Live Chat", "Social Media Management"],
  },
  {
    icon: <Shield className="w-12 h-12" />,
    title: "IT Security & Compliance",
    description:
      "Protect your business with enterprise-grade security and compliance services. Stay secure, stay compliant.",
    features: ["Security Audits", "Compliance Management", "Risk Assessment", "Incident Response"],
  },
  {
    icon: <TrendingUp className="w-12 h-12" />,
    title: "Digital Marketing",
    description:
      "Data-driven marketing strategies to grow your brand and reach your audience. From SEO to social media management.",
    features: ["SEO/SEM", "Content Marketing", "Social Media", "Email Campaigns"],
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-slate-900 to-slate-800 text-white py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Services</h1>
              <p className="text-xl text-slate-300">
                Comprehensive BPO solutions designed to help your business operate leaner, scale faster, and compete
                globally.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-slate-50 rounded-2xl p-8 hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-slate-700">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Operations?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Let's discuss how Peak Point can help you achieve your business goals.
            </p>
            <a
              href="/contact"
              className="inline-block bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-colors"
            >
              Get Started Today
            </a>
          </div>
        </section>
    </main>
  )
}
