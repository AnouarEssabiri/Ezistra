#!/bin/bash

echo "🚀 Setting up NestJS Backend for SaaS Platform UI"
echo ""

# Check if .env exists
if [ ! -f .env ]; then
    echo "📋 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Created .env file. Please update it with your actual values:"
    echo "   - SUPABASE_URL"
    echo "   - SUPABASE_ANON_KEY" 
    echo "   - SUPABASE_SERVICE_KEY"
    echo "   - REDIS_URL"
    echo "   - JWT_SECRET"
    echo ""
else
    echo "✅ .env file already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🔧 Setup complete! Next steps:"
echo ""
echo "1. Update .env file with your Supabase and Redis credentials"
echo "2. Start Redis server: redis-server"
echo "3. Start the development server: npm run start:dev"
echo "4. Backend will be available at http://localhost:3001"
echo ""
echo "📖 See README.md for detailed documentation"
