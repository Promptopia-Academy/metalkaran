#!/bin/bash

# Deploy Script for Metalkaran
# اسکریپت Deploy خودکار

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/var/www/metalkaran"
APP_NAME="metalkaran"
BRANCH="${1:-main}"

# Check if running as root or with sudo
if [ "$EUID" -eq 0 ]; then 
   echo -e "${RED}Please don't run as root. Use a regular user with sudo.${NC}"
   exit 1
fi

cd "$PROJECT_DIR" || exit

echo -e "${YELLOW}📦 Updating code from Git...${NC}"
git fetch origin
git reset --hard origin/$BRANCH

echo -e "${YELLOW}📥 Installing dependencies...${NC}"
npm ci --production=false

echo -e "${YELLOW}🗄️  Generating Prisma Client...${NC}"
npm run db:generate

echo -e "${YELLOW}🔄 Running database migrations...${NC}"
npm run db:migrate || npm run db:push

echo -e "${YELLOW}🔨 Building application...${NC}"
npm run build

echo -e "${YELLOW}🔄 Restarting PM2 application...${NC}"
pm2 restart "$APP_NAME" || pm2 start ecosystem.config.js

echo -e "${YELLOW}💾 Saving PM2 configuration...${NC}"
pm2 save

echo -e "${GREEN}✅ Deployment completed successfully!${NC}"
echo -e "${GREEN}📊 Checking application status...${NC}"
pm2 status

echo -e "${GREEN}✅ Done! Application is running.${NC}"

