"use client"

import { useEffect, useState } from "react"

interface IndustryFilterProps {
  onFilterChange: (industry: string) => void
  activeFilter: string
  availableIndustries?: string[]
}

export function IndustryFilter({ onFilterChange, activeFilter, availableIndustries = [] }: IndustryFilterProps) {
  const [industries, setIndustries] = useState([
    { id: "all", label: "All Industry Insights" },
    { id: "healthcare", label: "Healthcare" },
    { id: "education", label: "Education" },
    { id: "enterprise", label: "Enterprise" },
    { id: "technology", label: "Technology" },
  ])

  useEffect(() => {
    if (availableIndustries.length > 0) {
      const dynamicIndustries = [
        { id: "all", label: "All Industry Insights" },
        ...availableIndustries.map((industry) => ({
          id: industry.toLowerCase(),
          label: industry.charAt(0).toUpperCase() + industry.slice(1),
        })),
      ]
      setIndustries(dynamicIndustries)
    }
  }, [availableIndustries])

  const handleClick = (industryId: string) => {
    console.log("[v0] Filter clicked:", industryId)
    onFilterChange(industryId)
  }

  return (
    <div className="flex flex-wrap gap-3 mb-12">
      {industries.map((industry) => (
        <button
          key={industry.id}
          onClick={() => handleClick(industry.id)}
          className={`px-6 py-3 rounded-full font-medium transition-all ${
            activeFilter === industry.id
              ? "bg-accent text-white shadow-lg shadow-accent/30"
              : "bg-secondary text-foreground hover:bg-secondary/80 border border-border"
          }`}
        >
          {industry.label}
        </button>
      ))}
    </div>
  )
}
