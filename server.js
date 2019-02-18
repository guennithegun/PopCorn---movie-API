// import the modules http, url and fs
let http = require('http'),
    fs = require('fs'),
    url = require('url');
// using http module to create server and use url and fs inside it
http.createServer((request, response) => {
  var addr = request.url,                   // url
      q = url.parse(addr, true),            // parse url
      filePath = '',                        // empty variable for pathname
      timeStamp = new Date();               // timestamp to print in log.txt

  if (q.pathname == 'documentation') {      // if condition to check if pathname includes "documentation" or not
    filePath = q.pathname;
  } else {
    filePath = 'index.html'
  }

  // writing the URL an Timestamp of the rewuest into log.txt
  fs.appendFile('log.txt', `Url: ${addr}\nTime: ${timeStamp}\n\n`, function(err) {
    if (err) {
      console.log(err);
    }
    else {
      console.log('URL and Request-Timestamp added!');
    }
  });

  response.writeHead(200, {'Content-Type': 'text/html'}); // response
  response.end(filePath);
}).listen(8080);
