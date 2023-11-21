const { Router } = require("express")
const UserService = require("./user.service")
const validationMiddleware = require("../../middlewares/validation.middleware")
const { register, login } = require("./user.dto")
const { genSalt, hashPassword } = require("../../common/bcrypt")
const { generateJWT } = require("../../utils/token")
const HttpExceptions = require("../../utils/exceptions/http.exceptions")

class UserController {
    path = "/users"
    router = Router()
    _UserService = new UserService()
    constructor(){
        this.initiateRouter()
    }

    initiateRouter = ()=>{
        this.router.post("/register",validationMiddleware(register),this.userRegister)
        this.router.post("/login",validationMiddleware(login),this.login)
    }

    userRegister = async (req,res,next)=>{
        try{
            const user = await this._UserService.findUserByEmail(req.body.email)
            if (user){
                throw new HttpExceptions(400,"User Already Exists")
            }
            const salt = await genSalt()
            const password = await hashPassword(salt,req.body.password)
            req.body.password = password;
            req.body.salt = salt
            req.body.last_login = Date.now()
            const newUser = await this._UserService.userRegister(req.body)
            const token = generateJWT({email:newUser.email,
            id:newUser._id})
            res.status(201).json({Message:"Registration Completed",token,Success:true})
        }catch(err){
            return next(err)
        }
    }

    login = async (req,res,next)=>{
        try{
            const user = await this._UserService.userLogin(req.body.email,req.body.password);
            const token = generateJWT({email:user.email,id:user._id});
            return res.status(201).json({Message:"Welcome",token,Success:true})
        }catch(err){
            return next(err)
        }
    }
}

module.exports = UserController