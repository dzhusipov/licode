#!/bin/bash

#enter in to path
cd /var/www/html/rec

#creating log
LOGFILEPATH=''
LOFGILE='sender.log'
STARTDATE=$(date)
echo ' ------------------------ Process started ------------------------ ' >> $LOFGILE 
echo "$STARTDATE" >> $LOFGILE

#get file names
files=$(ls | grep nfo)
file1=''
file2=''

for file in $files
do
	#count ready words
	isready=$(grep -o -c finished $file)
	echo '	get finished files...' >> $LOFGILE
	if [[ $isready = "2" ]] 

	then 
		echo "	Processing $file" >> $LOFGILE	
		#processing files by sendint to filenet
		increment=0
		
		cat $file | while read line
		do
			((increment++))
			iin=${file:0:${#file} - 3}
			echo "	find iin is: $iin" >> $LOFGILE	
			if [[ $increment = "1" ]]
			then 
				file1=$(echo $line | awk {'print $4'})
				echo "	sending first file : $file1" >> $LOFGILE	
				echo "  Send result of first file: " & curl -F "File=@$file1" -F "DocumentType=VEREF" -H "Role:Client" -H "IIN:$iin" -H "Content-Type:multipart/form-data" --request POST http://192.168.15.3:9082/ecmapi/json/documents?DocumentType=VEREF  >> $LOFGILE
				#echo "	Send result of first file: $RESULTOFREST" >> $LOFGILE
			fi
			if [[ $increment = "2" ]]
			then 
				file2=$(echo $line | awk {'print $4'})
				echo "	sending second one : $file2" >> $LOFGILE
				echo "  Send result of second file: " & curl -F "File=@$file2" -F "DocumentType=VEREF" -H "Role:Client" -H "IIN:$iin" -H "Content-Type:multipart/form-data" --request POST http://192.168.15.3:9082/ecmapi/json/documents?DocumentType=VEREF >> $LOFGILE
				#echo "	Send result of second file: $RESULTOFREST" >> $LOFGILE
			fi
		 	#echo $increment
		 	#echo $line
		done
		#delete files
		echo "	Remooving files $file1 $file2 $file" >> $LOFGILE
		#rm $file1
		#rm $file2
		#rm $file
		echo "finished" >> $file
	fi
	
done
echo ' ------------------------ Process ended -------------------------- ' >> $LOFGILE