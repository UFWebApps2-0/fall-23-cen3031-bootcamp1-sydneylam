var http = require('http'), 
    fs = require('fs'), 
    url = require('url'),
    port = 8080;

/* Global variables */
var listingData, server;

var requestHandler = function(request, response) {
    console.log('Server running.');

  console.log(request);
  var parsedUrl = url.parse(request.url);

  if (request.method === 'GET' && parsedUrl.pathname === '/listings') {
      response.setHeader('Content-Type', 'application/json');
      response.writeHead(200);
      response.end(JSON.stringify(listingData));

  } else {
    response.writeHead(404);
    response.end('Bad gateway error');
  }  

};

fs.readFile('listings.json', 'utf8', function(err, data) {

  require('fs').readFile('./listings.json', 'utf8', function (err, data) { 
    if (err) throw err;
    listingData = JSON.parse(data); 
  });
  

  //Creates the server
  server = http.createServer(requestHandler);
  
  //Start the server
  server.listen(port, function() {
  //once the server is listening, this callback function is executed
  console.log('Server listening on: http://127.0.0.1:' + port);
  });

});