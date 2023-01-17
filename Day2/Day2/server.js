const express = require("express");
const fs = require("fs");
const app = express();

const bodyParser = require("body-parser");
const bodyParserForm = bodyParser.urlencoded();
let settings = {
    IdCounter:1
}
let contacts = []

//display all contacts
app.get("/allcontacts",function(req,res){

    let fcontacts = contacts;
    if(req.query.q){
        fcontacts = contacts.filter(contact=> contact.Name.indexOf(req.query.q)>-1 || contact.Phone.indexOf(req.query.q)>-1)
    }
    let tableBody  = "";
    //convert array of objects to array of strings 
    tableBody = fcontacts.map((item)=>`<tr>
    <td>${item.Id}</td>
    <td>${item.Name}</td>
    <td>${item.Phone}</td>
    <td>
        <a href="/updatecontact?Id=${item.Id}" >Edit</a> 
        <a href="/deletecontact?Id=${item.Id}" >Delete</a>
    </td>
    </tr>`)
    /*
    [
        '<tr><td>Ahmed</td><td>010</td></tr>',
        '<tr><td>Ali</td><td>012</td></tr>',
        '<tr><td>Asmaa</td><td>011</td></tr>'
    ]
    */
    tableBody = tableBody.join("\n");
    /*
<tr><td>Ahmed</td><td>010</td></tr>
<tr><td>Ali</td><td>012</td></tr>
<tr><td>Asmaa</td><td>011</td></tr>
    */
    let html = `
    <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form >
        <input type="text" name="q" value="${req.query.q}" /><input type="submit" value="search"></br>
    </form>
    <table>
        <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Action</th>
        </tr>
        ${tableBody}
    </table>
    <h1>Add contact</h1>
    <form action="/addcontact" method="POST">
        Name:<input type="text" name="Name" /><br/>
        Phone:<input type="text" name="Phone" /><br/>
        <input type="submit" value="add" />
    </form>

    <a href="/addcontact" >add contact</a>
</body>
</html>`


    res.send(html);

})


//add new contact
app.get("/addcontact",function(req,res){
    res.sendFile(__dirname+"/views/addcontact.html");
})

app.post("/addcontact",bodyParserForm,function(req,res){
    req.body.Id = settings.IdCounter++;


    contacts.push(req.body)
    saveDataToFile();
    res.send("<script>location='/allcontacts'</script>");
})

//update contact

app.get("/updatecontact",function(req,res){

    let contact = contacts.find(contact=>contact.Id== req.query.Id);
    let html = `
    <form action="/updatecontact" method="POST">
        <input type="hidden" name="Id" value="${contact.Id}" />
        Name:<input type="text" name="Name" value="${contact.Name}" /><br/>
        Phone:<input type="text" name="Phone" value="${contact.Phone}" /><br/>
        <input type="submit" value="save" />
    </form>
    `;

    res.send(html);
});


app.post("/updatecontact",bodyParserForm,function(req,res){
    //console.log(req.body);

    //find item that match the id in the array
    let contact = contacts.find(contact=>contact.Id==req.body.Id);
    
    //update item with new values
    contact.Name=req.body.Name;
    contact.Phone=req.body.Phone;

    saveDataToFile();
    res.send("<script>location='/allcontacts'</script>");
})

//delete contact
app.get("/deletecontact",function(req,res){
    //console.log(req.body);

    //find item that match the id in the array
    let contactIndex = contacts.findIndex(contact=>contact.Id==req.query.Id);
    contacts.splice(contactIndex,1);
    saveDataToFile();
    res.send("<script>location='/allcontacts'</script>");
})

//saving 
function saveDataToFile(){

    fs.writeFile("contacts.json",JSON.stringify(contacts),function(err){
        if(err)
            console.log(err);
    })

    fs.writeFile("settings.json",JSON.stringify(settings),function(err){
        if(err)
            console.log(err);
    })
}


function loadDataFromFile(){
    fs.readFile("contacts.json",function(err,data){
        if(err){
            console.log(err)
        }else{
            contacts = JSON.parse(data);
        }
    })
    fs.readFile("settings.json",function(err,data){
        if(err){
            console.log(err)
        }else{
            settings = JSON.parse(data);
        }
    })
}


loadDataFromFile();





app.listen(8080);