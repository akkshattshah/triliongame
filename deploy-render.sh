#!/bin/bash

# Trilion App Render Deployment Script
# This script helps prepare and deploy the app to Render

echo "🚀 Trilion App Render Deployment Script"
echo "======================================"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Git repository not found. Please initialize git first."
    exit 1
fi

# Check if render.yaml exists
if [ ! -f "render.yaml" ]; then
    echo "❌ Error: render.yaml not found. Please ensure it exists in the root directory."
    exit 1
fi

echo "✅ Git repository found"
echo "✅ render.yaml configuration found"

# Check if server/index.js exists
if [ ! -f "server/index.js" ]; then
    echo "❌ Error: server/index.js not found. Please ensure the backend file exists."
    exit 1
fi

# Check if frontend/package.json exists
if [ ! -f "frontend/package.json" ]; then
    echo "❌ Error: frontend/package.json not found. Please ensure the frontend exists."
    exit 1
fi

echo "✅ Backend and frontend files found"

# Check if all required environment variables are documented
echo ""
echo "📋 Required Environment Variables for Render:"
echo "============================================="
echo "NODE_ENV=production"
echo "PORT=10000"
echo "OPENAI_API_KEY=YOUR_OPENAI_API_KEY"
echo "ANTHROPIC_API_KEY=YOUR_ANTHROPIC_API_KEY"
echo "YOUTUBE_CLIENT_ID=YOUR_YOUTUBE_CLIENT_ID"
echo "YOUTUBE_CLIENT_SECRET=YOUR_YOUTUBE_CLIENT_SECRET"
echo "CORS_ORIGIN=https://trilion-frontend.onrender.com"

echo ""
echo "🔧 Next Steps:"
echo "=============="
echo "1. Push your code to GitHub:"
echo "   git add ."
echo "   git commit -m 'Prepare for Render deployment'"
echo "   git push origin main"
echo ""
echo "2. Go to Render Dashboard: https://dashboard.render.com"
echo "3. Click 'New' → 'Blueprint'"
echo "4. Connect your GitHub account"
echo "5. Select repository: akkshattshah/trilion"
echo "6. Set the environment variables listed above"
echo "7. Click 'Create Blueprint Instance'"
echo ""
echo "🌐 Your app will be available at:"
echo "   Frontend: https://trilion-frontend.onrender.com"
echo "   Backend:  https://trilion-backend.onrender.com"
echo ""
echo "✅ Deployment script completed successfully!" 