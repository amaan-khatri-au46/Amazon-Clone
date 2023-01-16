const {Router} = require('express')
const {
    signUp,
    logIn,
    logOut,
} = require('../controller/userController');
const userRouter = new Router()

userRouter.post('/signUp',signUp)
userRouter.post('/logIn',logIn)
userRouter.post('/logOut',logOut)

module.exports = userRouter