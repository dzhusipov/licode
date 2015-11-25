#!/bin/bash
DATE=`date +%Y-%m-%d--%H:%M:%S`; echo $DATE
git add -A .
git commit -m $DATE
git push origin ecmservice
