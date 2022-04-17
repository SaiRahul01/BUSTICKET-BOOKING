const exp=require('express')
const mysql=require('mysql')
const bp=require('body-parser')
const cors=require('cors')
const { toast } = require('react-toastify')
const app=exp()
app.use(cors())
app.use(exp.json())
const db=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"password",
    database:"dbms",
    multipleStatements:true

})
app.use(bp.urlencoded({
    extended: false
 }));




app.post('/registeruser',(req,res)=>{
    const bname=req.body.name
    const bemail=req.body.email
    const bpassword=req.body.password
    const bmobilenumber=req.body.mobilenumber 
    const bage=req.body.age
    const bcity=req.body.city 
    const bpincode=req.body.pincode 
    const bstreetname=req.body.streetname 
    const bhouseno=req.body.houseno 
    const bgender=req.body.gender
    
    
    // db.query("SELECT * FROM project WHERE email=?"[bemail],(err,resp)=>{
    //     if(err)
    //     {
    //         console.log("Error bro");
    //         console.log(err);
            
    //         return;
    //     }
    //     if(resp)
    //     {
           
    //         res.send({message:"Wrong"})
    //         return;
    //     }
    // })




    db.query("INSERT INTO users(name,email,password,mobilenumber,houseno,age,streetname,city,pincode,gender) VALUES(?,?,?,?,?,?,?,?,?,? )",[bname,bemail,bpassword,bmobilenumber,bhouseno,bage,bstreetname,bcity,bpincode,bgender],(err,results)=>{
        if(err)
        {   
            console.log(err);
            res.send({op:'ded'})

        }
           
        else 
        {
            res.send("Done")
            console.log("Added to Database!");
        }
           
         



    })

})


app.post('/loginuser', (req,res) =>{
    const bemail=req.body.username
    const bpassword=req.body.password

    db.query("SELECT email,password FROM users WHERE email = ? AND password = ?", [bemail,bpassword],
    (err, result) => {
        if (err) {
            res.send({ err: err });
        }

        if (result.length > 0) {
            res.send(result);
        } else {
            res.send({ message: "Wrong username/password combination"});
        }

    }

    )
})

app.post('/addbus',(req,res)=>{
    const busname=req.body.busname
    const fromstation=req.body.fromstation
    const tostation=req.body.tostation
    const capacity=req.body.capacity
    const driver=req.body.driver
    db.query("INSERT INTO bus(busname,capacity,fromcity,tocity,busdriver) VALUES(?,?,?,?,?)",[busname,capacity,fromstation,tostation,driver],(err,result)=>{
        if(err)
        {
            console.log(err);
            res.send({op:'fail'})
        }
        else
        {
           
            res.send({op:'gg'})
            console.log("Added Bus Successfully");
        }
    })


})

app.delete("/admin/deletebus/:id",(req,res)=>{
    const id=req.params.id
    db.query("DELETE FROM bus where busid=?",[id],(err,result)=>{
        if(err)
        {
            console.log(err);
            res.send({err:err})
        }
        else
        {
            res.send(result)
        }
    })
})

app.get('/admin/showbuses',(req,res)=>{
    db.query("SELECT * FROM bus",(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    })
})
app.get('/admin/showusers',(req,res)=>{
    db.query("SELECT * FROM users",(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result);
        }
    })
})

app.post('/admin/updatebus',(req,res)=>{
    const name=req.body.name
    const fstation=req.body.fstation 
    const tstation=req.body.tstation 
    const cap=req.body.cap
    const id=req.body.id
    const driver=req.body.busdriver
    db.query("UPDATE bus SET busname=?,fromcity=?,tocity=?,capacity=?,busdriver=? where busid=?",[name,fstation,tstation,cap,driver,id],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send({ff:'s'})
        }
    })
})


app.listen(3001,()=>{
    console.log("Ded");
})