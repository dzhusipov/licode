#!/bin/bash
#enter in directory
ROOT_PATH = "/var/www/html/rec/"
cd $ROOT_PATH

#log file settings
DATENOWIS=$(date +"%Y-%m-%d")
LOGNAME="-merge.log"
LOGFILE=$ROOT_PATH$DATENOWIS$LOGNAME
NOW=$(date +"%Y-%m-%d %T") 
echo "$NOW ------------------------ Merging started ------------------------ " >> $LOGFILE

folders=$(ls | grep lalalala) # change lalala to normal output

#check each folder
for folder in $folders
do
	#enter to iin folder
	IINROOTPATH=$ROOT_PATH$folder
	cd $IINROOTPATH
	#check is empty folder
	if [ "$(ls -A $IINROOTPATH)" ];	then

		#for each file get analog of client video
		for files in "$IINROOTPATH/agent"
		do

		done

		echo "Not Empty"
	else
		echo "Empty"
	fi
done

NOW=$(date +"%Y-%m-%d %T") 
echo "$NOW ------------------------ Merging ended -------------------------- " >> $LOGFILE