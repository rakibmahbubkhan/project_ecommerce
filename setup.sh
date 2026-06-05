#!/bin/bash

echo "🚀 Setting up E-Commerce Platform"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v24 or higher"
    exit 1
fi

# Check if MySQL is installed
if ! command -v mysql &> /dev/null; then
    echo "❌ MySQL is not installed. Please install MySQL 5.7 or higher"
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
cp .env.example .env
echo "✅ Backend dependencies installed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install
cp .env.example .env
echo "✅ Frontend dependencies installed"

cd ..

# Setup database
echo "🗄️ Setting up database..."
echo "Please enter your MySQL root password:"
mysql -u root -p < database/ecommerce.sql

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "1. Update database credentials in backend/.env"
echo "2. Run: cd backend && npm run start:dev"
echo "3. In another terminal: cd frontend && npm run dev"
echo ""
echo "Application will be available at:"
echo "- Frontend: http://localhost:5173"
echo "- Backend API: http://localhost:3001/api"