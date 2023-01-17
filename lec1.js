//const { fstat } = require("fs");

const http = require("http");
const fs = require("fs");
//const { url } = require("inspector");


const server =  http.createServer(
    function(req,res){
        console.log("new request");
        console.log(req.url);
        console.log(req.method);
        // console.log(req.headers);
        
        if(req.url == "/" || req.url == "/home"){
            returnFile("home.html",res)
        }

        if(req.url == "/form"){
            returnFile("form.html",res)
            
        }
        // res.end('<html><h1>Hello HTML</h1></html>')
        //res.end()

    }
)

function returnFile(fileName,res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile("./"+fileName ,function(err,data){
        res.write(data);
        res.end();
    })
}
server.listen(8080)
