"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface TrainingProgram {
  id: number
  name: string
  type: string
  duration: string
  level: string
}

export default function EnrollPage() {
  const [programs, setPrograms] = useState<TrainingProgram[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    trainingProgram: "",
    trainingType: "",
    experienceLevel: "",
    preferredStartDate: "",
    learningGoals: "",
    howHeardAboutUs: "",
  })

  useEffect(() => {
    // Fetch training programs from CMS
    fetch("/api/training-programs")
      .then((res) => res.json())
      .then((data) => setPrograms(data.programs || []))
      .catch((err) => console.error("Failed to fetch programs:", err))
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          jobTitle: "",
          trainingProgram: "",
          trainingType: "",
          experienceLevel: "",
          preferredStartDate: "",
          learningGoals: "",
          howHeardAboutUs: "",
        })
      } else {
        alert("Failed to submit enrollment. Please try again.")
      }
    } catch (error) {
      console.error("Enrollment error:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-gray-100">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto text-center"
          >
            <CheckCircle className="w-20 h-20 text-accent mx-auto mb-6" />
            <h1 className="text-4xl font-bold text-primary mb-4">Enrollment Submitted!</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Thank you for your interest in our training programs. Our team will review your application and contact
              you within 24-48 hours.
            </p>
            <div className="flex gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/services/education">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Education
                </Link>
              </Button>
              <Button asChild>
                <Link href="/services/education/training-resources">View Resources</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-blue-50/30 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b border-gray-200">
        <div className="container mx-auto px-4 py-8">
          <Link
            href="/services/education"
            className="inline-flex items-center text-muted-foreground hover:text-primary mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Education
          </Link>
          <h1 className="text-4xl font-bold text-primary mb-2">Enroll in Training</h1>
          <p className="text-lg text-muted-foreground">
            Start your learning journey with Peak Point's expert-led training programs
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            {/* Personal Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Personal Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Professional Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Professional Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input
                    id="jobTitle"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Training Selection */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Training Selection</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="trainingProgram">Training Program *</Label>
                  <select
                    id="trainingProgram"
                    name="trainingProgram"
                    value={formData.trainingProgram}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select a program</option>
                    {programs.map((program) => (
                      <option key={program.id} value={program.name}>
                        {program.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="trainingType">Training Type *</Label>
                  <select
                    id="trainingType"
                    name="trainingType"
                    value={formData.trainingType}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select type</option>
                    <option value="online">Online</option>
                    <option value="in-person">In-Person</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="experienceLevel">Experience Level *</Label>
                  <select
                    id="experienceLevel"
                    name="experienceLevel"
                    value={formData.experienceLevel}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select level</option>
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="preferredStartDate">Preferred Start Date</Label>
                  <Input
                    id="preferredStartDate"
                    name="preferredStartDate"
                    type="date"
                    value={formData.preferredStartDate}
                    onChange={handleChange}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-4">Additional Information</h2>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="learningGoals">Learning Goals & Objectives</Label>
                  <Textarea
                    id="learningGoals"
                    name="learningGoals"
                    value={formData.learningGoals}
                    onChange={handleChange}
                    rows={4}
                    className="mt-1"
                    placeholder="Tell us about your learning goals and what you hope to achieve..."
                  />
                </div>
                <div>
                  <Label htmlFor="howHeardAboutUs">How did you hear about us?</Label>
                  <select
                    id="howHeardAboutUs"
                    name="howHeardAboutUs"
                    value={formData.howHeardAboutUs}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  >
                    <option value="">Select an option</option>
                    <option value="search-engine">Search Engine</option>
                    <option value="social-media">Social Media</option>
                    <option value="referral">Referral</option>
                    <option value="advertisement">Advertisement</option>
                    <option value="event">Event/Conference</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/services/education">Cancel</Link>
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Enrollment"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
