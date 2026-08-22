#!/bin/sh
# JUMO UEOS Sovereign Platform Production Startup Script

echo "========================================================="
echo "   JUMO Universal Enterprise Operating System (UEOS)     "
echo "        PROD STARTUP ENGINE & ENVIRONMENT CHECK          "
echo "========================================================="

# 1. Ensure required environment variables exist
if [ -z "$PORT" ]; then
  echo "[STARTUP] PORT is not set. Defaulting to 3000."
  export PORT=3000
fi

if [ -z "$NODE_ENV" ]; then
  echo "[STARTUP] NODE_ENV is not set. Defaulting to production."
  export NODE_ENV=production
fi

echo "[STARTUP] Target Host Binding: 0.0.0.0:${PORT}"
echo "[STARTUP] Environment: ${NODE_ENV}"

# 2. Database validation
if [ -n "$SQL_HOST" ] && [ -n "$SQL_DB_NAME" ]; then
  echo "[STARTUP] PostgreSQL database connection parameters detected: ${SQL_HOST}/${SQL_DB_NAME}"
else
  echo "[STARTUP] PostgreSQL parameters not fully declared. Booting in Secure Local JSON Storage Fallback Mode."
fi

# 3. Launch compiled server
echo "[STARTUP] Launching Sovereign Node Server..."
exec node dist/server.cjs
