#!/bin/bash 
clear
echo "Init........"
cp erizoController.js ../../erizo_controller/erizoController/erizoController.js 
git pull && bash ../../../restart.sh
clear
echo "----------------------------------done---------------------------------------"
