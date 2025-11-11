import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const leadData = await req.json()

    // TODO: In production, save to database or send to CRM
    // For now, we'll log and return success
    console.log("New lead captured:", leadData)

    // Optional: Send notification email
    // await sendLeadNotification(leadData)

    // Optional: Add to Strapi CMS
    // await fetch(`${process.env.STRAPI_URL}/api/leads`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
    //   },
    //   body: JSON.stringify({ data: leadData })
    // })

    return NextResponse.json({
      success: true,
      message: "Thank you! We will contact you shortly.",
    })
  } catch (error) {
    console.error("Lead capture error:", error)
    return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 })
  }
}
