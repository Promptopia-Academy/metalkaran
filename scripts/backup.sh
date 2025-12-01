#!/bin/bash

# Backup Script for Metalkaran
# اسکریپت Backup خودکار

set -e

# Configuration
PROJECT_DIR="/var/www/metalkaran"
BACKUP_DIR="/var/backups/metalkaran"
DATE=$(date +%Y%m%d_%H%M%S)
RETENTION_DAYS=30

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${YELLOW}📦 Starting backup...${NC}"

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Backup database (SQLite)
if [ -f "$PROJECT_DIR/prisma/dev.db" ]; then
    echo -e "${YELLOW}💾 Backing up database...${NC}"
    cp "$PROJECT_DIR/prisma/dev.db" "$BACKUP_DIR/db_$DATE.db"
    echo -e "${GREEN}✅ Database backed up to $BACKUP_DIR/db_$DATE.db${NC}"
fi

# Backup environment file
if [ -f "$PROJECT_DIR/.env.production" ]; then
    echo -e "${YELLOW}📄 Backing up environment file...${NC}"
    cp "$PROJECT_DIR/.env.production" "$BACKUP_DIR/env_$DATE.env"
    echo -e "${GREEN}✅ Environment file backed up${NC}"
fi

# Remove old backups (older than RETENTION_DAYS days)
echo -e "${YELLOW}🗑️  Cleaning up old backups (older than $RETENTION_DAYS days)...${NC}"
find "$BACKUP_DIR" -name "db_*.db" -type f -mtime +$RETENTION_DAYS -delete
find "$BACKUP_DIR" -name "env_*.env" -type f -mtime +$RETENTION_DAYS -delete

echo -e "${GREEN}✅ Backup completed successfully!${NC}"

# List current backups
echo -e "${YELLOW}📋 Current backups:${NC}"
ls -lh "$BACKUP_DIR" | tail -n +2

