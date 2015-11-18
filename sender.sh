#!/bin/bash

#enter in to path
cd /var/www/html/rec

#creating log
LOFGILE='sender.log'

echo ' ------------------------ Process started ------------------------ ' >> $LOFGILE 
echo date >> $LOFGILE

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
				echo "	try send first file : $file1" >> $LOFGILE	
				RESULTOFREST=$(curl -F "File=@$file1" -F "DocumentType=VEREF" -H "Role:Client" -H "IIN:$iin" -H "Content-Type:multipart/form-data" --request POST http://192.168.15.3:9082/ecmapi/json/documents?DocumentType=VEREF)
				echo "	Send result of first file: $RESULTOFREST" >> $LOFGILE
			fi
			if [[ $increment = "2" ]]
			then 
				file2=$(echo $line | awk {'print $4'})
				echo "	try send second one : $file2" >> $LOFGILE
				RESULTOFREST=$(curl -F "File=@$file2" -F "DocumentType=VEREF" -H "Role:Client" -H "IIN:$iin" -H "Content-Type:multipart/form-data" --request POST http://192.168.15.3:9082/ecmapi/json/documents?DocumentType=VEREF)
				echo "	Send result of second file: $RESULTOFREST" >> $LOFGILE
			fi
			if [[ $increment = "3" ]]
			then 
				echo "none------------"
			fi
			if [[ $increment = "4" ]]
			then 
				echo "none------------"
			fi
		 	#echo $increment
		 	#echo $line
		done
		#delete files
		echo "removing files $file1 $file2 $file"
		rm $file1
		rm $file2
		rm $file
	fi
	
done
echo "done ................. "
echo ' ------------------------ Process ended ------------------------ ' >> $LOFGILE