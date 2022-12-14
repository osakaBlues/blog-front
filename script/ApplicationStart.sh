#!/bin/sh
echo "Srarting blog-front..."
pm2 start "yarn start" --name blog-front
