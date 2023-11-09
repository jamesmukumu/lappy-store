const Admin = require("../../schemas/admin/adminschema")
const crypto = require("crypto")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
dotenv.config()



function generateRandomOTP(){
    const otp = crypto.randomBytes(32).toString("hex")
    return otp
}

const randomotp = generateRandomOTP()
console.log(randomotp)




async function postAdmin(req,res){
    
    const hashedPassword = await bcrypt.hash(req.body.password,10)
try {
    
    const insertedAdmin = new Admin({
     firstname:req.body.firstname,
     secondname:req.body.secondname,
     password:hashedPassword,
     Email:req.body.Email,
     recoveryOTP:randomotp

    })

     await insertedAdmin.save()
      const token = jwt.sign({Email},process.env.jwtpassadmin,{expiresIn:"670s"})
    return res.status(200).setHeader("Authorization",token).json({message:"Admin saved to the db"})
} catch (error) {
    if(error==="SequelizeUniqueConstraintError: Validation error"){
     return res.status(200).json({message:"Email already exists"})
    }
    else{
        return res.status(500).json({error:`${error}`}) 
    }
}} 













//login with password

async function loginAdminwithpassword(req,res){
try {
const inputEmail = req.body.Email
const inputPassword = req.body.password


const matchingEmail = await Admin.findOne({where:{Email:inputEmail}})
if(!matchingEmail){
return res.status(200).json({message:"Email not found"})
}

const matchingEmailandpassword = await bcrypt.compare(inputPassword,matchingEmail.password)
if(!matchingEmailandpassword){
return res.status(200).json({message:"Password does not match"})
}
else{
    const token = jwt.sign({matchingEmail},process.env.jwtpassadmin,{expiresIn:"670s"})
    return res.status(200).setHeader("Authorization",token).json({message:"logged in"})
}



    
} catch (error) {
    return res.status(500).json({error:`${error}`})
}



}




//login with recoveryOTP
async function loginwithOTP(req,res){
try {
const loginOtp = await Admin.findOne({where:{recoveryOTP:req.body.recoveryOTP}})
if(!loginOtp){
return res.status(200).json({message:"invalid login otp"})
}
else{
    const token = jwt.sign({loginOtp},process.env.jwtpassadmin,{expiresIn:"670s"})
    return res.status(200).setHeader("Authoriztion",token).json({message:"otp valid"})
}

} catch (error) {
return res.status(500).json({error:`${error}`})    
}}

 







// reset password 


async function resetPassword(req,res){
try {
    const hashedPassword = await bcrypt.hash(req.body.password,10)
const changedPassword = await Admin.update({password:hashedPassword},{where:{Email:req.query.Email}})

if(changedPassword > 0){
return res.status(200).json({message:"Password changed Successfully"})
}
else{
    return res.status(200).json({messge:"Email not found thus password not updated"})
}

    
} catch (error) {
  return  res.status(500).json({error:`${error}`})  
}
}





//request otp
async function requestOTP(req,res){
try {
const matchingEmail = await Admin.findOne({where:{Email:req.query.Email}})
if(!matchingEmail){
return res.status(200).json({message:"No matching email"})
}
const otp = matchingEmail.recoveryOTP
return res.status(200).json({message:"Email found reset",data:otp})

    
} catch (error) {
   return res.status(500).json({error:`${error}`}) 
}





}













module.exports = {postAdmin,loginAdminwithpassword,loginwithOTP,resetPassword,requestOTP}