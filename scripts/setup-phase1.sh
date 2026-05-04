#!/bin/bash

# Phase 1 Setup Script for CTK Website
# This script helps you set up the contact form backend

set -e

echo "🚀 CTK Website - Phase 1 Setup"
echo "================================"
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  IMPORTANT: Edit .env.local and add your API keys:"
    echo "   - RESEND_API_KEY (get from https://resend.com)"
    echo "   - ADMIN_PASSWORD (set a secure password)"
    echo "   - ADMIN_SESSION_SECRET (generate a random string)"
    echo ""
    read -p "Press Enter when you've added your API keys to .env.local..."
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️  Setting up database..."

# Check if wrangler is available
if ! command -v npx &> /dev/null; then
    echo "❌ npx not found. Please install Node.js"
    exit 1
fi

# Generate migrations
echo "Generating database migrations..."
npm run db:generate

# Create local D1 database
echo "Creating local D1 database..."
npx wrangler d1 create ctk-website-db --local || echo "Database may already exist"

# Run migrations
echo "Running migrations..."
npm run db:migrate || echo "Migrations may have already run"

echo ""
echo "✅ Phase 1 Setup Complete!"
echo ""
echo "📋 Next Steps:"
echo "1. Make sure you've added API keys to .env.local"
echo "2. Run: npm run dev"
echo "3. Visit: http://localhost:3000/connect/contact"
echo "4. Test the contact form"
echo "5. Check admin dashboard: http://localhost:3000/admin/submissions"
echo ""
echo "📖 For detailed instructions, see:"
echo "   - SETUP_GUIDE.md"
echo "   - PHASE1_IMPLEMENTATION.md"
echo ""
echo "🎉 Happy coding!"
