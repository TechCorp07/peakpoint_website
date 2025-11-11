import OpenAI from "openai"

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const AI_CONFIG = {
  model: "gpt-4-turbo-preview",
  temperature: 0.7,
  max_tokens: 500,
}

// Lead qualification logic
export function qualifyLead(conversation: string): {
  qualified: boolean
  score: number
  insights: string[]
} {
  const insights: string[] = []
  let score = 0

  // Check for industry mention
  const industries = ["healthcare", "finance", "technology", "retail", "manufacturing"]
  if (industries.some((ind) => conversation.toLowerCase().includes(ind))) {
    score += 20
    insights.push("Industry identified")
  }

  // Check for team size mention
  if (/\d+\s*(people|employees|staff|team)/i.test(conversation)) {
    score += 15
    insights.push("Team size mentioned")
  }

  // Check for budget/cost concerns
  if (/(budget|cost|price|pricing|affordable)/i.test(conversation)) {
    score += 15
    insights.push("Budget conscious")
  }

  // Check for urgency
  if (/(urgent|asap|immediately|soon|quickly)/i.test(conversation)) {
    score += 20
    insights.push("High urgency")
  }

  // Check for decision-maker language
  if (/(we need|looking for|want to|planning to|considering)/i.test(conversation)) {
    score += 15
    insights.push("Decision-maker language")
  }

  // Check for contact info provided
  if (/(email|phone|contact|reach)/i.test(conversation)) {
    score += 15
    insights.push("Contact info shared")
  }

  return {
    qualified: score >= 40,
    score,
    insights,
  }
}
