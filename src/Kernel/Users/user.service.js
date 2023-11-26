const { passwordCompare } = require("../../common/bcryptModule")
const _Users = require("./user.model")

class UserService {

    userRegister = async(usersData)=>{
        try{
            return await _Users.create(usersData)
        }catch(err){
            throw err
        }
    }

    findUserByEmail = async (email)=>{
        try{
            return await _Users.findOne({email})
        }catch(err){
            throw err
        }
    }

    userLogin = async (email,password)=>{
        try{
            const loginError = "login failed,please check credentials"
            const user = await _Users.findOne({email});
            if (!user){
                throw new Error(loginError)
            }
            const passwordValidation = await passwordCompare(password,user.password);
            if (!passwordValidation){
                throw new Error(loginError)
            }
            return user
        }catch(err){
            throw err
        }
    }
}

module.exports = UserService