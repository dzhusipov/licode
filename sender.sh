#!/bin/bash
#set -x
#enter in to path
cd /var/www/html/rec

#creating log
LOGFILEPATH=''
LOFGILE='sender.log'
FFMPEGLOFGILE='ffmpeg.log'
NOW=$(date +"%m-%d-%Y %T") 
echo "$NOW ------------------------ Process started ------------------------ " >> $LOFGILE
#get file names
files=$(ls | grep nfo)

CLIENTFILE="";
AGENTFILE="";

FINALFILE="";
for file in $files
do
	#count ready words
	isready=$(grep -o -c finished $file)
	if [[ $isready = "2" ]] 

	then 
		NOW=$(date +"%m-%d-%Y %T")
		echo "$NOW Processing $file" >> $LOFGILE	
		#processing files by sendint to filenet
		increment=0
		
		cat $file | while read line
		do
			((increment++))
			iin=${file:0:${#file} - 4}
			FINALFILE="$iin.mkv"
			echo "	FINALFILE=$FINALFILE" >> $LOFGILE	
			if [[ $increment = "1" ]]
			then 
				#get role of video
				role=$(echo $line | tr -d '\r'| awk {'printf $1'})
				file1=$(echo $line | tr -d '\r'| awk {'printf $4'})

				if [[ $role = "agent" ]]
				then
					ffmpeg -y -i $file1 -vn -ar 44100 -ac 2 -ab 192 -f mp3 agent_sound.mp3 >> $FFMPEGLOFGILE
					AGENTFILE=$file1
				else
					CLIENTFILE=$file1
				fi
			fi
			if [[ $increment = "2" ]]
			then 
				role=$(echo $line | tr -d '\r'| awk {'printf $1'})
				file2=$(echo  $line | tr -d '\r'| awk {'printf $4'})

				if [[ $role = "client" ]]
				then
					CLIENTFILE=$file2
					echo 'ffmpeg -i agent_sound.mp3 -i "$CLIENTFILE" "$FINALFILE"'
					ffmpeg -i agent_sound.mp3 -i "$CLIENTFILE" "$FINALFILE" >> $FFMPEGLOFGILE
				else
					ffmpeg -y -i $file2 -vn -ar 44100 -ac 2 -ab 192 -f mp3 agent_sound.mp3 >> $FFMPEGLOFGILE
					ffmpeg -i agent_sound.mp3 -i "$CLIENTFILE" "$FINALFILE" >> $FFMPEGLOFGILE
					AGENTFILE=$file2
				fi

				RESULTOFREST=`curl -F "File=@$FINALFILE" -F "DocumentType=VEREF" -H "Role:Client" -H "IIN:$iin" -H "Content-Type:multipart/form-data" --request POST http://192.168.15.3:9082/ecmapi/json/documents?DocumentType=VEREF`
				NOW=$(date +"%m-%d-%Y %T")
				echo "$NOW finile file : $FINALFILE Send result: $RESULTOFREST" >> $LOFGILE
				
			fi
		done

		NOW=$(date +"%m-%d-%Y %T")
		echo "$NOW Removing files $CLIENTFILE $AGENTFILE $FINALFILE agent_sound.mp3" >> $LOFGILE

		echo "finished" >> $file
		echo "$NOW *" >> $LOFGILE
	fi
done