# ClauseCloud API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Currently no authentication required (hackathon MVP).
TODO: Add JWT authentication for production.

---

## Endpoints

### Contracts

#### Analyze Contract (File Upload)
```http
POST /contracts/analyze
Content-Type: multipart/form-data

Body:
- contract: file (PDF, JPEG, PNG, TXT)

Response:
{
  "success": true,
  "contractId": "uuid",
  "analysis": {
    "contractType": "string",
    "parties": "string",
    "term": "string",
    "autoRenews": boolean,
    "value": "string",
    "riskLevel": "low|medium|high",
    "riskScore": number,
    "criticalIssues": [...],
    "moderateConcerns": [...],
    "favorableTerms": [...],
    "keyInsights": "string"
  }
}
```

#### Analyze Contract (Text)
```http
POST /contracts/analyze-text
Content-Type: application/json

Body:
{
  "text": "contract text here..."
}

Response: Same as above
```

#### Get All Contracts
```http
GET /contracts

Response:
{
  "success": true,
  "count": number,
  "contracts": [...]
}
```

#### Get Contract by ID
```http
GET /contracts/:id

Response:
{
  "success": true,
  "contract": {...}
}
```

#### Delete Contract
```http
DELETE /contracts/:id

Response:
{
  "success": true,
  "message": "Contract deleted successfully"
}
```

#### Compare Contracts
```http
POST /contracts/compare
Content-Type: application/json

Body:
{
  "contractIds": ["id1", "id2", "id3"]
}

Response:
{
  "success": true,
  "comparison": {...}
}
```

#### Get Recommendation
```http
POST /contracts/recommendation
Content-Type: application/json

Body:
{
  "contractIds": ["id1", "id2", "id3"],
  "weights": {
    "price": 0.8,
    "risk": 1.0,
    "flexibility": 0.6,
    "strategic": 0.4
  }
}

Response:
{
  "success": true,
  "recommendation": {
    "bestChoiceId": "id",
    "reasoning": [...],
    "tradeoffs": "string",
    "alternativeAdvice": {...},
    "tco": {...}
  }
}
```

---

### Chat

#### Send Message
```http
POST /chat/message
Content-Type: application/json

Body:
{
  "contractId": "uuid",
  "message": "What are the payment terms?"
}

Response:
{
  "success": true,
  "response": "The payment terms are Net 60..."
}
```

#### Get Chat History
```http
GET /chat/history/:contractId

Response:
{
  "success": true,
  "contractId": "uuid",
  "history": [
    {
      "role": "user",
      "content": "...",
      "timestamp": "ISO date"
    },
    {
      "role": "assistant",
      "content": "...",
      "timestamp": "ISO date"
    }
  ]
}
```

---

### Portfolio

#### Get Portfolio Metrics
```http
GET /portfolio/metrics

Response:
{
  "success": true,
  "metrics": {
    "totalContracts": number,
    "averageRisk": number,
    "needsReview": number,
    "totalValue": number
  }
}
```

#### Portfolio Query
```http
POST /portfolio/query
Content-Type: application/json

Body:
{
  "query": "Which contracts have unlimited liability?"
}

Response:
{
  "success": true,
  "answer": "string",
  "relevantContracts": [...]
}
```

---

### Settings

#### Get Settings
```http
GET /settings

Response:
{
  "success": true,
  "settings": {
    "company": {...},
    "redLines": [...],
    "riskTolerance": {...},
    "notifications": {...},
    "benchmarks": {...}
  }
}
```

#### Update Settings
```http
PUT /settings
Content-Type: application/json

Body:
{
  "company": {...},
  "redLines": [...],
  // ... other settings
}

Response:
{
  "success": true,
  "message": "Settings updated successfully"
}
```

---

## Error Responses

All errors follow this format:
```json
{
  "error": "Error message",
  "stack": "... (only in development)"
}
```

Common status codes:
- 400: Bad Request (missing/invalid parameters)
- 404: Not Found (resource doesn't exist)
- 500: Internal Server Error

---

## Rate Limiting

- 100 requests per 15 minutes per IP
- Returns 429 status when exceeded

---

## File Upload Limits

- Max file size: 10MB
- Allowed types: PDF, JPEG, PNG, TXT
