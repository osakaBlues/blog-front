#!/bin/sh
echo "Blog front stoping..."
pm2 describe blog-front > /dev/null
RUNNING=$?

if [ "${RUNNING}" -ne 0 ]; then
  echo "Blog front is not running"
else
  pm2 stop blog-front
  pm2 delete blog-front
fi;
