import { OpenAI } from "openai"
import { NextResponse } from "next/server"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// System prompt for the AI assistant
const SYSTEM_PROMPT = `You are Peak Point's AI assistant, helping potential clients learn about our BPO services in Africa.

Key Information:
- Peak Point provides Business Process Outsourcing services across Africa
- Services: BPO, Admin Support, Finance & Accounting, Healthcare RCM, AI/Data Intelligence, Customer Support, IT Security, Marketing
- Industries: Healthcare, Finance, Technology, Retail, Manufacturing, Telecommunications
- Benefits: Cost reduction (up to 60%), 24/7 operations, scalable solutions, expert teams

Your role:
1. Answer questions about our services, pricing, and capabilities
2. Qualify leads by understanding their needs (industry, team size, current challenges)
3. Offer to schedule consultations for qualified leads
4. Be professional, concise, and helpful

If asked about pricing or specific solutions, gather requirements first, then suggest scheduling a consultation.`

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 500,
    })

    return NextResponse.json({
      message: completion.choices[0].message.content,
    })
  } catch (error) {
    console.error("OpenAI API error:", error)
    return NextResponse.json({ error: "Failed to process your message. Please try again." }, { status: 500 })
  }
}
