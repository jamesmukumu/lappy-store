const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()



function validateToken(req,res,next){
try {
const token = req.headers["authorization"]
if(!token){
return res.status(401).json({message:"Unauthorized no token"})
}
const validatedToken = jwt.verify(token,process.env.jwtpass)
if(!validatedToken){
return res.status(401).json({message:"Unauthorized"})
}
else{
return next()
}    
} catch (error) {
if(error.name==="TokenExpiredError"){
return res.status(401).json({message:"Unauthorized"})
} 
return res.status(500).json({error})
}
}

module.exports = {validateToken}