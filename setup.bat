@echo off
echo 🚀 Setting up E-Commerce Platform

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v24 or higher
    exit /b 1
)

REM Install backend dependencies
echo 📦 Installing backend dependencies...
cd backend
call npm install
copy .env.example .env
echo ✅ Backend dependencies installed

REM Install frontend dependencies
echo 📦 Installing frontend dependencies...
cd ../frontend
call npm install
copy .env.example .env
echo ✅ Frontend dependencies installed

cd ..

echo.
echo ✅ Setup complete!
echo.
echo To start the application:
echo 1. Update database credentials in backend\.env
echo 2. Run: cd backend ^&^& npm run start:dev
echo 3. In another terminal: cd frontend ^&^& npm run dev
echo.
pause