// fecher.js should take two command line arguments:

// a URL
// a local file path
// and downloads the resources at the remote url to the local path
// upon completion, should print out a message about
// downloaded quantity to location.


// There are two operations in this problem which will take an unknown amount of time:

// You need to make an http request and wait for the
// response.
// After the http request is complete, you need to take
//  the data you receive and write it to a file in your local filesystem.

// What if local file already exists?
// Inform is invalid
// Inform if path is invalide
// Inform if url is invalid
const usableargs = process.argv.slice(2);
const fs = require('fs');


// pos0 is https

// pos1 is path


const request = require('request');

request(usableargs[0], (error, response, body) => {
  if (error !== null) {
    console.log('url not found');
    return;
  }
  // console.log('error:', error); // Print the error if one occurred
  // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  
  // console.log('body:', body); // Print the HTML for the Google homepage.
  fs.readFile(
    usableargs[1],
    'utf8' ,
    (err, data) => {
      if (data !== undefined) {
        if (data.length > 0) {
          console.log('the file already exists');
          return;
        }
      }
    }
  );
  fs.writeFile(usableargs[1], body, err => {
    if (err) {
      if (err.code === 'ENOTDIR') {
        console.log('input path not found');
        return;
      }
      console.error(err);
      return;
    }
    //file written successfully
    console.log('file write success');
    let stats = fs.statSync(usableargs[1]);
    console.log(`Downloaded and saved ${stats.size} bytes to ${usableargs[1]}`);

  });
});

