# Podbook Backend API

A powerful backend API for the Podbook platform - an AI-powered content transformation service that converts RSS feeds, files, and text into professionally formatted books.

## 🚀 Features

- **User Authentication**: JWT-based authentication with refresh tokens
- **Content Processing**: RSS feed parsing, file uploads, text processing
- **AI Integration**: OpenAI GPT-4 integration for content generation and editing
- **Book Generation**: Multi-format book creation (PDF, EPUB, DOCX, HTML)
- **Queue System**: Redis-based job queue for background processing
- **File Management**: Secure file uploads and storage
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis for performance optimization

## 🏗️ Architecture

```
src/
├── controllers/     # Request handlers
├── services/        # Business logic
├── models/          # Database models (Prisma)
├── middleware/      # Custom middleware
├── routes/          # API endpoints
├── utils/           # Helper functions
├── types/           # TypeScript definitions
└── config/          # Configuration files
```

## 🐳 Quick Start with Docker

### Prerequisites
- Docker and Docker Compose installed
- Node.js 18+ (for local development)

### 1. Clone and Setup
```bash
# Navigate to backend directory
cd backend

# Copy environment file
cp env.example .env

# Edit .env with your API keys
nano .env
```

### 2. Start Services
```bash
# Start all services (PostgreSQL, Redis, pgAdmin)
docker-compose up -d postgres redis pgadmin

# Install dependencies
npm install

# Generate Prisma client
npm run db:generate

# Push database schema
npm run db:push

# Start backend in development mode
npm run dev
```

### 3. Access Services
- **Backend API**: http://localhost:3000
- **Health Check**: http://localhost:3000/health
- **pgAdmin**: http://localhost:5050 (admin@podbook.com / admin123)
- **PostgreSQL**: localhost:5432
- **Redis**: localhost:6379

## 🔧 Development

### Available Scripts
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run db:generate  # Generate Prisma client
npm run db:push      # Push schema to database
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database with sample data
npm run test         # Run tests
npm run lint         # Lint code
npm run type-check   # TypeScript type checking
```

### Environment Variables
```bash
# Database
DATABASE_URL="postgresql://podbook_user:podbook_password@localhost:5432/podbook"

# Redis
REDIS_URL="redis://localhost:6379"

# JWT
JWT_SECRET="your-super-secret-jwt-key"
JWT_EXPIRES_IN="7d"

# OpenAI
OPENAI_API_KEY="your-openai-api-key"

# Podium.page
PODIUM_API_KEY="your-podium-api-key"

# Server
PORT=3000
NODE_ENV=development
```

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/refresh` - Refresh JWT token
- `POST /api/auth/logout` - User logout

### Projects
- `GET /api/projects` - List user projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Content Processing
- `POST /api/content/rss` - Process RSS feed
- `POST /api/content/upload` - Upload files
- `POST /api/content/process` - Process content
- `GET /api/content/status/:id` - Get processing status

### AI Operations
- `POST /api/ai/generate-chapters` - Generate book chapters
- `POST /api/ai/edit-content` - Edit content with AI
- `POST /api/ai/chat` - AI chat assistance

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/credits` - Get user credits

## 🗄️ Database Schema

The application uses Prisma with PostgreSQL. Key models include:

- **User**: Authentication, profile, subscription
- **Project**: Book projects with status tracking
- **Content**: RSS feeds, files, text content
- **Chapter**: Generated book chapters
- **Export**: Book exports in various formats
- **ProcessingJob**: Background job tracking

## 🔐 Security Features

- **Helmet.js**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: API rate limiting
- **JWT**: Secure authentication
- **Input Validation**: Request validation with express-validator
- **SQL Injection Protection**: Prisma ORM protection

## 🚀 Production Deployment

### Docker Production
```bash
# Build production image
docker build --target production -t podbook-backend .

# Run production container
docker run -p 3000:3000 --env-file .env podbook-backend
```

### AWS Deployment
- **ECS Fargate**: Container orchestration
- **RDS**: Managed PostgreSQL
- **ElastiCache**: Managed Redis
- **S3**: File storage
- **CloudFront**: CDN for static assets

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run specific test file
npm test -- --testPathPattern=auth.test.ts
```

## 📝 API Documentation

API documentation is available at `/api/docs` when running the server.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the API endpoints

---

**Happy coding! 🚀**
