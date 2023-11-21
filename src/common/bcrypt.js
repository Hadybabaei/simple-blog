const bcrypt = require("bcrypt")

const  genSalt = async()=>{
    return await bcrypt.genSalt()
}

const hashPassword = (salt,password)=>{
    return bcrypt.hash(password,salt)
}

const passwordCompare = (password,encryptedPassword)=>{
    return bcrypt.compare(password,encryptedPassword)
}

module.exports = {genSalt,hashPassword,passwordCompare}