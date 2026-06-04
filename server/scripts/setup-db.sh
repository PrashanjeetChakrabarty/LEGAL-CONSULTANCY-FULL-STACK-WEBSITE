#!/bin/bash
# F&V Legal Solutions — MySQL Database Setup Script
# Run with: bash server/scripts/setup-db.sh [mysql-root-password]

ROOT_PASS="${1:-}"
DB_NAME="fv_legal_db"
DB_USER="fv_legal_user"
DB_PASS="FVLegal@2024!"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  F&V Legal Solutions — MySQL Setup"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Build mysql command with optional password
if [ -z "$ROOT_PASS" ]; then
  MYSQL_CMD="mysql -u root"
else
  MYSQL_CMD="mysql -u root -p${ROOT_PASS}"
fi

# Test connection
echo "→ Testing MySQL connection..."
$MYSQL_CMD -e "SELECT 1;" > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "❌ Could not connect to MySQL as root."
  echo "   Usage: bash server/scripts/setup-db.sh YOUR_ROOT_PASSWORD"
  exit 1
fi
echo "✅ MySQL connection successful"

# Create database and user
echo "→ Creating database '${DB_NAME}'..."
$MYSQL_CMD << EOF
CREATE DATABASE IF NOT EXISTS ${DB_NAME}
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS '${DB_USER}'@'localhost'
  IDENTIFIED BY '${DB_PASS}';

GRANT ALL PRIVILEGES ON ${DB_NAME}.* TO '${DB_USER}'@'localhost';
FLUSH PRIVILEGES;

SELECT CONCAT('✅ Database: ', SCHEMA_NAME) AS status
FROM information_schema.SCHEMATA
WHERE SCHEMA_NAME = '${DB_NAME}';
EOF

if [ $? -eq 0 ]; then
  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo "✅ MySQL setup complete!"
  echo ""
  echo "   Database : ${DB_NAME}"
  echo "   User     : ${DB_USER}"
  echo "   Password : ${DB_PASS}"
  echo "   Host     : localhost:3306"
  echo ""
  echo "   Tables will be auto-created when the"
  echo "   server starts (Sequelize sync)."
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
else
  echo "❌ Setup failed. Check MySQL permissions."
  exit 1
fi
