var db=require('mysql')
var exp=require('express')
var bp=require('body-parser')
var ec=bp.urlencoded();

const app=exp();
var con = db.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database:'tutorial'
  });
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
 

 
  });
// app.get('/',function (req,res){
//     res.sendFile(__dirname+'/idx.html')

// })

app.post("/signup",ec,function(req,res){
    var un=req.body.username;
    var em=req.body.email;
    var mnum=req.body.mobilenumber;
    var addr=req.body.address;
    var pwd=req.body.pass;
    con.query("insert into dbms values(?,?,?,?,?)",[un,em,pwd,mnum,addr],function(error,resp,fields){
        if(error)
        {
            console.log("ded");
        }
        res.redirect("/welcome")
    })
})

app.get("/welcome",function(req,res){
    res.sendFile(__dirname+'/welcome.html')
})


app.listen(3000);