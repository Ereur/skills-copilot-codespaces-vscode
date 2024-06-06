// Create web server
var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var comments = [];
var server = http.createServer(function(req, res){
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if(pathname == '/'){
        var fileContent = fs.readFileSync('./index.html');
        res.setHeader('Content-Type','text/html');
        res.end(fileContent);
    }else if(pathname == '/getComments'){
        var str = JSON.stringify(comments);
        res.end(str);
    }else if(pathname == '/submitComment'){
        var comment = urlObj.query;
        comments.push(comment);
        res.end(JSON.stringify(comment));
    }else{
        var fileContent = fs.readFileSync('.'+pathname);
        res.end(fileContent);
    }
});
server.listen(8080, function(){
    console.log('server is listening on 8080');
});
