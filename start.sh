#!/bin/bash

# BFPA Platform - Quick Start Script
# This script starts both frontend and backend servers for local development

echo "🚀 Starting BFPA Platform..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if running on Windows (Git Bash/MSYS2)
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "cygwin" ]]; then
    # Windows PowerShell / Git Bash
    echo -e "${BLUE}📝 Starting Backend Server...${NC}"
    Start-Process PowerShell -ArgumentList "cd scripts\backend; python manage.py runserver 0.0.0.0:8000" -NoNewWindow

    echo -e "${BLUE}📝 Starting Frontend Server...${NC}"
    Start-Process PowerShell -ArgumentList "pnpm dev" -NoNewWindow
else
    # Unix-like systems
    echo -e "${BLUE}📝 Starting Backend Server...${NC}"
    cd scripts/backend
    python manage.py runserver 0.0.0.0:8000 &
    BACKEND_PID=$!
    cd ../..

    echo -e "${BLUE}📝 Starting Frontend Server...${NC}"
    pnpm dev &
    FRONTEND_PID=$!

    echo ""
    echo -e "${GREEN}✅ Both servers started!${NC}"
    echo ""
    echo "📱 Frontend:  http://localhost:3000"
    echo "🔌 Backend:   http://localhost:8000"
    echo "📚 API:       http://localhost:8000/api"
    echo ""
    echo "Press Ctrl+C to stop both servers"
    echo ""

    # Wait for both processes
    wait $BACKEND_PID $FRONTEND_PID
fi
