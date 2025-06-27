#!/bin/bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

# Use LTS Node version
nvm use --lts

# Go to dev project directory
cd /var/www/ecmmerce-backend-dev/Ecmmerce-Backend || exit

# Pull latest code from dev branch
echo "Pulling latest code from dev..."
git pull origin dev

# Install dependencies
echo "Installing dependencies..."
npm install

# Restart PM2 process (custom name)
echo "Restarting dev PM2 app..."
pm2 restart ecommerce-dev || pm2 start index.js --name ecommerce-dev
