
const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const secret_key = process.env.secret_key

const signUp = async(req,res)=>{

    const {userName,email,password,confirmPassword} = req.body
// console.log(req.body)
    try {
        const loggedInUser = await userModel.findOne({email},{email:1,password:1,isAdmin:1})
        if(loggedInUser){
            res.status(404).send({ status: 'error', msg: "User already exist" })
            // res.send(<script>alert("your alert message"); window.location.href = "/page_location"; </script>);
            return
        }

        if (password != confirmPassword) {
            res.status(400).send({ status: 'error', msg: "Password/Confirm Password are not same" })
          }
        //   else{

        const protectedPassword = await bcrypt.hash(password,4) //encrypting password with bcrypt 4 times 

        const newUser = await userModel.create({userName,email,password : protectedPassword})  
        //   setInterval(() => {
        // return res.redirect('/login')
            
        //   }, 1000);

        res.status(200).send({ status: 'success', user: { userName: newUser.userName, email: newUser.email }})
    


        //   }
    } catch (error) {
        res.status(500).send({ status: 'error',error,msg:'internal server error'})
    }
}


const logIn = async(req,res)=>{
    const {email,password} = req.body
    console.log(req.body);

    try {
        const loggedInUser = await userModel.findOne({email},{email:1,password:1,isAdmin:1})
        if(!loggedInUser){
            res.status(404).send({ status: 'error', msg: "User not found" })
            return
        }
            
        const isPasswordMatch = await bcrypt.compare(password, loggedInUser.password)
        if (!isPasswordMatch) {
          res.status(400).send({ status: 'error', msg: "Password Incorrect" })
          return
        }

       const userPayload = { email, isAdmin: loggedInUser.isAdmin }
       //Generate the token
       const token = jwt.sign(userPayload, process.env.secret_key, { algorithm: 'HS384', expiresIn: '1d' })
       res.cookie('jwt', token)

        
       res.send({ status: 'success', msg: 'User Logged in Successfully' })

    
        
      } catch (error) {
        res.status(500).send({ status: 'error', error, msg: "Internal Server Error" })
        
    }
}


const logOut = (req,res)=>{
    res.cookie('jwt', '', { maxAge: 1 })
    res.send({ status: 'success', msg: 'Logged Out Successfully' })
}
  

module.exports = {
    signUp,
    logIn,
    logOut,
    secret_key
}