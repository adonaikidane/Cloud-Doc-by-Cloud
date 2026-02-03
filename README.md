# Cloud Doc by Cloud ☁️

> AI-powered contract intelligence platform that analyzes, compares, and recommends contracts in seconds

[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Hackathon](https://img.shields.io/badge/hackathon-Claude%20Builder%20Club%20x%20ACT%20Rice-purple)](https://devpost.com)

## 🎯 Overview

ClauseCloud transforms contract review from an 8-hour manual process into an 8-second AI-powered analysis. Upload contracts, get instant risk assessments, compare multiple proposals, and receive intelligent recommendations on which contract to sign.

**Built for:** Claude Builder Club x ACT Rice Hackathon  
**Challenge:** Apply Anthropic's AI to real-world business problems

## ✨ Key Features

### 📄 Intelligent Contract Analysis
- Upload contracts via PDF, JPEG, or paste text
- Instant structured analysis with risk scoring (🔴🟡🟢)
- Auto-flagging of critical issues, moderate concerns, and favorable terms
- Citations to exact sections and page numbers

### 🧠 Multi-Contract Memory
- Persistent memory across sessions
- Automatic cross-contract comparison
- Portfolio-wide insights and search
- "Which contracts have unlimited liability?" - instant answers

### ⚖️ Smart Comparison Engine
- Side-by-side comparison of multiple proposals
- Multi-dimensional scoring (Price, Risk, Flexibility, Strategic Fit)
- AI-powered recommendation with reasoning
- "What-if" scenario analysis via chat

### 🚫 Company Red Lines
- Define your company's non-negotiables
- Auto-detect red line violations
- Customizable risk tolerance settings
- Industry benchmark comparisons

### 💡 Actionable Insights
- Negotiation playbooks auto-generated
- 3-year total cost of ownership calculations
- "If you choose Vendor A, negotiate these 3 things first"
- Explains WHY, not just WHAT

## 🏗️ Architecture

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   React     │◄────►│   Express    │◄────►│  Claude API │
│  Frontend   │      │   Backend    │      │  (Sonnet 4) │
└─────────────┘      └──────────────┘      └─────────────┘
                            │
                            ▼
                     ┌──────────────┐
                     │  Vector DB   │
                     │  (Contract   │
                     │   Memory)    │
                     └──────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Claude API key (get from [console.anthropic.com](https://console.anthropic.com))

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/clausecloud.git
cd clausecloud

# Install dependencies
npm run install:all

# Set up environment variables
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env

# Start development servers
npm run dev
```

Frontend runs on `http://localhost:3000`  
Backend runs on `http://localhost:5000`

## 📁 Project Structure

```
clausecloud/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Main page components
│   │   ├── services/     # API communication
│   │   ├── utils/        # Helper functions
│   │   └── App.jsx       # Root component
│   └── package.json
│
├── backend/              # Express server
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── controllers/  # Business logic
│   │   ├── services/     # Claude integration
│   │   ├── models/       # Data structures
│   │   └── server.js     # Entry point
│   └── package.json
│
├── docs/                 # Documentation
├── tests/                # Test files
└── README.md
```

## 🎥 Demo

[View 2-minute demo video](https://youtu.be/your-demo-link)

**Quick Demo Flow:**
1. Upload vendor contract → Instant risk analysis in 2 seconds
2. Upload 2 more proposals → Side-by-side comparison
3. AI recommends best contract with reasoning
4. Ask "What if we negotiate price down?" → Get strategic advice

## 🏆 What Makes ClauseCloud Different

| Feature | Traditional Chatbot | ClauseCloud |
|---------|-------------------|-------------|
| Analysis Speed | Manual Q&A | Instant structured output |
| Multi-Document | One at a time | Simultaneous comparison |
| Memory | No context | Full portfolio memory |
| Recommendations | Generic advice | Company-specific guidance |
| Citations | May hallucinate | Exact section references |

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Tailwind CSS
- Lucide React (icons)
- Recharts (visualizations)

**Backend:**
- Node.js / Express
- Claude API (Sonnet 4)
- Vector DB (contract storage)
- PDF parsing libraries

**AI:**
- Anthropic Claude Sonnet 4 (`claude-sonnet-4-20250514`)
- 200K context window for multi-document analysis
- Advanced reasoning for risk assessment

## 📊 Judging Criteria Alignment

✅ **Impact & Relevance:** Saves 40 hours/month, prevents costly contract mistakes  
✅ **Creativity:** Memory + comparison engine = beyond basic chatbot  
✅ **Technical Execution:** Clean UI, working prototype, robust error handling  
✅ **Presentation Clarity:** Visual risk scores, citations, clear value prop  
✅ **Best Use of Claude:** Leverages 200K context + reasoning capabilities

## 🤝 Team

- Adonai Kidane - Full Stack
- Daniil Miscenco - Full Stack

## 📄 License

MIT License - see [LICENSE](LICENSE) file

## 🙏 Acknowledgments

- Built with [Anthropic Claude](https://anthropic.com)
- Hackathon hosted by Claude Builder Club & ACT Rice
- Thanks to all mentors and judges

## 🔗 Links

- [Devpost Submission](https://devpost.com/your-submission)
- [Live Demo](https://clausecloud.vercel.app)
- [Documentation](docs/)
- [API Reference](docs/API.md)

---

**Built with ❤️ at Claude Builder Club x ACT Rice Hackathon**
