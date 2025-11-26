#!/bin/bash

# 🚀 WORKFLOW PHASE: Local Development Startup
# ────────────────────────────────────────────
# Purpose: Start both Express backend (:8080) and Next.js frontend (:3000)
# When to use: After SETUP_GUIDE.md is complete and .env.local is created
# Stop with: ./scripts/stop-dev.sh
# 
# Requirements:
#   - npm install completed
#   - .env.local created with ASAP credentials
#   - SETUP_GUIDE.md completed

echo "🚀 Starting AI Prototyping Environment"
echo "======================================"

# Kill any existing processes on ports 8080 and 3000
echo "🛑 Cleaning up existing processes..."
pkill -f "node backend/server.js" 2>/dev/null && echo "   ✅ Stopped backend process" || true
pkill -f "next dev" 2>/dev/null && echo "   ✅ Stopped frontend process" || true

# Alternative approach if pkill doesn't work - kill by port
if command -v lsof &> /dev/null; then
    if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null 2>&1; then
        kill -9 $(lsof -t -i:8080) 2>/dev/null || true
        echo "   ✅ Cleaned up port 8080"
    fi
    if lsof -Pi :3000 -sTCP:LISTEN -t >/dev/null 2>&1; then
        kill -9 $(lsof -t -i:3000) 2>/dev/null || true
        echo "   ✅ Cleaned up port 3000"
    fi
fi

# Wait a moment for ports to be released
sleep 1

echo "✅ Environment ready"

# Start Express backend
echo "🖥️  Starting Express backend..."
npm run dev:backend &
BACKEND_PID=$!
echo "   Backend PID: $BACKEND_PID"

# Wait for backend to start
sleep 3

# Start frontend
echo "🎨 Starting Next.js frontend..."
npm run dev:frontend &
FRONTEND_PID=$!
echo "   Frontend PID: $FRONTEND_PID"

echo ""
echo "🎉 All services started!"
echo "   - Express Backend: http://localhost:8080"
echo "   - Frontend: http://localhost:3000"
echo ""
echo "💡 To stop all services: ./scripts/stop-dev.sh"

# Save PIDs for cleanup script
echo "$BACKEND_PID $FRONTEND_PID" > .dev-pids

# Keep script running to maintain processes
wait
