"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Search, Download, Play, FileText, BookOpen, Video, ArrowLeft, Filter } from "lucide-react"

interface TrainingResource {
  id: string
  title: string
  description: string
  type: "video" | "document" | "guide" | "webinar"
  category: string
  duration?: string
  fileUrl?: string
  thumbnail?: string
  publishedAt: string
}

export default function TrainingResourcesPage() {
  const [resources, setResources] = useState<TrainingResource[]>([])
  const [filteredResources, setFilteredResources] = useState<TrainingResource[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedType, setSelectedType] = useState<string>("all")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  // Fallback data
  const defaultResources: TrainingResource[] = [
    {
      id: "1",
      title: "Introduction to MRI Technology",
      description: "Comprehensive overview of MRI fundamentals, safety protocols, and best practices.",
      type: "video",
      category: "MRI Training",
      duration: "45 min",
      thumbnail: "/mri-machine.jpg",
      publishedAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Medical Data Annotation Guide",
      description: "Step-by-step guide for accurate medical data annotation and quality control.",
      type: "document",
      category: "Data Annotation",
      fileUrl: "#",
      publishedAt: "2024-01-20",
    },
    {
      id: "3",
      title: "RCM Best Practices Webinar",
      description: "Live webinar covering revenue cycle management optimization strategies.",
      type: "webinar",
      category: "RCM Training",
      duration: "60 min",
      thumbnail: "/business-meeting.jpg",
      publishedAt: "2024-02-01",
    },
    {
      id: "4",
      title: "HIPAA Compliance Training",
      description: "Essential training on HIPAA regulations and compliance requirements.",
      type: "video",
      category: "Compliance",
      duration: "30 min",
      thumbnail: "/security-compliance.jpg",
      publishedAt: "2024-02-10",
    },
    {
      id: "5",
      title: "Medical Coding Reference Manual",
      description: "Complete reference guide for ICD-10 and CPT coding standards.",
      type: "guide",
      category: "RCM Training",
      fileUrl: "#",
      publishedAt: "2024-02-15",
    },
    {
      id: "6",
      title: "AI in Healthcare Data Annotation",
      description: "Advanced techniques for AI-powered medical data annotation.",
      type: "video",
      category: "Data Annotation",
      duration: "50 min",
      thumbnail: "/ai-healthcare.png",
      publishedAt: "2024-03-01",
    },
  ]

  useEffect(() => {
    // Fetch from CMS or use fallback
    const fetchResources = async () => {
      try {
        // TODO: Implement Strapi fetch when CMS is ready
        // const response = await fetch('/api/training-resources')
        // const data = await response.json()
        // setResources(data)
        setResources(defaultResources)
        setFilteredResources(defaultResources)
      } catch (error) {
        console.warn("Failed to fetch training resources, using fallback")
        setResources(defaultResources)
        setFilteredResources(defaultResources)
      }
    }

    fetchResources()
  }, [])

  useEffect(() => {
    let filtered = resources

    // Filter by type
    if (selectedType !== "all") {
      filtered = filtered.filter((r) => r.type === selectedType)
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((r) => r.category === selectedCategory)
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (r) =>
          r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    setFilteredResources(filtered)
  }, [searchQuery, selectedType, selectedCategory, resources])

  const resourceTypes = [
    { value: "all", label: "All Types", icon: Filter },
    { value: "video", label: "Videos", icon: Video },
    { value: "document", label: "Documents", icon: FileText },
    { value: "guide", label: "Guides", icon: BookOpen },
    { value: "webinar", label: "Webinars", icon: Play },
  ]

  const categories = ["all", "MRI Training", "Data Annotation", "RCM Training", "Compliance"]

  const getResourceIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-5 w-5" />
      case "document":
        return <FileText className="h-5 w-5" />
      case "guide":
        return <BookOpen className="h-5 w-5" />
      case "webinar":
        return <Play className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <main className="pt-20 min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-green-50 via-white to-blue-50/30 py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <Link
              href="/services/education"
              className="inline-flex items-center text-primary hover:text-accent mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Education Services
            </Link>
            <div className="max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">Training Resources</h1>
              <p className="text-xl text-muted-foreground">
                Access our comprehensive library of training materials, guides, and educational content to enhance your
                skills and knowledge.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 bg-white border-b">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search resources..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>

              {/* Type Filter */}
              <div className="flex gap-2 flex-wrap">
                {resourceTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <Button
                      key={type.value}
                      variant={selectedType === type.value ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedType(type.value)}
                      className={selectedType === type.value ? "bg-accent hover:bg-accent-hover" : ""}
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {type.label}
                    </Button>
                  )
                })}
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 mt-4 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-primary hover:bg-primary/90 text-white" : ""}
                >
                  {category === "all" ? "All Categories" : category}
                </Button>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Grid */}
        <section className="py-16 bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="mb-8">
              <p className="text-muted-foreground">
                Showing {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"}
              </p>
            </div>

            {filteredResources.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-foreground mb-2">No resources found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search query</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
                  >
                    {/* Thumbnail for videos/webinars */}
                    {(resource.type === "video" || resource.type === "webinar") && resource.thumbnail && (
                      <div className="relative h-48 overflow-hidden bg-gray-100">
                        <img
                          src={resource.thumbnail || "/placeholder.svg"}
                          alt={resource.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-primary/20 group-hover:bg-primary/30 transition-colors flex items-center justify-center">
                          <div className="bg-white/90 rounded-full p-4">{getResourceIcon(resource.type)}</div>
                        </div>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-accent/10 text-accent rounded-full text-sm font-medium">
                          {getResourceIcon(resource.type)}
                          <span className="capitalize">{resource.type}</span>
                        </span>
                        {resource.duration && (
                          <span className="text-sm text-muted-foreground">{resource.duration}</span>
                        )}
                      </div>

                      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                        {resource.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-2">{resource.description}</p>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{resource.category}</span>
                        <Button size="sm" className="bg-accent hover:bg-accent-hover">
                          {resource.type === "video" || resource.type === "webinar" ? (
                            <>
                              <Play className="h-4 w-4 mr-2" />
                              Watch
                            </>
                          ) : (
                            <>
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-primary to-[#1a2a5e]">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Need More Support?</h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Our training specialists are here to help you find the right resources and answer your questions.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent-hover text-white">
              <Link href="/contact">Contact Training Team</Link>
            </Button>
          </div>
        </section>
    </main>
  )
}
