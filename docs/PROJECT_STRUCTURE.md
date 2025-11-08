# ClauseCloud - Project Structure Overview

## 📁 Repository Structure

```
clausecloud/
├── README.md                 # Main project documentation
├── LICENSE                   # MIT License
├── .gitignore               # Git ignore rules
├── .env.example             # Environment variables template
├── package.json             # Root package.json with scripts
│
├── frontend/                # React frontend application
│   ├── package.json
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── index.html          # HTML entry point
│   │
│   └── src/
│       ├── main.jsx        # React entry point
│       ├── App.jsx         # Root component with routing
│       ├── index.css       # Global styles with Tailwind
│       │
│       ├── components/     # Reusable UI components
│       │   ├── Layout.jsx              # Main layout wrapper
│       │   ├── Sidebar.jsx             # Navigation sidebar
│       │   ├── Header.jsx              # Page header
│       │   ├── FileUpload.jsx          # File upload component
│       │   ├── ContractSummary.jsx     # Analysis display
│       │   ├── ChatInterface.jsx       # Q&A chat interface
│       │   ├── RiskBadge.jsx           # Risk level indicator
│       │   └── ComparisonTable.jsx     # Side-by-side comparison
│       │
│       ├── pages/          # Main page components
│       │   ├── ChatPage.jsx            # Page 1: Contract analysis
│       │   ├── ContractLibraryPage.jsx # Page 2: Contract library
│       │   ├── ComparisonPage.jsx      # Page 3: Multi-contract comparison
│       │   └── SettingsPage.jsx        # Page 4: Company settings
│       │
│       ├── services/       # API communication
│       │   └── api.js                  # Axios API client
│       │
│       └── utils/          # Helper functions
│           └── helpers.js              # Formatting, validation, etc.
│
├── backend/                # Express backend API
│   ├── package.json
│   │
│   └── src/
│       ├── server.js       # Express server entry point
│       │
│       ├── routes/         # API route definitions
│       │   ├── contracts.js            # Contract endpoints
│       │   ├── chat.js                 # Chat/Q&A endpoints
│       │   ├── portfolio.js            # Portfolio endpoints
│       │   └── settings.js             # Settings endpoints
│       │
│       ├── controllers/    # Business logic
│       │   ├── contractController.js   # Contract operations
│       │   ├── chatController.js       # Chat operations
│       │   ├── portfolioController.js  # Portfolio operations
│       │   └── settingsController.js   # Settings operations
│       │
│       ├── services/       # External integrations
│       │   ├── claudeService.js        # Claude API integration
│       │   ├── pdfService.js           # PDF text extraction
│       │   └── imageService.js         # Image OCR (placeholder)
│       │
│       └── models/         # Data storage (in-memory for hackathon)
│           ├── contractStore.js        # Contract storage
│           └── chatStore.js            # Chat history storage
│
└── docs/                   # Documentation
    ├── API.md              # API documentation
    └── DEPLOYMENT.md       # Deployment guide
```

---

## 🎯 Key Features by File

### Frontend

#### Pages
- **ChatPage.jsx** - Main contract analysis interface
  - File upload (drag-drop or paste)
  - Instant structured analysis display
  - Q&A chat interface
  
- **ContractLibraryPage.jsx** - Contract portfolio management
  - List all analyzed contracts
  - Portfolio metrics dashboard
  - Search and filter
  - Portfolio-wide queries
  
- **ComparisonPage.jsx** - Multi-contract comparison
  - Upload multiple contracts
  - Side-by-side comparison table
  - AI recommendation engine
  - Negotiation advice
  
- **SettingsPage.jsx** - Company configuration
  - Company profile setup
  - Red lines configuration
  - Risk tolerance settings
  - Notification preferences

#### Components
- **FileUpload** - Handles PDF, image, and text uploads
- **ContractSummary** - Displays structured analysis with risk scoring
- **ChatInterface** - Interactive Q&A with memory
- **RiskBadge** - Visual risk level indicators
- **ComparisonTable** - Side-by-side contract comparison

### Backend

#### Routes
- **/api/contracts** - Contract CRUD and analysis
- **/api/chat** - Q&A functionality
- **/api/portfolio** - Portfolio-wide operations
- **/api/settings** - Company settings management

#### Services
- **claudeService** - Anthropic Claude API integration
  - Contract analysis with structured output
  - Chat with context
  - Multi-contract comparison
  
- **pdfService** - PDF text extraction
- **imageService** - Image OCR (placeholder)

#### Models
- **contractStore** - In-memory contract storage
- **chatStore** - In-memory chat history

---

## 🔧 Technology Stack

### Frontend
- **Framework**: React 18
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Charts**: Recharts

### Backend
- **Runtime**: Node.js 18+
- **Framework**: Express
- **AI**: Anthropic Claude SDK
- **File Processing**: Multer, pdf-parse, sharp
- **Security**: Helmet, CORS, Rate Limiting

---

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm run install:all
   ```

2. **Configure environment**:
   ```bash
   cp .env.example .env
   # Add your ANTHROPIC_API_KEY
   ```

3. **Start development**:
   ```bash
   npm run dev
   ```

4. **Access application**:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

---

## 📝 Development Workflow

### Adding a New Feature

1. **Frontend Component**:
   - Create component in `frontend/src/components/`
   - Import and use in relevant page
   
2. **Backend Endpoint**:
   - Add route in appropriate router file
   - Create controller function
   - Add any needed services
   
3. **API Integration**:
   - Add API function in `frontend/src/services/api.js`
   - Call from React component

### Testing

```bash
# Frontend tests
cd frontend
npm test

# Backend tests
cd backend
npm test
```

---

## 🔐 Security Notes

**For Hackathon (MVP)**:
- No authentication required
- In-memory storage only
- Single-user assumption

**For Production**:
- Add JWT authentication
- Implement user accounts
- Use proper database
- Add file storage service
- Implement rate limiting per user
- Add audit logging

---

## 📊 Data Flow

```
User uploads contract
    ↓
Frontend (FileUpload) → POST /api/contracts/analyze
    ↓
Backend (contractController) → Extract text (PDF/Image service)
    ↓
Claude API (analyzeContractWithClaude) → Structured analysis
    ↓
Store in contractStore → Return to frontend
    ↓
Display in ContractSummary component
    ↓
User asks question via ChatInterface
    ↓
POST /api/chat/message with contract context
    ↓
Claude API with full contract + history
    ↓
Response displayed in chat
```

---

## 🎨 UI/UX Principles

1. **Instant feedback** - Show analysis within seconds
2. **Visual hierarchy** - Risk levels color-coded
3. **Citations** - Every claim linked to source
4. **Memory** - Context persists across interactions
5. **Actionable** - Recommendations, not just analysis

---

## 🏗️ Future Enhancements

### Phase 2 (Post-Hackathon)
- [ ] User authentication & accounts
- [ ] PostgreSQL database
- [ ] S3 file storage
- [ ] Email notifications
- [ ] Calendar integration
- [ ] Export to PDF/Word
- [ ] Advanced search with filters
- [ ] Contract templates
- [ ] Collaboration features
- [ ] Mobile responsive design

### Phase 3 (Production)
- [ ] Multi-language support
- [ ] OCR for scanned documents
- [ ] E-signature integration (DocuSign)
- [ ] CRM integration (Salesforce)
- [ ] Bulk upload
- [ ] Advanced analytics dashboard
- [ ] Compliance reporting
- [ ] API for third-party integrations
