#!/bin/bash
#show logo
#cat logo.dat
#enter in directory
ROOTPATH="/var/www/html/rec/"
cd $ROOT_PATH

#log file settings
DATENOWIS=$(date +"%Y-%m-%d")
LOGNAME="-trash.log"
LOGFILE=$ROOTPATH$DATENOWIS$LOGNAME
NOW=$(date +"%Y-%m-%d %T") 
echo "$NOW ------------------------ Trash24 started ------------------------ " >> $LOGFILE

folders=$(ls -l $ROOTPATH | grep '^d' | awk '{ print $9 }') # change lalala to normal output |grep -o '[0-9]*'

#check each folder
for folder in $folders
do
	#enter to iin folder
	IINROOTPATH=$ROOTPATH$folder

	if [ ! -f "$IINROOTPATH/$folder.nfo" ]; then
		NOW=$(date +"%Y-%m-%d %T") 
		echo "$NOW $IINROOTPATH not finished" >> $LOGFILE
    	continue
	fi

	IIN=$folder
	NOW=$(date +"%Y-%m-%d %T") 
	echo "$NOW Path is $IINROOTPATH" >> $LOGFILE
	#check is empty folder
	if [ ! "$(ls -A $IINROOTPATH/client/*mkv)" ] && [ ! "$(ls -A $IINROOTPATH/agent/*mkv)" ] && [ ! "$(ls -A $IINROOTPATH/screen/*mkv)" ] && [ ! "$(ls -A $IINROOTPATH/*mkv)" ]
	then
		NOW=$(date +"%Y-%m-%d %T") 
		echo "$NOW rm -rf $IINROOTPATH" >> $LOGFILE
		rm -rf $IINROOTPATH
	fi
done

NOW=$(date +"%Y-%m-%d %T") 
echo "$NOW ------------------------ Trash24 ended -------------------------- " >> $LOGFILE