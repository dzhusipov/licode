#!/bin/bash
#show logo
#cat logo.dat
#enter in directory
ROOTPATH="/var/www/html/rec/"
cd $ROOT_PATH

#log file settings
DATENOWIS=$(date +"%Y-%m-%d")
LOGNAME="-sender.log"
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

	if [ ! -f "$IINROOTPATH/$folder.nfo" ]; then
		NOW=$(date +"%Y-%m-%d %T") 
		echo "$NOW $IINROOTPATH not finished" >> $LOGFILE
    	continue
	fi

	NOW=$(date +"%Y-%m-%d %T") 
	echo "$NOW Path is $IINROOTPATH" >> $LOGFILE
	IIN=$folder
	#check is empty folder
	if [ "$(ls -A $IINROOTPATH)" ];	then

		#for each file get analog of client video
		files=$(ls "$IINROOTPATH/" | grep mkv)

		for file in $files
		do
			NOW=$(date +"%Y-%m-%d %T") 
			echo "$NOW File is $file" >> $LOGFILE
			RESULTOFREST=`curl -F "File=@$file" -F "DocumentType=VEREF" -H "Role:Client" -H "IIN:$IIN" -H "Content-Type:multipart/form-data" --request POST http://192.168.15.3:9082/ecmapi/json/documents?DocumentType=VEREF`
			
			if [ -z "$RESULTOFREST" ]; then
			    NOW=$(date +"%Y-%m-%d %T")
				echo "$NOW finale file : $file Send result: Response is empty. Something wrong" >> $LOGFILE
			else
				IFS='}' read -r -a array <<< "$RESULTOFREST" ;
				IFS='{' read -r -a array <<< "${array[0]}"; 

				if [ -z "${array[1]}" ]; then
					NOW=$(date +"%Y-%m-%d %T")
					echo "$NOW finale file : $file Send result: can't find id in response. $RESULTOFREST" >> $LOGFILE
				else

					if [ -z "${array[2]}" ]; then
						NOW=$(date +"%Y-%m-%d %T")
						echo "$NOW finale file : $file Send result: id is empty. $RESULTOFREST" >> $LOGFILE
					else
						NOW=$(date +"%Y-%m-%d %T")
						echo "$NOW finale file : $file Send result: document id - ${array[2]}" >> $LOGFILE
						mkdir "$IINROOTPATH/sent/"
						mv "$IINROOTPATH/$file" "$IINROOTPATH/sent/sent-$file"
					fi
					
				fi
				
			fi
			
		done
	else
		NOW=$(date +"%Y-%m-%d %T")
		echo "$NOW Folder is epmty. Nothing to send" >> $LOGFILE
	fi
done

NOW=$(date +"%Y-%m-%d %T") 
echo "$NOW ------------------------ Sending ended -------------------------- " >> $LOGFILE