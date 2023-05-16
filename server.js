const express = require('express');
var path = require('path');

const app=express();

const admin =require('firebase-admin');
const credentials=require("./income-expense-tracking-system-firebase-adminsdk-id7jl-2336d1bac4.json");


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, './public')));

admin.initializeApp({
    credential:admin.credential.cert(credentials)
});

app.use(express.json());

app.use(express.urlencoded({ extended:true }));

app.get('/', function(req, res){
    res.render('signin')
});

app.get('/signup', function(req, res){
    res.render('signup')
});


app.post('/signup',async(req,res)=>{
    console.log(req.body);
    const user={
        email:req.body.email,
        password:req.body.password
    }

 const userResponse= await admin.auth().createUser({
        email:user.email,
        password:user.password,
        emailVerfied:false,
        disabled:false,
    });
    res.json(userResponse);
});


const PORT= process.env.PORT || 8080;
app.listen(PORT,() => {
    console.log('listening on port', PORT)
});