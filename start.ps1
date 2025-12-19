# BFPA Platform - Quick Start Script for Windows PowerShell
# This script starts both frontend and backend servers for local development

Write-Host "🚀 Starting BFPA Platform..." -ForegroundColor Cyan
Write-Host ""

# Function to start backend server
function Start-Backend {
    Write-Host "📝 Starting Backend Server..." -ForegroundColor Blue
    Push-Location "scripts\backend"
    
    # Create a new PowerShell process for the backend
    $backendProcess = Start-Process -FilePath "python" -ArgumentList "manage.py", "runserver", "127.0.0.1:8000" -PassThru -WindowStyle Normal
    
    Pop-Location
    return $backendProcess.Id
}

# Function to start frontend server
function Start-Frontend {
    Write-Host "📝 Starting Frontend Server..." -ForegroundColor Blue
    
    # Create a new PowerShell process for the frontend
    $frontendProcess = Start-Process -FilePath "pnpm" -ArgumentList "dev" -PassThru -WindowStyle Normal
    
    return $frontendProcess.Id
}

# Start both servers
Write-Host ""
$backendPID = Start-Backend
$frontendPID = Start-Frontend

Write-Host ""
Write-Host "✅ Both servers started!" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Frontend:  http://localhost:3000" -ForegroundColor Yellow
Write-Host "🔌 Backend:   http://localhost:8000" -ForegroundColor Yellow
Write-Host "📚 API:       http://localhost:8000/api" -ForegroundColor Yellow
Write-Host ""
Write-Host "Process IDs:" -ForegroundColor Cyan
Write-Host "  Backend:  $backendPID"
Write-Host "  Frontend: $frontendPID"
Write-Host ""
Write-Host "Close the terminal windows to stop the servers." -ForegroundColor Yellow
Write-Host ""
Write-Host "Waiting for servers..." -ForegroundColor Gray

# Wait for user to stop the script
Read-Host "Press Enter to exit"

# Optionally kill processes
Write-Host "Stopping servers..." -ForegroundColor Yellow
Stop-Process -Id $backendPID -ErrorAction SilentlyContinue
Stop-Process -Id $frontendPID -ErrorAction SilentlyContinue
Write-Host "Done!" -ForegroundColor Green
