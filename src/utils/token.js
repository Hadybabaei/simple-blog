const jwt = require("jsonwebtoken")

const generateJWT = (user)=>{
    return jwt.sign(user,process.env.JWT_SECRET);
}

const verifyToken = async (token)=>{
    return jwt.verify(token,process.env.JWT_SECRET)
}

module.exports = {generateJWT,verifyToken}