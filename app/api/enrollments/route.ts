import { type NextRequest, NextResponse } from "next/server"
import { Pool } from "pg"

// Create a connection pool
function getPool() {
  const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL

  if (!connectionString) {
    throw new Error("Database connection string not configured")
  }

  return new Pool({
    connectionString,
    ssl: false, // Disable SSL for local PostgreSQL
  })
}

export async function POST(request: NextRequest) {
  const pool = getPool()
  
  try {
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
    const result = await pool.query(
      `INSERT INTO enrollments (
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
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING id, email, created_at`,
      [
        firstName,
        lastName,
        email,
        phone || null,
        company || null,
        jobTitle || null,
        trainingProgram,
        trainingType,
        experienceLevel,
        preferredStartDate || null,
        learningGoals || null,
        howHeardAboutUs || null,
        'pending'
      ]
    )

    return NextResponse.json({
      success: true,
      enrollment: result.rows[0],
      message: "Enrollment submitted successfully",
    })
  } catch (error) {
    console.error("Enrollment error:", error)

    if (error instanceof Error && error.message.includes("Database connection")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    return NextResponse.json({ error: "Failed to process enrollment" }, { status: 500 })
  } finally {
    await pool.end()
  }
}

export async function GET(request: NextRequest) {
  const pool = getPool()
  
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const email = searchParams.get("email")

    let query
    let values: any[] = []
    
    if (status) {
      query = 'SELECT * FROM enrollments WHERE status = $1 ORDER BY created_at DESC'
      values = [status]
    } else if (email) {
      query = 'SELECT * FROM enrollments WHERE email = $1 ORDER BY created_at DESC'
      values = [email]
    } else {
      query = 'SELECT * FROM enrollments ORDER BY created_at DESC LIMIT 100'
    }

    const result = await pool.query(query, values)

    return NextResponse.json({ enrollments: result.rows })
  } catch (error) {
    console.error("Failed to fetch enrollments:", error)

    if (error instanceof Error && error.message.includes("Database connection")) {
      return NextResponse.json({ error: "Database not configured" }, { status: 503 })
    }

    return NextResponse.json({ error: "Failed to fetch enrollments" }, { status: 500 })
  } finally {
    await pool.end()
  }
}