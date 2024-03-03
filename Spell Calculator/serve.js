const http = require("http");
const url = require("url");
const fs = require("fs");
const path = require("path");

const hostname = "127.0.0.1";
const port = 8080;

console.log(`Server running at http://${hostname}:${port}/`); // allows easier copy-pasting

http.createServer((req, res) => {
   if (url.parse(req.url, true).pathname == '/exit') {
      process.exit();
   }
   if (url.parse(req.url, true).pathname == '/') {
      req.url = '/dnd_calculator.html';
   }

   var q = url.parse(req.url, true);
   var filename = "." + q.pathname;
   var content_type = "text/" + filename.split(".")[2];
   // console.log(content_type); // this is cuz I wanted to see if this would work, it did, mystery solved

   fs.readFile(filename, function (err, data) {
      if (err) {
         res.writeHead(404, {'Content-Type': 'text/html'});
         return res.end(`404 resource ${filename} not found`);
      }
      res.writeHead(200, {'Content-Type': content_type});
      res.write(data);
      return res.end();
   });
}).listen(port);