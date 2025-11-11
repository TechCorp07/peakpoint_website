import { type NextRequest, NextResponse } from "next/server"
import { strapi } from "@/lib/strapi"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const type = searchParams.get("type") || "blog"

  try {
    const data = await strapi.getInsights(type)
    return NextResponse.json(data)
  } catch (error) {
    console.error("[v0] Error fetching insights:", error)
    return NextResponse.json({ data: [] }, { status: 200 })
  }
}
