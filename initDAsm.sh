#!/bin/bash 
clear
cat ./server_modules/logo.dat
cp server_modules/erizoController.js ../../erizo_controller/erizoController/erizoController.js 
git pull && bash ../../../restart.sh
echo "----------------------------------done---------------------------------------"
