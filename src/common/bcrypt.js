const bcrypt = require("bcrypt")

const  genSalt = async()=>{
    return await bcrypt.genSalt()
}

const hashPassword = (salt,password)=>{
    return bcrypt.hash(password,salt)
}

module.exports = {genSalt,hashPassword}