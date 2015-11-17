#!/bin/bash

#enter in to path
cd /var/www/html/rec

#get file names
files=$(ls | grep nfo)

for file in $files
do
	#count ready words
	isready=$(grep -o -c ready $file)

	if [[ $isready = "2" ]] 
		then echo "Processing $file"
		
		#processing files by sendint to filenet
		increment=0
		cat $file | while read line
		do
			((increment++))
			if [[ $isready = "1" ]]
			then
			fi

		 	#echo $increment
		 	#echo $line
		done

	fi
	
done