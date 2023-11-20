const express = require("express")
const app = express();
require("dotenv").config();
require("./connection/connection")
const users = require("./Models/Userauth")
const Custermers = require("./Models/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
var cookieparser = require("cookie-parser");
const authmiddle = require("./Middleware/authmiddleware")



app.use(express.json())
app.use(cookieparser())

app.listen(process.env.PORT, () => {
    console.log(`App is running at port :${process.env.PORT}`)
})




// Register 

app.post("/register", async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) return res.json({ "msg": "All fields are mandatory" });


    const checkexistingUser = await users.findOne({ email });

    if (checkexistingUser) return res.json({ "msg": "User already registered with this email address" })

    else {
        const hashpassword = await bcrypt.hash(password, 15)
        const createuser = await users.create({
            username,
            email,
            password: hashpassword
        })
        res.json({ "msg": "User registered successfully!" })
    }
})

//login

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) return res.json({ "msg": "All fields are mandatory" })

    const checkUser = await users.findOne({ email });



    if (checkUser && bcrypt.compare(password, checkUser.password)) {

        // generate token

        const token = jwt.sign({
            user: checkUser.email
        },
            process.env.SECRETE_KEY
        )

        res.cookie(
            "token", token
        ).send()

        console.log(req.cookies)

    }



    else {

        return res.json({ "msg": "Invalid Email or password" })
    }

})



// create Users

app.post("/createusers",authmiddle, async(req, res)=>{

    const {username, phone, email, refrence} = req.body

    const token = req.token;

    const verifytoken = await jwt.verify(token, "UW!l}2x?-05HQh~")
    const create = await Custermers.create({
        username, email, phone, refrence : verifytoken.user
        
})

res.send(verifytoken.user)



})

app.get("/getAllusers", authmiddle , async (req, res)=>{
    const token = req.token;
    const verifytoken = await jwt.verify(token, "UW!l}2x?-05HQh~")


    const  getUser = await Custermers.find({
        refrence:verifytoken.user
    })
    res.send(getUser)
})