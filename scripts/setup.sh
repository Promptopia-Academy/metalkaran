#!/bin/bash

# Initial Setup Script for Metalkaran
# اسکریپت Setup اولیه

set -e

echo "🔧 Setting up Metalkaran..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js first.${NC}"
    exit 1
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed. Please install npm first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js and npm are installed${NC}"

# Create logs directory
mkdir -p logs

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm ci --production=false

# Setup environment
if [ ! -f .env.production ]; then
    echo -e "${YELLOW}📝 Creating .env.production from example...${NC}"
    cp .env.production.example .env.production
    echo -e "${GREEN}✅ Created .env.production - Please edit it with your values!${NC}"
else
    echo -e "${GREEN}✅ .env.production already exists${NC}"
fi

# Generate Prisma Client
echo -e "${YELLOW}🗄️  Generating Prisma Client...${NC}"
npm run db:generate

# Setup database
echo -e "${YELLOW}🗄️  Setting up database...${NC}"
npm run db:push

echo -e "${GREEN}✅ Setup completed!${NC}"
echo -e "${YELLOW}📝 Next steps:${NC}"
echo -e "1. Edit .env.production with your values"
echo -e "2. Run: npm run db:seed (optional)"
echo -e "3. Run: npm run build"
echo -e "4. Run: pm2 start ecosystem.config.js"

