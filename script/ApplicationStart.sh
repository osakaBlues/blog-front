#!/bin/sh
echo "Srarting blog-front..."
cd /home/ubuntu/deploy/blog-front
pm2 start yarn --name blog-front -- start
