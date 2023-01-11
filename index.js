var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()

app.use(bodyParser.json())
app.use(express.static('InsomAID'))
app.use(bodyParser.urlencoded({
    extended:true
}))

//connect to mongoose database...usually on port 27017
mongoose.connect('mongodb://localhost:27017/people',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//check connection
var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"));

//access the signup info from "/InsomAID/ini.html"
app.post("/sign_up",(req,res)=>{
    var email = req.body.email;
    var password = req.body.password
    
    var data = {
        "email" : email,
        "password" : password
    }
    
    //store it as a document in collection: "users"
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('ini.html');

})

//account validation "/InsomAID/ini.html" and redirecting
app.post("/login", async(req,res)=>{
    try{
        const email= req.body.email;
        const password= req.body.password;

        const useremail = await db.collection('users').findOne({email:email});
        
        if(useremail.password === password){
            res.redirect("Parallax.html");
        }

    } catch {
        res.status(400).send("invalid email");
    }
})

//on signup, return to same page for login
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('ini.html');
}).listen(3003);

//status message for node server
console.log("Listening on PORT 3003");