#!/bin/bash

PWD=`pwd` 

echo "cd $PWD" > wallpaper
echo "npm start" >> wallpaper
sudo chmod +x wallpaper
cp wallpaper /usr/local/bin

if [ ! -f /usr/local/bin/wallpaper ]; then
	echo "Create wallpaper command fail !\nPlease copy wallpaper to /usr/local/bin/"
else
	echo "Success build wallpaper command. Enjoy it!"
fi

