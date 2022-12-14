#!/bin/sh
echo "Srarting blog-front..."
pm2 start yarn --name blog-front -- start
