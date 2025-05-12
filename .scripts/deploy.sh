#!/bin/bash

# Load NVM
export NVM_DIR="$HOME/.nvm"
source "$NVM_DIR/nvm.sh"

# Use LTS version of Node
nvm use --lts

# Go to your project directory
cd /var/www/ecommerce_backend/Ecmmerce-Backend || exit

# Pull latest code
echo "Pulling latest changes from Git..."
git pull origin main

# Install dependencies
echo "Installing dependencies..."
npm install

# Restart app with pm2
echo "Restarting app with PM2..."
pm2 restart ecommerce_backend

