#!/usr/local/bin/node
'use strict';

var sleep = require('system-sleep');
var fs = require('fs.promised');
var os = require('os');
var rp = require('request-promise');
var Promise = require('bluebird');
var rimraf = Promise.promisify(require('rimraf'));
var sqlite3 = Promise.promisifyAll(require('sqlite3').verbose());
var wallpaper = require('wallpaper');

// Get the correct Momentum image based on the os platform
var platform = os.platform();
var localStorageFile = os.homedir();
if (platform === 'darwin') {
  localStorageFile += '/Library/Application Support/Google/Chrome/Default/Local Storage/';
} else if (platform === 'win32') {
  localStorageFile += '\\AppData\\Local\\Google\\Chrome\\User Data\\Default\\Local Storage\\';
} else if (platform === 'linux') {
  localStorageFile += '/.config/google-chrome/Default/Local Storage/';
}
localStorageFile += 'chrome-extension_laookkfknpbbblfpciffpaejjkokdgca_0.localstorage';

/**
 * Main function that changes the desktop background
 */
function start() {
  var localStorage = new sqlite3.Database(localStorageFile);
  var table = 'ItemTable';
  var key = `momentum-background-${getTodayDate()}`;
  var value = 'value';
  var selectQuery = `SELECT ${value} FROM ${table} where key="${key}"`;
  var imageName = `images/image-${getTodayDate()}.jpeg`;
  console.log("Query momentum sqlite database.");
 
 return localStorage.allAsync(selectQuery)
    .then(res => {
      var backgroundInfo = res[0].value.toString('utf16le');
      var background = JSON.parse(backgroundInfo);
      return background.filename;
    })
    .then(filename => {
      console.log("Downloading image from momentum database, Please wait...");
      return rp({
        uri: filename,
        encoding: 'binary'
      });
    })
    .then(image => {
      console.log('Write image file to ' + process.cwd() +'/'+ `${imageName}`);
      return fs.writeFile(imageName, image, 'binary');
    })
    .then(() => {
      sleep(2000);
      console.log("\nSetup wallpaper.");
      return wallpaper.set(imageName);
    })
    .then(() => {
      console.log('Desktop background has changed!');
    });
}

/**
 * Get today's date in the format of YYYY-MM-DD
 * @returns String
 */
function getTodayDate() {
  var d = new Date();
  var year = d.getFullYear();
  var month = d.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  var date = d.getDate();
  date = date < 10 ? `0${date}` : date;
  return `${year}-${month}-${date}`;
}

//main function
start();
