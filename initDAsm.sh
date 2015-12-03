#!/bin/bash 
clear
cat /home/dasm/git/licode/extras/basic_example/server_modules/logo.dat
cp /home/dasm/git/licode/extras/basic_example/server_modules/erizoController.js /home/dasm/git/licode/erizo_controller/erizoController/erizoController.js 
git pull && bash ../../../restart.sh
echo "----------------------------------done---------------------------------------"
