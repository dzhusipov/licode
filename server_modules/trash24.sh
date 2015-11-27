#!/bin/bash
#show logo
#cat logo.dat
#enter in directory
ROOTPATH="/var/www/html/rec/"
cd $ROOT_PATH

#log file settings
DATENOWIS=$(date +"%Y-%m-%d")
LOGNAME="-merge.log"
LOGFILE=$ROOTPATH$DATENOWIS$LOGNAME
NOW=$(date +"%Y-%m-%d %T") 
echo "$NOW ------------------------ Trash24 started ------------------------ " >> $LOGFILE

folders=$(ls -l $ROOTPATH | grep '^d' | awk '{ print $9 }') # change lalala to normal output |grep -o '[0-9]*'

#check each folder
for folder in $folders
do
	#enter to iin folder
	IINROOTPATH=$ROOTPATH$folder

	IIN=$folder
	#check is empty folder
	if [ "$(ls -A $IINROOTPATH/client)" ];	then
		echo "notEmpty client"
	else

		if [ "$(ls -A $IINROOTPATH/agent)" ];	then
			echo "notEmpty agent"
		else
			#remove all nah
			echo "rm -rf $IINROOTPATH"
		fi

	fi
done

NOW=$(date +"%Y-%m-%d %T") 
echo "$NOW ------------------------ Trash24 ended -------------------------- " >> $LOGFILE