const bcrypt = require("bcrypt")
const User = require("../../schemas/users/usersschema")
const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()
const jwt = require("jsonwebtoken")





const saltRounds = 10
//create transport


const transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    secure:false,
    auth:{
        user:process.env.gmailuser,
        pass:process.env.pass
    }
})






//post user
async function postUser(req,res){
try {
  const email = req.body.Email
const Password = req.body.Password
const hashedPassword = await bcrypt.hash(Password,saltRounds)

const insertedUser = new User({
    username:req.body.username,
    Password:hashedPassword,
    Email:email,
    phoneNumber:req.body.phoneNumber
})
await insertedUser.save()


const mailOptions = {
    to:req.body.Email,
    from:process.env.gmailuser, 
    subject:"Sign Up",
    html:'<strong style="color:plum;">Thank you for signing up we appreciate and care for your</strong>'
}


transporter.sendMail(mailOptions)

const token = jwt.sign({email},process.env.jwtpass,{expiresIn:"1h"})
return res.status(200).json({message:"Saved and email sent",data:token})
} catch (error) {
    if(error=="SequelizeUniqueConstraintError: Validation error"){
    return res.status(200).json({message:"Email already exists"})
    }
return res.status(500).json({error:`${error}`})    
}
}






//login user
async function loginClient(req,res){
try {
const inputUsername = req.body.username
const inputPassword = req.body.Password

const matchingUsername = await User.findOne({where:{username:inputUsername}})

if(!matchingUsername){
return res.status(200).json({message:"Username not found"})
}

const matchingPassword = await bcrypt.compare(inputPassword,matchingUsername.Password)
if(!matchingPassword){
return res.status(200).json({message:"incorrect password"})
}
else if(matchingPassword){
    const token = jwt.sign({matchingPassword},process.env.jwtpass,{expiresIn:"1h"})
    return res.status(200).json({message:"logged in",data:token}) 
}

} catch (error) {
return res.status(500).json({error:`${error}`})    
}
}




//send link to set password
async function validateEmailforpasswordreset(req,res){
try {
const recoveryEmail = req.body.Email
const matchingEmail = await User.findOne({where:{Email:recoveryEmail}})
if(!matchingEmail){
return res.status(200).json({message:"Email does Not exist"})
}
else{
    const token = jwt.sign({matchingEmail},process.env.jwtpass,{expiresIn:"700s"})
const mailOptions = {
    to:recoveryEmail,
    from:process.env.gmailuser,
    subject:"Password Reset",
    html:'<p style="color:green;">Reset Your Password here this link is valid for <span style="color:red;">10 minutes</span> </p> <a href="https://lappy-store.web.app/reset/password">Reset Password</a>'
}

await transporter.sendMail(mailOptions)

return res.status(200).json({message:"Password reset link sent",data:token})
}   
} catch (error) {
 return res.status(500).json({error})   
}}




//update password

async function updatePassword(req,res){
const queryEmail = req.query.Email
const hashedPassword = await bcrypt.hash(req.body.Password,10) 
try {
const foundandUpdatedpassword = await User.update({Password:hashedPassword},{where:{Email:queryEmail}})
if(foundandUpdatedpassword > 0){
return res.status(200).json({message:"Email  found and password  updated"})
}
else{
    return res.status(200).json({message:"No matching Email"})
}
    
} catch (error) {
return res.status(500).json({error})
}} 








//fetch all emails and send an email


async function fetchAllemails(req,res){
try {
const allEmailsinthedb = await User.findAll({attributes:["Email"]})

if(allEmailsinthedb.length===0){
return res.status(200).json({error:"No emails to befetched"})
}
else{
const allTargetemails = allEmailsinthedb.map((users)=>users.Email)
propagateEmails(req,res,allTargetemails)
}


return res.status(200).json({message:"Emails found and message sent "})
} catch (error) {
    
}
}



async function propagateEmails(req,res,allTargetemails){
const mailOptions = {
    to:allTargetemails.join(','),
    from:process.env.gmailuser,
    subject:"New laptop Deals",
    html:"<p>New laptop deals available</p>"

}
await transporter.sendMail(mailOptions)


}










module.exports = {postUser,loginClient,validateEmailforpasswordreset,updatePassword,fetchAllemails}