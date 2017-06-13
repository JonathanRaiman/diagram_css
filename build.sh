#!/bin/bash

# stop script on error and print it
set -e
# inform me of undefined variables
set -u
# handle cascading failures well
set -o pipefail


command_exists () {
    type "$1" &> /dev/null ;
}

if ! command_exists babel ; then
	npm install babel-cli -g
	npm install
fi

if ! command_exists browserify ; then
	npm install browserify
fi

for FILE in `ls | grep .jsx`; do
	echo "BABEL: ${FILE:0:${#FILE}-1}"
	babel --plugins transform-react-jsx --presets es2015 $FILE -o ${FILE:0:${#FILE}-1}.temp.js
	echo "BROWSERIFY: ${FILE:0:${#FILE}-1}"
	browserify ${FILE:0:${#FILE}-1}.temp.js -o build/${FILE:0:${#FILE}-1}
	echo "DONE"
done
