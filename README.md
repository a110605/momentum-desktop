# Momentum-Desktop
Tool for setting the momentum chrome extension background as the wallpaper for your desktop.

It also download the wallpaper into /momentum-desktop/images

Compatible with Windows, macOS, and Linux.

## Prerequisite
Install the free `Momentum` chrome extension from the [chrome web store](https://chrome.google.com/webstore/detail/momentum/laookkfknpbbblfpciffpaejjkokdgca?hl=en).

Setup nodejs ruuning environment (on MacOS X)
```
$ [sudo] brew install node
```

### Quick Start
Installing the dependencies by using `npm install`
```
$ git clone https://github.com/a110605/momentum-desktop
$ cd momentum-desktop
$ npm install
```

### Running it once
Simply run:
```
$ [sudo] npm start
```
This will download current momentum background image and change to your desktop wallpaper.

### Running it automatically daily
First install the [forever](https://github.com/foreverjs/forever) CLI tool:
```
$ [sudo] npm install forever -g
```
Then, run:
```
$ forever start app.js
```
This will download and change your desktop wallpaper, as well as schedule `momentum-desktop` to automatically change your wallpaper at every morning (0:00). If your computer is sleeping at that time, the program will run the next time your computer is booted up.

To stop the app.js, first find the pid by using `$ forever list`, then run:
```
$ forever stop [pid]
```
