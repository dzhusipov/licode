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
	NOW=$(date +"%Y-%m-%d %T") 
	echo "$NOW Path is $IINROOTPATH" >> $LOGFILE
	#check is empty folder
	if [ "$(ls -A $IINROOTPATH/client)" ];	then
		NOW=$(date +"%Y-%m-%d %T") 
		echo "$NOW notEmpty client $IINROOTPATH/client" >> $LOGFILE
	else

		if [ "$(ls -A $IINROOTPATH/agent)" ];	then
			NOW=$(date +"%Y-%m-%d %T") 
			echo "$NOW notEmpty agent $IINROOTPATH/agent" >> $LOGFILE
		else
			if [ ! -d "$IINROOTPATH/screen/" ]; then
				#remove all nah
				NOW=$(date +"%Y-%m-%d %T") 
				echo "$NOW rm -rf $IINROOTPATH" >> $LOGFILE
				rm -rf $IINROOTPATH
			fi
			
		fi

	fi
done

NOW=$(date +"%Y-%m-%d %T") 
echo "$NOW ------------------------ Trash24 ended -------------------------- " >> $LOGFILE