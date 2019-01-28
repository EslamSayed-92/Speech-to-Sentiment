const Sentiment = require('sentiment');
const http = require('http');
const util = require('util');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // util.log('Request recieved: \nmethod: ' + req.method + '\nurl: ' + req.url); // this line logs just the method and url

  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.01:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  let data = "";
  let result = {};
  let sentiment = new Sentiment();

  res.writeHead(200, { 
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*' // implementation of CORS
    });  
  req.on('data', chunk=> {
  	data += chunk;
  });
  req.on('end', ()=>{
  	result = sentiment.analyze(decodeURI(data));
  	util.log(result);
  });
  res.end(JSON.stringify(data));
  
});

server.listen(port, hostname, () => {
  util.log(`Server running at http://${hostname}:${port}/`);
});