# Deployment Guide

## Quick Start (Local Development)

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/clausecloud.git
cd clausecloud
```

### 2. Install Dependencies
```bash
npm run install:all
```

### 3. Configure Environment
```bash
cp .env.example .env
```

Edit `.env` and add your Claude API key:
```
ANTHROPIC_API_KEY=your_api_key_here
```

### 4. Start Development Servers
```bash
npm run dev
```

This starts:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

---

## Production Deployment

### Option 1: Vercel (Frontend) + Render (Backend)

#### Frontend (Vercel)
```bash
cd frontend
npm run build
vercel deploy
```

Environment variables needed:
```
VITE_API_URL=https://your-backend-url.com/api
```

#### Backend (Render)
1. Connect GitHub repo to Render
2. Create new Web Service
3. Build command: `cd backend && npm install`
4. Start command: `cd backend && npm start`
5. Add environment variables:
   - `ANTHROPIC_API_KEY`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://your-frontend-url.com`

### Option 2: Docker

```bash
# Build and run with docker-compose
docker-compose up -d
```

### Option 3: Traditional VPS (DigitalOcean, AWS EC2)

#### Install Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### Clone and Setup
```bash
git clone https://github.com/yourusername/clausecloud.git
cd clausecloud
npm run install:all
```

#### Use PM2 for Process Management
```bash
npm install -g pm2

# Start backend
cd backend
pm2 start src/server.js --name clausecloud-api

# Build frontend
cd ../frontend
npm run build

# Serve with nginx or use pm2 serve
pm2 serve dist 3000 --name clausecloud-frontend
```

#### Setup Nginx
```nginx
# /etc/nginx/sites-available/clausecloud

server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        root /path/to/clausecloud/frontend/dist;
        try_files $uri $uri/ /index.html;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## Environment Variables Reference

### Backend (.env)
```bash
# Required
ANTHROPIC_API_KEY=sk-ant-...

# Server
PORT=5000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://your-frontend-url.com

# Optional: File Upload
MAX_FILE_SIZE_MB=10
ALLOWED_FILE_TYPES=pdf,jpg,jpeg,png,txt

# Optional: Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Optional: Claude Config
CLAUDE_MODEL=claude-sonnet-4-20250514
CLAUDE_MAX_TOKENS=4096
```

### Frontend (.env)
```bash
VITE_API_URL=https://your-backend-url.com/api
```

---

## Post-Deployment Checklist

- [ ] Verify API health: `curl https://your-backend-url.com/health`
- [ ] Test file upload functionality
- [ ] Test contract analysis with sample contract
- [ ] Verify chat functionality
- [ ] Check comparison feature
- [ ] Test settings page
- [ ] Monitor error logs
- [ ] Setup error tracking (Sentry, etc.)
- [ ] Setup uptime monitoring
- [ ] Configure SSL/HTTPS
- [ ] Setup backups (if using database)

---

## Troubleshooting

### Backend won't start
- Check `ANTHROPIC_API_KEY` is set correctly
- Verify Node.js version (18+)
- Check port 5000 is available

### Frontend can't connect to backend
- Verify `VITE_API_URL` is correct
- Check CORS configuration in backend
- Ensure backend is running

### File upload fails
- Check file size limits
- Verify file type is allowed
- Check disk space

### Claude API errors
- Verify API key is valid
- Check API rate limits
- Monitor token usage

---

## Scaling Considerations

For production use, consider:

1. **Database**: Replace in-memory storage with PostgreSQL/MongoDB
2. **File Storage**: Use S3/Cloud Storage instead of memory
3. **Caching**: Add Redis for frequently accessed contracts
4. **Queue System**: Use Bull/RabbitMQ for async processing
5. **Load Balancing**: Add multiple backend instances
6. **CDN**: Serve static assets via CDN
7. **Monitoring**: Add APM tools (DataDog, New Relic)
8. **Authentication**: Implement JWT auth + OAuth
