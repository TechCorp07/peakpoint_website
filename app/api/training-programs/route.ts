import { NextResponse } from "next/server"
import { strapi } from "@/lib/strapi"

export async function GET() {
  try {
    const data = await strapi.getTrainingPrograms()

    return NextResponse.json({
      programs: data?.data || [],
    })
  } catch (error) {
    console.error("Failed to fetch training programs:", error)

    // Fallback data
    return NextResponse.json({
      programs: [
        { id: 1, name: "MRI Imaging Training", type: "Healthcare", duration: "8 weeks", level: "Intermediate" },
        { id: 2, name: "Data Annotation Training", type: "Technology", duration: "6 weeks", level: "Beginner" },
        { id: 3, name: "RCM Training", type: "Healthcare", duration: "10 weeks", level: "Advanced" },
        { id: 4, name: "Medical Coding Fundamentals", type: "Healthcare", duration: "12 weeks", level: "Beginner" },
        { id: 5, name: "AI-Assisted Medical Imaging", type: "Healthcare", duration: "8 weeks", level: "Advanced" },
        { id: 6, name: "Healthcare Data Analytics", type: "Healthcare", duration: "10 weeks", level: "Intermediate" },
      ],
    })
  }
}
