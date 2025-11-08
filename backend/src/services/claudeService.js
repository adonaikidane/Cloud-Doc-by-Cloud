// services/claudeService.js
// Service for interacting with Anthropic Claude API

import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
})

const MODEL = process.env.CLAUDE_MODEL || 'claude-sonnet-4-20250514'
const MAX_TOKENS = parseInt(process.env.CLAUDE_MAX_TOKENS) || 4096

// ===== Contract Analysis =====

export const analyzeContractWithClaude = async (contractText, companySettings) => {
  const prompt = `You are a contract analysis expert. Analyze this contract and provide a structured analysis.

COMPANY CONTEXT:
${JSON.stringify(companySettings, null, 2)}

CONTRACT TEXT:
${contractText}

Provide analysis in the following JSON format:
{
  "contractType": "string (e.g., 'SaaS Service Agreement')",
  "parties": "string (e.g., 'CompanyA ↔ CompanyB')",
  "term": "string (e.g., '12 months')",
  "autoRenews": boolean,
  "value": "string (e.g., '$50,000/year')",
  "riskLevel": "string (low|medium|high)",
  "riskScore": number (0-20),
  "criticalIssues": [
    {
      "title": "string",
      "description": "string",
      "section": "string (e.g., 'Section 8.2')",
      "citation": "string (e.g., 'Section 8.2, Page 4')",
      "recommendation": "string"
    }
  ],
  "moderateConcerns": [
    {
      "title": "string",
      "description": "string",
      "section": "string (optional)"
    }
  ],
  "favorableTerms": ["string"],
  "keyInsights": "string - brief summary of main takeaways"
}

Calculate risk score as: (criticalIssues × 3) + (moderateConcerns × 1.5) + (redLineViolations × 5)
- Score ≤ 5: low risk
- Score 6-12: medium risk  
- Score ≥ 13: high risk

Flag any violations of the company's red lines. Cite specific sections for every claim.

CRITICAL: Return ONLY valid JSON, no other text.`

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const responseText = message.content[0].text

    // Parse JSON response
    const analysis = JSON.parse(responseText)
    return analysis
  } catch (error) {
    console.error('Error calling Claude API:', error)
    throw new Error('Failed to analyze contract with Claude')
  }
}

// ===== Chat/Q&A =====

export const chatWithClaude = async ({ contractText, contractAnalysis, message, history = [] }) => {
  const systemPrompt = `You are a helpful contract analysis assistant. You have access to the full contract text and previous analysis. Answer questions accurately and cite specific sections when relevant.

CONTRACT ANALYSIS:
${JSON.stringify(contractAnalysis, null, 2)}

CONTRACT TEXT (for reference):
${contractText.substring(0, 50000)} ${contractText.length > 50000 ? '...(truncated)' : ''}

When answering:
- Be specific and cite sections
- Explain WHY clauses matter, not just what they say
- Provide actionable recommendations when relevant
- Keep responses concise but thorough`

  try {
    const messages = [
      ...history.map(msg => ({
        role: msg.role,
        content: msg.content,
      })),
      {
        role: 'user',
        content: message,
      },
    ]

    const response = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: systemPrompt,
      messages,
    })

    return response.content[0].text
  } catch (error) {
    console.error('Error in Claude chat:', error)
    throw new Error('Failed to get response from Claude')
  }
}

// ===== Multi-Contract Comparison =====

export const compareContractsWithClaude = async (contracts, companySettings) => {
  const prompt = `You are a contract comparison expert. Compare these contracts and recommend the best choice.

COMPANY CONTEXT:
${JSON.stringify(companySettings, null, 2)}

CONTRACTS TO COMPARE:
${contracts.map((c, i) => `
Contract ${i + 1}: ${c.filename}
Analysis: ${JSON.stringify(c.analysis, null, 2)}
`).join('\n\n')}

Provide comparison and recommendation in JSON format:
{
  "bestChoiceId": "contract ID",
  "reasoning": ["reason 1", "reason 2", ...],
  "tradeoffs": "string - any concerns about the recommended choice",
  "alternativeAdvice": {
    "contractId": "ID of alternative",
    "negotiationItems": ["item 1", "item 2", ...],
    "estimatedImpact": "string"
  },
  "tco": {
    "threeYearCosts": [
      {"contractId": "ID", "name": "name", "cost": "string"}
    ],
    "savings": "string"
  }
}

CRITICAL: Return ONLY valid JSON, no other text.`

  try {
    const message = await anthropic.messages.create({
      model: MODEL,
      max_tokens: MAX_TOKENS,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    })

    const responseText = message.content[0].text
    const recommendation = JSON.parse(responseText)
    return recommendation
  } catch (error) {
    console.error('Error comparing contracts with Claude:', error)
    throw new Error('Failed to generate comparison with Claude')
  }
}

export default {
  analyzeContractWithClaude,
  chatWithClaude,
  compareContractsWithClaude,
}
