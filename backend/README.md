# NestJS Backend for SaaS Platform UI

A production-ready NestJS backend with Supabase (PostgreSQL + Auth) and Redis integration for the SaaS Platform UI project.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Redis server running locally or accessible remotely
- Supabase project set up

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env file with your actual values
   ```

3. **Start the development server:**
   ```bash
   npm run start:dev
   ```

The backend will be available at `http://localhost:3001`

## 🔧 Environment Configuration

Copy `.env.example` to `.env` and configure the following variables:

```env
# Server Configuration
PORT=3001
NODE_ENV=development

# Supabase Configuration (Get these from your Supabase dashboard)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_role_key

# Redis Configuration
REDIS_URL=redis://localhost:6379

# JWT Configuration
JWT_SECRET=your_very_long_and_secure_jwt_secret_key

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001
```

### Getting Supabase Keys

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to Settings → API
4. Copy the Project URL and API keys

## 📡 API Endpoints

### Authentication (`/api/auth`)

#### POST `/api/auth/signup`
Create a new user account.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token",
    "expires_at": 1234567890
  }
}
```

#### POST `/api/auth/login`
Authenticate an existing user.

**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** Same as signup

#### POST `/api/auth/logout`
Logout the current user (requires authentication).

**Headers:**
```
Authorization: Bearer <access_token>
```

**Response:**
```json
{
  "message": "Successfully logged out",
  "success": true
}
```

#### POST `/api/auth/refresh`
Refresh an expired access token.

**Request:**
```json
{
  "refresh_token": "refresh_token_here"
}
```

**Response:** Same as login

### Users (`/api/users`)

All user endpoints require authentication header: `Authorization: Bearer <access_token>`

#### GET `/api/users`
Get all users (admin functionality).

**Response:**
```json
{
  "users": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "created_at": "2024-01-01T00:00:00Z",
      "last_sign_in_at": "2024-01-01T12:00:00Z",
      "email_confirmed_at": "2024-01-01T00:05:00Z"
    }
  ],
  "total": 1
}
```

#### GET `/api/users/me`
Get current user's information.

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "created_at": "2024-01-01T00:00:00Z",
  "last_sign_in_at": "2024-01-01T12:00:00Z",
  "email_confirmed_at": "2024-01-01T00:05:00Z"
}
```

#### GET `/api/users/:id`
Get specific user by ID.

**Response:** Same as `/me`

### Health Check

#### GET `/api/health`
Check server health status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

## 🏗️ Architecture

### Tech Stack
- **Framework:** NestJS with TypeScript
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **Caching:** Redis
- **Validation:** class-validator, class-transformer

### Module Structure
```
src/
├── modules/
│   ├── auth/           # Authentication logic
│   ├── users/          # User management
│   ├── supabase/       # Supabase client integration
│   └── redis/          # Redis client integration
├── common/
│   ├── dto/            # Data transfer objects
│   ├── guards/         # Authentication guards
│   └── interceptors/   # Global exception handling
├── app.module.ts       # Root application module
└── main.ts            # Application bootstrap
```

### Key Features
- **JWT Authentication:** Via Supabase Auth with Redis session storage
- **Caching:** Redis-based caching for user data (5-10 min TTL)
- **Session Management:** Redis-based session storage with configurable TTL
- **Global Validation:** Request validation using class-validator
- **Error Handling:** Global exception filter with standardized responses
- **CORS Support:** Configurable cross-origin resource sharing

## 🧪 Testing

### Manual Testing with curl

1. **Health Check:**
   ```bash
   curl http://localhost:3001/api/health
   ```

2. **Signup:**
   ```bash
   curl -X POST http://localhost:3001/api/auth/signup \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

3. **Login:**
   ```bash
   curl -X POST http://localhost:3001/api/auth/login \
     -H "Content-Type: application/json" \
     -d '{"email":"test@example.com","password":"password123"}'
   ```

4. **Get Users (requires token):**
   ```bash
   curl -X GET http://localhost:3001/api/users \
     -H "Authorization: Bearer <access_token>"
   ```

5. **Logout:**
   ```bash
   curl -X POST http://localhost:3001/api/auth/logout \
     -H "Authorization: Bearer <access_token>"
   ```

### Automated Testing

Run the test suite:
```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔄 Integration with Next.js Frontend

### Next.js API Route Proxy

Create or update `next.config.js` in your frontend to proxy API calls:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3001/api/:path*',
      },
    ];
  },
  // ... other config
};

export default nextConfig;
```

### Frontend Usage Examples

```typescript
// Login from Next.js
const response = await fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'user@example.com',
    password: 'password123',
  }),
});

const data = await response.json();

// Store token for subsequent requests
localStorage.setItem('access_token', data.session.access_token);

// Authenticated request
const usersResponse = await fetch('/api/users', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
  },
});
```

## 🗄️ Database Schema

The backend uses Supabase's built-in auth system. No additional database setup is required as it uses the `auth.users` table provided by Supabase.

If you need custom user profiles, you can create additional tables:

```sql
-- Custom user profiles table (optional)
create table public.user_profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  first_name text,
  last_name text,
  avatar_url text,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS (Row Level Security)
alter table public.user_profiles enable row level security;

-- Create policy for users to only access their own profile
create policy "Users can view their own profile." 
  on public.user_profiles for select 
  using (auth.uid() = id);

create policy "Users can update their own profile." 
  on public.user_profiles for update 
  using (auth.uid() = id);
```

## 🔒 Security Features

- **JWT Verification:** All protected routes verify JWT tokens with Supabase
- **Session Management:** Redis-based session storage with automatic expiration
- **Input Validation:** Comprehensive request validation using class-validator
- **CORS Protection:** Configurable CORS with specific allowed origins
- **Error Handling:** Secure error responses without sensitive information leakage

## 🚀 Production Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3001
SUPABASE_URL=your_production_supabase_url
SUPABASE_ANON_KEY=your_production_anon_key
SUPABASE_SERVICE_KEY=your_production_service_key
REDIS_URL=your_production_redis_url
JWT_SECRET=very_long_secure_production_jwt_secret
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

### Build and Start

```bash
# Build for production
npm run build

# Start production server
npm run start:prod
```

## 📝 Development Commands

```bash
# Development
npm run start:dev      # Start with hot reload
npm run start:debug    # Start with debugging
npm run start:prod     # Start production build

# Building
npm run build          # Build the application

# Testing
npm run test           # Run unit tests
npm run test:e2e       # Run end-to-end tests
npm run test:cov       # Run tests with coverage

# Linting
npm run lint           # Run ESLint
npm run format         # Format code with Prettier
```

## 🐛 Troubleshooting

### Common Issues

1. **Redis Connection Error:**
   - Ensure Redis server is running
   - Check REDIS_URL in .env file
   - For local Redis: `redis-server`

2. **Supabase Connection Error:**
   - Verify SUPABASE_URL and keys in .env
   - Check Supabase project status
   - Ensure API keys have correct permissions

3. **CORS Issues:**
   - Update ALLOWED_ORIGINS in .env
   - Ensure frontend URL is included

4. **JWT Verification Failed:**
   - Check if user session exists in Redis
   - Verify token hasn't expired
   - Ensure Supabase project is active

### Logs

The application uses NestJS built-in logging. Check console output for detailed error messages and debugging information.
## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
