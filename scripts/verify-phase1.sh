#!/bin/bash

# Phase 1 Verification Script
# Checks if all Phase 1 files and configurations are in place

echo "🔍 Verifying Phase 1 Implementation..."
echo "======================================"
echo ""

ERRORS=0
WARNINGS=0

# Check required files
echo "📁 Checking files..."

FILES=(
    "src/app/api/contact/route.ts"
    "src/lib/email.ts"
    "src/db/schema.ts"
    "src/db/index.ts"
    "src/app/admin/submissions/page.tsx"
    "drizzle/migrations/0000_initial.sql"
    "drizzle.config.ts"
    "wrangler.toml"
    "package.json"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file"
    else
        echo "  ❌ $file (MISSING)"
        ((ERRORS++))
    fi
done

echo ""

# Check dependencies
echo "📦 Checking dependencies..."

DEPS=("resend" "drizzle-orm" "zod" "@cloudflare/workers-types" "drizzle-kit")

for dep in "${DEPS[@]}"; do
    if npm list "$dep" &> /dev/null; then
        echo "  ✅ $dep"
    else
        echo "  ❌ $dep (NOT INSTALLED)"
        ((ERRORS++))
    fi
done

echo ""

# Check environment file
echo "🔐 Checking environment configuration..."

if [ -f ".env.local" ]; then
    echo "  ✅ .env.local exists"
    
    # Check for required variables
    REQUIRED_VARS=("RESEND_API_KEY" "EMAIL_FROM" "ADMIN_EMAIL" "ADMIN_PASSWORD" "ADMIN_SESSION_SECRET")
    
    for var in "${REQUIRED_VARS[@]}"; do
        if grep -q "^${var}=" .env.local && ! grep -q "^${var}=$" .env.local; then
            echo "  ✅ $var is set"
        else
            echo "  ⚠️  $var is not set or empty"
            ((WARNINGS++))
        fi
    done
else
    echo "  ❌ .env.local does not exist"
    echo "     Run: cp .env.example .env.local"
    ((ERRORS++))
fi

echo ""

# Check database
echo "🗄️  Checking database..."

if [ -d ".wrangler/state/v3/d1" ]; then
    echo "  ✅ Local D1 database directory exists"
else
    echo "  ⚠️  Local D1 database not found"
    echo "     Run: npx wrangler d1 create ctk-website-db --local"
    ((WARNINGS++))
fi

if [ -f "drizzle/migrations/0000_initial.sql" ]; then
    echo "  ✅ Migration file exists"
else
    echo "  ❌ Migration file missing"
    ((ERRORS++))
fi

echo ""

# Summary
echo "======================================"
echo "📊 Verification Summary"
echo "======================================"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo "✅ All checks passed! Phase 1 is ready."
    echo ""
    echo "Next steps:"
    echo "1. Make sure .env.local has your API keys"
    echo "2. Run: npm run dev"
    echo "3. Test: http://localhost:3000/connect/contact"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo "⚠️  $WARNINGS warning(s) found"
    echo ""
    echo "Phase 1 files are in place, but you need to:"
    echo "1. Add API keys to .env.local"
    echo "2. Run database setup commands"
    echo ""
    echo "See PHASE1_CHECKLIST.md for details"
    exit 0
else
    echo "❌ $ERRORS error(s) and $WARNINGS warning(s) found"
    echo ""
    echo "Please fix the errors above before proceeding."
    echo "See PHASE1_CHECKLIST.md for setup instructions"
    exit 1
fi
