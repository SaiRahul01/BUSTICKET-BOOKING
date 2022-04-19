const exp = require('express')
const mysql = require('mysql')
const bp = require('body-parser')
const cors = require('cors')
const session = require('express-session')
const cp = require('cookie-parser')

const { toast } = require('react-toastify')
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
    const bpincode = req.body.pincode
    const bstreetname = req.body.streetname
    const bhouseno = req.body.houseno
    const bgender = req.body.gender







    db.query("INSERT INTO users(name,email,password,mobilenumber,houseno,age,streetname,city,pincode,gender) VALUES(?,?,?,?,?,?,?,?,?,? )", [bname, bemail, bpassword, bmobilenumber, bhouseno, bage, bstreetname, bcity, bpincode, bgender], (err, results) => {
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


app.post('/loginuser', (req, res) => {
    const bemail = req.body.username
    const bpassword = req.body.password

    db.query("SELECT email,password FROM users WHERE email = ? AND password = ?", [bemail, bpassword],
        (err, result) => {
            if (err) {
                res.send({ err: err });
            }

            if (result.length > 0) {
                req.session.user = result
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
    db.query("INSERT INTO bus(busname,capacity,fromcity,tocity,busdriver) VALUES(?,?,?,?,?)", [busname, capacity, fromstation, tostation, driver], (err, result) => {
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
            console.log(err);
            res.send({ err: err })
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

app.post('/admin/updatebus', (req, res) => {
    const name = req.body.name
    const fstation = req.body.fstation
    const tstation = req.body.tstation
    const cap = req.body.cap
    const id = req.body.id
    const driver = req.body.busdriver
    db.query("UPDATE bus SET busname=?,fromcity=?,tocity=?,capacity=?,busdriver=? where busid=?", [name, fstation, tstation, cap, driver, id], (err, result) => {
        if (err) {
            console.log(err);
        }
        else {
            res.send({ ff: 's' })
        }
    })
})


app.listen(3001, () => {
    console.log("Server is Running !");
})