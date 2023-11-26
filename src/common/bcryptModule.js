const bcrypt = require("bcrypt")

const  generateSalt = async()=>{
    return await bcrypt.genSalt()
}

const hashPassword = (salt,password)=>{
    return bcrypt.hash(password,salt)
}

const passwordCompare = (password,encryptedPassword)=>{
    return bcrypt.compare(password,encryptedPassword)
}

module.exports = {generateSalt,hashPassword,passwordCompare}