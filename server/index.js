const exp = require('express')
const mysql = require('mysql')
const bp = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const cp = require('cookie-parser')
const path = require('path')
const shortid = require('shortid')
const Razorpay = require('razorpay')
const { toast } = require('react-toastify')
const stripe=require("stripe")("sk_test_51KtZSVSE0gT3DMfQuv9tIKcxlJ2S6eqx5NCWaMkaN9fRGLnxEK4uG0k08tlzplOwyGXkWxtAYwOFfWyo6oD3VvGU00cfeQoiLl")
const bcrypt = require('bcrypt')
const saltRounds = 10
const app = exp()
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,



}))

app.use(cp())
app.use(bp.urlencoded({
    extended: true
}));
app.use(bp.json())

const razorpay = new Razorpay({
	key_id: 'rzp_test_X0nS2mGRlwEDeC',
	key_secret: 'VbWTa1TshzzabQLnaVxRX1Lr'
})

app.use(session({
    // secret:'key that signs',

    key: "USERID",
    secret: "SUBSCRIBE",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60
    }


}))

app.use(exp.json())
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "dbms",
    multipleStatements: true

})





app.post('/registeruser', (req, res) => {
    const bname = req.body.name
    const bemail = req.body.email
    const bpassword = req.body.password
    const bmobilenumber = req.body.mobilenumber
    const bage = req.body.age
    const bcity = req.body.city
    const maxuser=req.body.maxuser+1

    const bstreetname = req.body.streetname
    const bhouseno = req.body.houseno
    const bgender = req.body.gender



   bcrypt.hash(bpassword,saltRounds, (err, hash) => {

    if (err) {
        console.log(err)
    }
    db.query("INSERT INTO users(id,name,email,password,mobilenumber,houseno,age,streetname,city,gender) VALUES(?,?,?,?,?,?,?,?,?,? )", [maxuser,bname, bemail, hash, bmobilenumber, bhouseno, bage, bstreetname, bcity, bgender], (err, results) => {
        if (err) {
            console.log(err);
            res.send({ op: 'ded' })

        }

        else {
            res.send("Done")
            console.log("Added to Database!");
        }





    })

   })



    

})
app.post('/user/checkbuses',(req,res)=>{
    const tdate=req.body.tdate;
    const fromcity=req.body.fromcity;
    const tocity=req.body.tocity;
    db.query("SELECT *,seatsleft FROM bus,bus_status where fromcity=? and tocity=? and bus.busid=bus_status.bussid and bus_status.tdate=? and bus_status.seatsleft>0",[fromcity,tocity,tdate],(err,results)=>{
        if(err)
        {
            console.log(err);
            res.send({f:false})
        }
        else
        {
            console.log("Result:->"+results);
            res.send(results)
        }

    })
})

app.post('/user/decreaseseats',(req,res)=>{
    const busid=req.body.busid;
    const tdate=req.body.tdate;
    const noofseats=req.body.noofseats;
    db.query("UPDATE bus_status set seatsleft=seatsleft-? where bussid=? and tdate=?",[noofseats,busid,tdate],(err,results)=>{
        if(err)
        
        {
            console.log(err);
        }
        else
        {
            res.send(results);
        }
    })
})

app.post('/user/getleftseats',(req,res)=>{
    const busid=req.body.busid;
    const tdate=req.body.tdate;
    db.query("SELECT * FROM bus_status where bussid=? and tdate=?",[busid,tdate],(err,results)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(results)
        }
    })
})

app.post('/user/confirmticket',(req,res)=>{
    const busid=req.body.busid;
    const totalcost=req.body.totalcost;
    const noofseats=req.body.noofseats;
    const tdate=req.body.tdate;
    const ue=req.body.uid
    db.query("INSERT INTO ticket(dateofjrny,price,noofseats,bus_id,user_id) values(?,?,?,?,?)",[tdate,totalcost,noofseats,busid,ue],(err,results)=>{
        if(err)

        {
            console.log(err);
        }
        else
        {
            res.send({f:"s"})
        }
    })
})

app.post('/loginuser', (req, res) => {
    const bemail = req.body.username
    const bpassword = req.body.password

    db.query("SELECT email,password FROM users WHERE email = ? ", bemail,
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                bcrypt.compare(bpassword, result[0].password, (error, response) => {
                    if (response) {
                        res.send(result);
                        req.session.user = result
                        console.log(req.session.user);
                    } else {
                        res.send ({message: "Wrong username/password combination"})
                    }
                })
                
                // res.send(result);

            } else {
                res.send({ message: "User doesn't exist" });
            }

        }

    )
})
app.get('/getmaxuserr',(req,res)=>{
    db.query("SELECT MAX(id) as f from users",(err,results)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(results)
        }
    })
})

app.post('/loginadmin', (req, res) => {
    const bemail = req.body.username
    const bpassword = req.body.password

    db.query("SELECT email,password FROM admin WHERE email = ? AND password = ?", [bemail, bpassword],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                // req.session.user = result`
                console.log(req.session.user);
                res.send(result);
            } else {
                res.send({ message: "Wrong username/password combination" });
            }

        }

    )
})
app.post('/getuserdetails',(req,res)=>{
    const mail=req.body.useremail

    db.query("SELECT * FROM users where email=? ",[mail],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result);
            res.send(result)
        }
    })
})
app.post('/getadmindetails',(req,res)=>{
    const mail=req.body.adminemail

    db.query("SELECT * FROM admin where email=? ",[mail],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log(result);
            res.send(result)
        }
    })
})
app.post("/getbookings",(req,res)=>{
    
    const useremail=req.body.useremail;
    db.query("SELECT * FROM ticket,users,bus,driver where bus.busid=ticket.bus_id and bus.busdriver=driver.drivername and  users.id=ticket.user_id and  email=?",[useremail],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result)
        }
    })
})

