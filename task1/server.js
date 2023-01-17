const http = require("http");
const fs = require("fs");

const server = http.createServer(
    function(req,res){
        if(req.url == "/" || req.url == "/home" || req.url == "/index.html" ){
            returnFile("index.html",res);
        }
        else if(req.url == "/form" || req.url == "/form.html"){
            returnFile("form.html",res);
        }
        else if(req.url == "/roadmap" || req.url == "/docs/roadmap.html"){
            returnFile("docs/roadmap.html",res);
        }
    }
)

function returnFile(fileName,res)
{
    res.writeHead(200,{'Content-Type': 'text/html'});
    fs.readFile("./"+fileName,function(err,data){
        res.write(data);
        res.end();
    });

}
server.listen(8080)