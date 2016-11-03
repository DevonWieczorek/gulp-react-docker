var http = require('http');

function handleRequest(request, response){
    response.end('Path Hit: ' + request.url);
}

var server = http.createServer(handleRequest);

server.listen("1234", function(){
    console.log("Server listening on: http://localhost:1234");
});