app.get("/loginchk", (req, res) => {
    if (req.session.user) {
        res.send({ loggedin: true, user: req.session.user })
    }
    else {
        res.send({ loggedin: false })
    }
})


app.post('/addbus', (req, res) => {
    const busname = req.body.busname
    const fromstation = req.body.fromstation
    const tostation = req.body.tostation
    const capacity = req.body.capacity
    const driver = req.body.driver
    const starttime=req.body.starttime
    const reachtime=req.body.reachtime
    const ticketprice=req.body.ticketprice
    const type=req.body.type
    const maxi=req.body.busid
    db.query("INSERT INTO bus(busid,busname,capacity,fromcity,tocity,busdriver,starttime,reachtime,ticketprice,type) VALUES(?,?,?,?,?,?,?,?,?,?)", [maxi,busname, capacity, fromstation, tostation, driver,starttime,reachtime,ticketprice,type], (err, result) => {
        if (err) {
            console.log(err);
            res.send({ op: 'fail' })
        }
        else {

            res.send({ op: 'gg' })
            console.log("Added Bus Successfully");
        }
    })


})

app.delete("/admin/deletebus/:id", (req, res) => {
    const id = req.params.id
    db.query("DELETE FROM bus where busid=?", [id], (err, result) => {
        if (err) {
            // console.log(err);
            res.send({f:'a'})
        }
        else {
            res.send(result)
        }
        
    })
})

app.get('/admin/showbuses', (req, res) => {
    db.query("SELECT * FROM bus", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})

app.get('/admin/showdrivers',(req,res)=>{
    db.query("SELECT * from driver",(err,results)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(results)
        }
    })
})

// app.post('/addbusstatus',(req,res)=>{
//     const busid=req.body.busid;
//     const capacity=req.body.capacity;
//     const datee=req.body.datt;
//     console.log("Date at Backend: "+datee);
//     db.query("INSERT INTO bus_status(tdate,seatsleft,bussid) values(?,?,?)",[datee,capacity,busid],(err,results)=>{
//         if(err)
//         {
//             console.log(err);
//             console.log("Date fetched: "+datee);
//         }
//         else
//         {
//             res.send(results);
//         }
//     })
// })



app.get('/admin/showusers', (req, res) => {
    db.query("SELECT * FROM users", (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send(result);
        }
    })
})
app.post('/getbusid',(req,res)=>{
    const busname=req.body.busname
    db.query("select * from bus where busname=?",[busname],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Busname:"+busname);
            console.log(result);
            res.send(result)
        }
    })
})
app.post('/bus_admin',(req,res)=>{
    const a=req.body.busid;
    const b=req.body.adminemail;
    db.query("INSERT INTO bus_admin values(?,?)",[a,b],(err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(result)
        }
    })
})
app.post('/deletebus',(req,res)=>{
    const idtodelete=req.body.id
    db.query("DELETE FROM bus where busid=?",[idtodelete],(err,results)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send({f:"success"})
        }
    })
})
app.post('/admin/updatebus', (req, res) => {
    const name = req.body.name
    const fstation = req.body.fstation
    const tstation = req.body.tstation
    const cap = req.body.cap
    const id = req.body.id
    const driver = req.body.busdriver
    const starttime=req.body.starttime
    const reachtime=req.body.reachtime
    const ticketprice=req.body.ticketprice
    db.query("UPDATE bus SET busname=?,fromcity=?,tocity=?,capacity=?,busdriver=?,starttime=?,reachtime=?,ticketprice=? where busid=?", [name, fstation, tstation, cap, driver,starttime,reachtime, ticketprice,id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ ff: 's' })
        }
    })
})

app.post('/razorpay', async (req, res) => {
	const payment_capture = 1
	const amount = req.body.totalcost
    console.log("amount"+amount);
	const currency = 'INR'

	const options = {
		amount: amount * 100,
		currency,
		receipt: shortid.generate(),
		payment_capture
	}

	try {
		const response = await razorpay.orders.create(options)
		console.log(response)
		res.json({
			id: response.id,
			currency: response.currency,
			amount: response.amount
		})
	} catch (error) {
		console.log(error)
	}
})

app.get('/logo.svg', (req, res) => {
	res.sendFile(path.join(__dirname, 'logo.svg'))
})

app.post('/checkout',(req,res)=>{
    console.log(req.body);
    res.send({status:200})
})
// app.get('/user/getbusids',(req,res)=>{
//     db.query("SELECT busid from bus where busid>0",(err,results)=>{
//         if(err)
//         {
//             console.log("B"+err);
//         }
//         else
//         {
//             res.send(results)
//         }
//     })
// })
// app.post('/user/addifnot',(req,res)=>{
//     const arr=req.body.arr;
//     const tdate=req.body.tdate
//     for(var x=0;x<arr.length;x++)
//     {
//         const idd=parseInt(arr[x]);
//         db.query("INSERT INTO bus_status(tdate,seatsleft,bussid) values(?,?,?)",[tdate,40,idd],(err,results)=>{
//             if(err)
//             {
//                 console.log("A:"+err);
//             }

//             else
//             {
//                 res.send(results)
//             }
//         })
//     }
// })
app.get('/getmaxi',(req,res)=>{
    db.query("SELECT MAX(busid) as f from bus",(err,results)=>{
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.send(results)
        }
    })
})
app.listen(3001, () => {
    console.log("Server is Running !");
})