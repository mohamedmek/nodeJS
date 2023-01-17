const http = require("http");
const fs = require("fs");
/*
let httpExample = {
    vvv:"aa",
    createServer : function(fun){
        fun();
    }
}
*/
/*function createServer(fun){

    //wait for http request (string)
    let req = {}
    let res = {}
    fun(req,res)
}*/



function handler(req,res){
    console.log("new request")
    console.log(req.method);
    console.log(req.url);
    //console.log(req.headers);

    const headers = {
        'Content-Type': 'text/html'
    }
   


    if(req.url == "/home"){
        returnFile("home.html",res);
    }else if(req.url == "/test.html"){
        returnFile("test.html",res);
    }else if(req.url == "/index"){
        returnFile("home.html",res);
    }else if(req.url == "/countries"){
        returnFile("countries.html",res);
    }else{
        res.writeHead(404, headers);
        res.write("Page not found");
    }
    
    
}


function returnFile(fileName,res){
    const headers = {
        'Content-Type': 'text/html'
    }
    res.writeHead(200, headers);

    fs.readFile("./"+fileName,function(err,data){
        res.write(data);
        res.end();
    })
}



const server = http.createServer(handler);

server.listen(8080)
//console.log("hi");

console.log(__dirname)