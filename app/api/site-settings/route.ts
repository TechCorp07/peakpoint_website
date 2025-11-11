import { strapi } from "@/lib/strapi"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await strapi.getSiteSettings()

    if (!response || !response.data) {
      // Return fallback data if Strapi is not available
      return NextResponse.json({
        contactEmail: "info@peakpoint.africa",
        salesEmail: "sales@peakpoint.africa",
        phoneKenya: "+254 XXX XXX XXX",
        phoneUS: "+1 XXX XXX XXXX",
        addressLine1: "Nairobi, Kenya",
        addressLine2: "East Africa",
        businessHours: "Mon-Fri: 8AM - 6PM EAT",
        supportAvailability: "24/7 Support Available",
      })
    }

    return NextResponse.json(response.data)
  } catch (error) {
    console.error("[v0] Site settings API error:", error)
    return NextResponse.json(
      {
        contactEmail: "info@peakpoint.africa",
        salesEmail: "sales@peakpoint.africa",
        phoneKenya: "+254 XXX XXX XXX",
        phoneUS: "+1 XXX XXX XXXX",
        addressLine1: "Nairobi, Kenya",
        addressLine2: "East Africa",
        businessHours: "Mon-Fri: 8AM - 6PM EAT",
        supportAvailability: "24/7 Support Available",
      },
      { status: 200 },
    )
  }
}
