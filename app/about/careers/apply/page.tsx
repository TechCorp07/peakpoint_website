"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

export default function JobApplicationPage() {
  const searchParams = useSearchParams()
  const jobTitle = searchParams.get("job") || "Position"

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    linkedIn: "",
    coverLetter: "",
    jobTitle: jobTitle,
  })

  const [cvFile, setCvFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    setFormData((prev) => ({ ...prev, jobTitle }))
  }, [jobTitle])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      // Validate file type and size
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ]
      const maxSize = 5 * 1024 * 1024 // 5MB

      if (!validTypes.includes(file.type)) {
        setErrorMessage("Please upload a PDF or Word document")
        return
      }

      if (file.size > maxSize) {
        setErrorMessage("File size must be less than 5MB")
        return
      }

      setCvFile(file)
      setErrorMessage("")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!cvFile) {
      setErrorMessage("Please upload your CV/Resume")
      return
    }

    setIsSubmitting(true)
    setErrorMessage("")

    try {
      const formDataToSend = new FormData()
      formDataToSend.append("fullName", formData.fullName)
      formDataToSend.append("email", formData.email)
      formDataToSend.append("phone", formData.phone)
      formDataToSend.append("location", formData.location)
      formDataToSend.append("linkedIn", formData.linkedIn)
      formDataToSend.append("coverLetter", formData.coverLetter)
      formDataToSend.append("jobTitle", formData.jobTitle)
      formDataToSend.append("cv", cvFile)

      const response = await fetch("/api/job-applications", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      setSubmitStatus("success")
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        linkedIn: "",
        coverLetter: "",
        jobTitle: jobTitle,
      })
      setCvFile(null)
    } catch (error) {
      console.error("Application submission error:", error)
      setSubmitStatus("error")
      setErrorMessage("Failed to submit application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="pt-20 min-h-screen bg-background">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary to-primary/90 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <Link
              href="/about/careers"
              className="inline-flex items-center text-sm text-white/80 hover:text-white mb-6 transition-colors"
            >
              ← Back to Careers
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Apply for {jobTitle}</h1>
            <p className="text-xl text-white/90 max-w-3xl">
              Join our mission to transform healthcare access across Africa. We're excited to learn more about you.
            </p>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
            {submitStatus === "success" ? (
              <div className="bg-accent/10 border border-accent rounded-xl p-8 text-center">
                <div className="text-6xl mb-4">✅</div>
                <h2 className="text-3xl font-bold text-primary mb-4">Application Submitted!</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Thank you for applying. We've received your application and will review it carefully. If your
                  qualifications match our needs, we'll be in touch within 2 weeks.
                </p>
                <Button asChild className="bg-accent hover:bg-accent-hover">
                  <Link href="/about/careers">View Other Positions</Link>
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
                  <h3 className="font-semibold text-primary mb-2">Before you apply:</h3>
                  <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                    <li>Ensure your CV is up to date (PDF or Word format, max 5MB)</li>
                    <li>Prepare a brief cover letter explaining your interest in this role</li>
                    <li>Have your LinkedIn profile URL ready (optional but recommended)</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-semibold text-primary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-primary mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="+254 700 000 000"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-semibold text-primary mb-2">
                      Current Location *
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                      placeholder="Nairobi, Kenya"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="linkedIn" className="block text-sm font-semibold text-primary mb-2">
                    LinkedIn Profile (Optional)
                  </label>
                  <input
                    type="url"
                    id="linkedIn"
                    name="linkedIn"
                    value={formData.linkedIn}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                    placeholder="https://linkedin.com/in/yourprofile"
                  />
                </div>

                <div>
                  <label htmlFor="cv" className="block text-sm font-semibold text-primary mb-2">
                    Upload CV/Resume *
                  </label>
                  <input
                    type="file"
                    id="cv"
                    name="cv"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-accent-hover"
                  />
                  <p className="text-xs text-muted-foreground mt-2">Accepted formats: PDF, DOC, DOCX (Max size: 5MB)</p>
                  {cvFile && <p className="text-sm text-accent mt-2">✓ {cvFile.name} selected</p>}
                </div>

                <div>
                  <label htmlFor="coverLetter" className="block text-sm font-semibold text-primary mb-2">
                    Cover Letter *
                  </label>
                  <textarea
                    id="coverLetter"
                    name="coverLetter"
                    required
                    value={formData.coverLetter}
                    onChange={handleInputChange}
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
                    placeholder="Tell us why you're interested in this role and how you'll contribute to our mission of bridging the AI healthcare gap..."
                  />
                  <p className="text-xs text-muted-foreground mt-2">Minimum 100 characters</p>
                </div>

                {errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {errorMessage}
                  </div>
                )}

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-accent hover:bg-accent-hover text-white py-6 text-lg"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                  <Button type="button" variant="outline" asChild className="px-8 bg-transparent">
                    <Link href="/about/careers">Cancel</Link>
                  </Button>
                </div>
              </form>
            )}
          </div>
        </section>
    </main>
  )
}
