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
}

module.exports = UserService