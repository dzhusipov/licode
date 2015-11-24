#!/bin/bash

# Licode was cloned under /var/lib in our case
#cd /home/dasm/git
# This kills all the node.js services running.  BEWARE of this command
# if you have other node services running
killall node

./licode/scripts/initLicode.sh #> licode.log
./licode/scripts/initBasicExample.sh #> licode_basic.log

exit 0
