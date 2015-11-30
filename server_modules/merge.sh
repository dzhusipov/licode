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
echo "$NOW ------------------------ Merging started ------------------------ " >> $LOGFILE

folders=$(ls -l $ROOTPATH | grep '^d' | awk '{ print $9 }') # change lalala to normal output |grep -o '[0-9]*'

#check each folder
for folder in $folders
do
	#enter to iin folder
	IINROOTPATH=$ROOTPATH$folder
	cd $IINROOTPATH
	#check is empty folder
	if [ "$(ls -A $IINROOTPATH)" ];	then
		NOW=$(date +"%Y-%m-%d %T") 
		echo "$NOW Processing $IINROOTPATH" >> $LOGFILE
		#for each file get analog of client video
		files=$(ls "$IINROOTPATH/agent/" | grep mkv)

		for file in $files
		do
			if [ ! -f "$IINROOTPATH/client/$file" ]
			then
				echo "file client $file not found"
				NOW=$(date +"%Y-%m-%d %T") 
				echo "$NOW client $file not found" >> $LOGFILE
			else
				#both of files is normal and they are not gay 
				mkdir "$IINROOTPATH/trash/"
				ffmpeg -v quiet -y -i "$IINROOTPATH/agent/$file" -vn -ar 44100 -ac 2 -ab 192 -f mp3 "$IINROOTPATH/$file.mp3" </dev/null
				NOW=$(date +"%Y-%m-%d %T") 
				echo "$NOW get agent sound $IINROOTPATH/$file.mp3" >> $LOGFILE
				mv "$IINROOTPATH/agent/$file" "$IINROOTPATH/trash/agent-$file"

				ffmpeg -i "$IINROOTPATH/client/$file" -i "$IINROOTPATH/$file.mp3" -filter_complex "[0:a][1:a]amerge=inputs=2[a]" -map 0:v -map "[a]" -c:v copy -c:a libvorbis -ac 2 -shortest "$IINROOTPATH/$file" </dev/null
				
				NOW=$(date +"%Y-%m-%d %T") 
				echo "$NOW get finile file $IINROOTPATH/$file" >> $LOGFILE

				mv "$IINROOTPATH/client/$file" "$IINROOTPATH/trash/client-$file"
				mv "$IINROOTPATH/$file.mp3" "$IINROOTPATH/trash/agent-$file.mp3"
			fi
		done

		files=$(ls "$IINROOTPATH/agent/" | grep mkv)

		NOW=$(date +"%Y-%m-%d %T") 
		echo "$NOW move agent files to screen" >> $LOGFILE

		for file in $files
		do
			mkdir "$IINROOTPATH/screen/" 
			mv "$IINROOTPATH/agent/$file" "$IINROOTPATH/screen/agent-$file"
			NOW=$(date +"%Y-%m-%d %T") 
			echo "$NOW move files to screen" >> $LOGFILE
		done

		files=$(ls "$IINROOTPATH/client/" | grep mkv)

		NOW=$(date +"%Y-%m-%d %T") 
		echo "$NOW move client files to screen" >> $LOGFILE

		for file in $files
		do
			mkdir "$IINROOTPATH/screen/" 
			mv "$IINROOTPATH/client/$file" "$IINROOTPATH/screen/client-$file"
			NOW=$(date +"%Y-%m-%d %T") 
			echo "$NOW move files to screen" >> $LOGFILE
		done
	else
		echo "Empty"
	fi
done

NOW=$(date +"%Y-%m-%d %T") 
echo "$NOW ------------------------ Merging ended -------------------------- " >> $LOGFILE