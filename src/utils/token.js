const jwt = require("jsonwebtoken")

const generateJWT = (user)=>{
    return jwt.sign(user,process.env.JWT_SECRET);
}


module.exports = {generateJWT}