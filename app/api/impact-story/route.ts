import { strapi } from "@/lib/strapi"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await strapi.getImpactStory()

    if (!response?.data) {
      return NextResponse.json(null, { status: 404 })
    }

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("Error fetching impact story:", error)
    return NextResponse.json(null, { status: 500 })
  }
}
