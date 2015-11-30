#!/bin/bash 
clear
echo "----------------------------------Init---------------------------------------"
cp server_modules/erizoController.js ../../erizo_controller/erizoController/erizoController.js 
git pull && bash ../../../restart.sh
echo "----------------------------------done---------------------------------------"
