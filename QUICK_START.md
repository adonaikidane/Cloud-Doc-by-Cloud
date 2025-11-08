# ClauseCloud - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Clone and Install (2 minutes)
```bash
git clone https://github.com/yourusername/clausecloud.git
cd clausecloud
npm run install:all
```

### 2. Configure API Key (1 minute)
```bash
cp .env.example .env
```

Edit `.env` and add your Claude API key:
```
ANTHROPIC_API_KEY=your_key_here
```

Get your API key from: https://console.anthropic.com

### 3. Start Development (1 minute)
```bash
npm run dev
```

Open:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### 4. Test It Works (1 minute)
1. Go to http://localhost:3000
2. Upload a sample PDF contract (or paste text)
3. See instant analysis appear
4. Ask a question in chat
5. Success! 🎉

---

## 📋 What You Have

### 4 Main Pages
1. **Chat Page** (`/`) - Upload & analyze contracts
2. **Library Page** (`/library`) - View all contracts
3. **Compare Page** (`/compare`) - Compare multiple contracts
4. **Settings Page** (`/settings`) - Configure company rules

### Backend API
- `/api/contracts/analyze` - Analyze contract
- `/api/chat/message` - Ask questions
- `/api/portfolio/metrics` - Get portfolio stats
- `/api/settings` - Manage settings

Full API docs: `docs/API.md`

---

## 🎯 Your 22-Hour Plan

### Phase 1: Core (Hours 1-10)
**Goal**: Upload contract → Get analysis → Ask questions

**Tasks**:
1. Test Claude API integration (2 hours)
2. Implement PDF text extraction (1 hour)
3. Connect upload form to backend (2 hours)
4. Display analysis results (2 hours)
5. Implement chat Q&A (3 hours)

**Test**: Can upload PDF, see structured analysis, ask questions

### Phase 2: Memory & Comparison (Hours 11-16)
**Goal**: Compare multiple contracts, get recommendation

**Tasks**:
1. Build contract library display (2 hours)
2. Implement multi-contract upload (1 hour)
3. Build comparison table (2 hours)
4. Add AI recommendation logic (2 hours)

**Test**: Can compare 3 contracts, see recommendation

### Phase 3: Polish (Hours 17-19)
**Goal**: Professional, bug-free experience

**Tasks**:
1. Fix UI/UX issues (1 hour)
2. Add loading states & errors (1 hour)
3. Test all features thoroughly (1 hour)

**Test**: Everything works smoothly, no crashes

### Phase 4: Demo & Deploy (Hours 20-22)
**Goal**: Submittable project with great demo

**Tasks**:
1. Record 90-second demo video (1.5 hours)
2. Deploy frontend & backend (1 hour)
3. Final testing & submission (0.5 hours)

**Test**: Deployed app works, demo looks great

---

## 🔑 Key Implementation Tips

### Claude API Prompts
The quality of your prompts = quality of output. We've provided starter prompts in:
- `backend/src/services/claudeService.js`

**Pro tip**: Ask Claude to return JSON for structured data:
```javascript
"Provide analysis in JSON format: { contractType: '...', ... }"
```

### File Upload
Already configured in:
- `frontend/src/components/FileUpload.jsx` (UI)
- `backend/src/routes/contracts.js` (Multer setup)

Just connect them via API call.

### Styling
All Tailwind styles defined in:
- `frontend/src/index.css`

Use pre-defined classes:
- `btn-primary` for buttons
- `card` for containers
- `input-field` for inputs

### State Management
Use simple React `useState` for now. Structure:
```javascript
const [contracts, setContracts] = useState([])
const [analysis, setAnalysis] = useState(null)
const [isLoading, setIsLoading] = useState(false)
```

---

## 🐛 Debugging Tips

### Backend Not Starting
```bash
# Check Claude API key
echo $ANTHROPIC_API_KEY

# Check port 5000 available
lsof -i :5000

# Check logs
cd backend && npm run dev
```

### Frontend Can't Connect
1. Verify backend is running: `curl http://localhost:5000/health`
2. Check `VITE_API_URL` in frontend/.env
3. Look at browser console for errors

### Claude API Errors
- **401 Unauthorized**: Wrong API key
- **429 Rate Limited**: Too many requests, wait 1 minute
- **400 Bad Request**: Check prompt format

### File Upload Fails
- Check file size (<10MB)
- Check file type (PDF, JPG, PNG only)
- Look at backend console logs

---

## 📊 Testing Checklist

Before demo:
- [ ] Upload PDF → Analysis appears (<5 sec)
- [ ] Upload text → Analysis appears
- [ ] Ask question → Get relevant answer
- [ ] Upload 3 contracts → Comparison works
- [ ] Change settings → Reflected in analysis
- [ ] All pages load without errors
- [ ] Mobile view doesn't break

---

## 🎥 Demo Script Template

**Opening (0-15s)**
"Legal teams waste 8 hours reviewing a single vendor contract. ClauseCloud does it in 8 seconds using Claude AI."

**Demo (15-60s)**
1. Upload contract → Instant structured analysis
2. Show risk scoring with citations
3. Ask "What are payment terms?" → Get answer
4. Upload 2 more → Side-by-side comparison
5. AI recommends best contract with reasoning

**Impact (60-75s)**
"Saves 40 hours per month. One avoided contract mistake pays for itself 1000x over."

**Tech (75-90s)**
"Only Claude's 200K context window makes multi-contract comparison possible. Only Claude's reasoning explains WHY, not just WHAT."

---

## 📞 Need Help?

### Resources
- Claude API Docs: https://docs.anthropic.com
- React Docs: https://react.dev
- Express Docs: https://expressjs.com
- Tailwind Docs: https://tailwindcss.com

### Common Questions

**Q: How do I add a new feature?**
A: 
1. Add route in `backend/src/routes/`
2. Add controller in `backend/src/controllers/`
3. Add API call in `frontend/src/services/api.js`
4. Call from React component

**Q: Where do I modify the Claude prompt?**
A: `backend/src/services/claudeService.js` - look for the `prompt` variable

**Q: How do I change the UI?**
A: Edit components in `frontend/src/components/` and pages in `frontend/src/pages/`

**Q: Database not working?**
A: We're using in-memory storage (no database needed for hackathon). It resets when server restarts.

---

## 🏆 Success Criteria

By hour 22, you should have:
- ✅ Working upload + analysis
- ✅ Working chat Q&A
- ✅ Working comparison + recommendation
- ✅ Professional UI
- ✅ 90-second demo video
- ✅ Deployed application
- ✅ Devpost submission

**Remember**: Done is better than perfect. Focus on core features first!

---

## 🎉 Good Luck!

You have a solid foundation. The structure is complete, you just need to:
1. Connect the pieces
2. Test thoroughly  
3. Polish the demo
4. Submit with confidence

**You've got this!** 🚀
