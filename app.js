const express = require('express')
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./dbConfig');
const productRouter = require('./routes/productRoutes');
const userRouter = require('./routes/userRoutes');
const cookieparser = require('cookie-parser')
const path = require('path')
const bodyParser = require('body-parser');
const multer = require('multer');
var upload = multer();

dotenv.config()


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieparser())
app.use('/products',productRouter);
app.use('/users',userRouter);
app.use(express.static(__dirname + '/views'));


app.get('/signup', (req,res)=>{
    res.sendFile(__dirname + '/views/signupForm.html')
})

app.get('/login',(req,res)=>{
    res.sendFile(__dirname + '/views/loginForm.html')
})

app.get('/admin',(req,res)=>{
    res.sendFile(__dirname + '/views/adminForm.html')
})
app.get('/home',(req,res)=>{
    res.sendFile(__dirname + '/views/homeForm.html')
})
// login and sigup ended

app.listen(6969,(error)=>{
if(!error){
    console.log('server started sucessfull at 6969')
    connectDB()
}
else{
    console.log(error)
}
})