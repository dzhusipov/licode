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
echo "$NOW ------------------------ Sending started ------------------------ " >> $LOGFILE

folders=$(ls -l $ROOTPATH | grep '^d' | awk '{ print $9 }') # change lalala to normal output |grep -o '[0-9]*'

#check each folder
for folder in $folders
do
	#enter to iin folder
	IINROOTPATH=$ROOTPATH$folder
	cd $IINROOTPATH

	IIN=$folder
	#check is empty folder
	if [ "$(ls -A $IINROOTPATH)" ];	then

		#for each file get analog of client video
		files=$(ls "$IINROOTPATH/" | grep mkv)

		for file in $files
		do
			RESULTOFREST=`curl -F "File=@$file" -F "DocumentType=VEREF" -H "Role:Client" -H "IIN:$IIN" -H "Content-Type:multipart/form-data" --request POST http://192.168.15.3:9082/ecmapi/json/documents?DocumentType=VEREF`
			NOW=$(date +"%Y-%m-%d %T")
			echo "$NOW finale file : $file Send result: $RESULTOFREST" >> $LOGFILE
			mkdir "$IINROOTPATH/sended/"
			mv "$IINROOTPATH/$file" "$IINROOTPATH/sended/sended-$file"
		done
	else
		echo "Empty"
	fi
done

NOW=$(date +"%Y-%m-%d %T") 
echo "$NOW ------------------------ Sending ended -------------------------- " >> $LOGFILE