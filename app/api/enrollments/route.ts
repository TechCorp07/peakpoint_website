import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

function getSqlClient() {
  const connectionString = process.env.NEON_NEON_DATABASE_URL || process.env.NEON_NEON_DATABASE_URL

  if (!connectionString) {
    throw new Error("Database connection string not configured")
  }

  return neon(connectionString)
}

export async function POST(request: NextRequest) {
  try {
    const sql = getSqlClient()

    const body = await request.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      trainingProgram,
      trainingType,
      experienceLevel,
      preferredStartDate,
      learningGoals,
      howHeardAboutUs,
    } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !trainingProgram || !trainingType || !experienceLevel) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert enrollment into database
    const result = await sql`
      INSERT INTO enrollments (
        first_name,
        last_name,
        email,
        phone,
        company,
        job_title,
        training_program,
        training_type,
        experience_level,
        preferred_start_date,
        learning_goals,
        how_heard_about_us,
        status
      ) VALUES (
        ${firstName},
        ${lastName},
        ${email},
        ${phone || null},
        ${company || null},
        ${jobTitle || null},
        ${trainingProgram},
        ${trainingType},
        ${experienceLevel},
        ${preferredStartDate || null},
        ${learningGoals || null},
        ${howHeardAboutUs || null},
        'pending'
      )
      RETURNING id, email, created_at
    `

    // TODO: Send confirmation email to user
    // TODO: Send notification to admin
    // TODO: Sync to ERPNext (future integration)

    return NextResponse.json({
      success: true,
      enrollment: result[0],
      message: "Enrollment submitted successfully",
    })
  } catch (error) {
    console.error("Enrollment error:", error)

    if (error instanceof Error && error.message.includes("Database connection")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    return NextResponse.json({ error: "Failed to process enrollment" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const sql = getSqlClient()

    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const email = searchParams.get("email")

    let query
    if (status) {
      query = sql`SELECT * FROM enrollments WHERE status = ${status} ORDER BY created_at DESC`
    } else if (email) {
      query = sql`SELECT * FROM enrollments WHERE email = ${email} ORDER BY created_at DESC`
    } else {
      query = sql`SELECT * FROM enrollments ORDER BY created_at DESC LIMIT 100`
    }

    const enrollments = await query

    return NextResponse.json({ enrollments })
  } catch (error) {
    console.error("Failed to fetch enrollments:", error)

    if (error instanceof Error && error.message.includes("Database connection")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    return NextResponse.json({ error: "Failed to fetch enrollments" }, { status: 500 })
  }
}
