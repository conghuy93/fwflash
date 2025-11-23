#!/bin/bash

echo "========================================"
echo "ESP32 Web Flasher - Push to GitHub"
echo "========================================"
echo ""

# Check if git is initialized
if [ ! -d .git ]; then
    echo "Initializing git repository..."
    git init
    echo ""
fi

# Add all files
echo "Adding files..."
git add .

# Commit
echo ""
echo "Committing changes..."
git commit -m "ESP32 Web Flasher - Deploy to GitHub Pages"

# Check if remote exists
if ! git remote get-url origin &>/dev/null; then
    echo ""
    echo "Adding remote repository..."
    git remote add origin https://github.com/conghuy93/fwflash.git
fi

# Push to GitHub
echo ""
echo "Pushing to GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "========================================"
echo "Done!"
echo ""
echo "Next steps:"
echo "1. Go to https://github.com/conghuy93/fwflash"
echo "2. Settings > Pages"
echo "3. Select branch: main, folder: / (root)"
echo "4. Save"
echo ""
echo "Your site will be available at:"
echo "https://conghuy93.github.io/fwflash/"
echo "========================================"
echo ""

