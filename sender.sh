#!/bin/bash
#enter in to path
cd /var/www/html/rec

#creating log
LOGFILEPATH=''
LOFGILE='sender.log'
NOW=$(date +"%m-%d-%Y %T") 
echo "$NOW ------------------------ Process started ------------------------ " >> $LOFGILE

#get file names
files=$(ls | grep nfo)
file1=''
file2=''

for file in $files
do
	#count ready words
	isready=$(grep -o -c finished $file)
	if [[ $isready = "2" ]] 

	then 
		NOW=$(date +"%m-%d-%Y %T")
		echo "$NOW	Processing $file" >> $LOFGILE	
		#processing files by sendint to filenet
		increment=0
		
		cat $file | while read line
		do
			((increment++))
			iin=${file:0:${#file} - 4}
			#echo "	finded iin is: $iin" >> $LOFGILE	
			if [[ $increment = "1" ]]
			then 
				file1=$(echo $line | tr -d '\r'| awk {'printf $4'})
				RESULTOFREST=`curl -F "File=@$file1" -F "DocumentType=VEREF" -H "Role:Client" -H "IIN:$iin" -H "Content-Type:multipart/form-data" --request POST http://192.168.15.3:9082/ecmapi/json/documents?DocumentType=VEREF`
				NOW=$(date +"%m-%d-%Y %T")
				echo "$NOW file : $file1	Send result: $RESULTOFREST" >> $LOFGILE
			fi
			if [[ $increment = "2" ]]
			then 
				RESULTOFREST=`curl -F "File=@$file2" -F "DocumentType=VEREF" -H "Role:Client" -H "IIN:$iin" -H "Content-Type:multipart/form-data" --request POST http://192.168.15.3:9082/ecmapi/json/documents?DocumentType=VEREF`
				NOW=$(date +"%m-%d-%Y %T")
				echo "$NOW file : $file2	Send result: $RESULTOFREST" >> $LOFGILE
			fi
		 	#echo $increment
		 	#echo $line
		done
		#delete files
		NOW=$(date +"%m-%d-%Y %T")
		echo "$NOW	Remooving files $file1 $file2 $file" >> $LOFGILE
		#rm $file1
		#rm $file2
		#rm $file
		
		
	fi
done
NOW=$(date +"%m-%d-%Y %T")
echo "$NOW ------------------------ Process ended -------------------------- " >> $LOFGILE