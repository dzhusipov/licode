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

		#for each file get analog of client video
		files=$(ls "$IINROOTPATH/agent/" | grep mkv)

		for file in $files

			if [ ! -f "$IINROOTPATH/client/$file" ]
			then
				mkdir "$IINROOTPATH/screen/" 
			    NOW=$(date +"%Y-%m-%d %T") 
				echo "$NOW moove files to screen" >> $LOGFILE
				mv "$IINROOTPATH/client/$file" "$IINROOTPATH/screen/client-$file"
			else
				#both of files is normal and they are not gay 
				mkdir "$IINROOTPATH/trash/"
				ffmpeg -v quiet -y -i "$IINROOTPATH/agent/$file" -vn -ar 44100 -ac 2 -ab 192 -f mp3 "$IINROOTPATH/$file.mp3" </dev/null
				mv "$IINROOTPATH/agent/$file" "$IINROOTPATH/trash/agent-$file"

				ffmpeg -i "$IINROOTPATH/client/$file" -i "$IINROOTPATH/$file.mp3" -filter_complex "[0:a][1:a]amerge=inputs=2[a]" -map 0:v -map "[a]" -c:v copy -c:a libvorbis -ac 2 -shortest "$IINROOTPATH/$file" </dev/null
				
				mv "$IINROOTPATH/client/$file" "$IINROOTPATH/trash/client-$file"
				mv "$IINROOTPATH/$file.mp3" "$IINROOTPATH/trash/agent-$file.mp3"
			fi
		done
	else
		echo "Empty"
	fi
done

NOW=$(date +"%Y-%m-%d %T") 
echo "$NOW ------------------------ Merging ended -------------------------- " >> $LOGFILE