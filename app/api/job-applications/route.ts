import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const location = formData.get("location") as string
    const linkedIn = formData.get("linkedIn") as string
    const coverLetter = formData.get("coverLetter") as string
    const jobTitle = formData.get("jobTitle") as string
    const cvFile = formData.get("cv") as File

    if (!fullName || !email || !phone || !location || !coverLetter || !jobTitle || !cvFile) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337"
    const strapiToken = process.env.STRAPI_API_TOKEN || ""

    // First, upload the CV file to Strapi
    const fileFormData = new FormData()
    fileFormData.append("files", cvFile)

    const fileUploadResponse = await fetch(`${strapiUrl}/api/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${strapiToken}`,
      },
      body: fileFormData,
    })

    if (!fileUploadResponse.ok) {
      console.error("Failed to upload CV to Strapi")
      return NextResponse.json({ error: "Failed to upload CV" }, { status: 500 })
    }

    const uploadedFiles = await fileUploadResponse.json()
    const cvFileId = uploadedFiles[0]?.id

    // Then, create the job application entry
    const applicationData = {
      data: {
        fullName,
        email,
        phone,
        location,
        linkedIn,
        coverLetter,
        jobTitle,
        cv: cvFileId,
        status: "pending",
        appliedAt: new Date().toISOString(),
      },
    }

    const applicationResponse = await fetch(`${strapiUrl}/api/job-applications`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
      },
      body: JSON.stringify(applicationData),
    })

    if (!applicationResponse.ok) {
      console.error("Failed to create job application in Strapi")
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
    }

    const application = await applicationResponse.json()

    // TODO: Send email notification to careers email (configured in CMS)
    // This can be implemented later with email service integration

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
      applicationId: application.data.id,
    })
  } catch (error) {
    console.error("Job application submission error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
