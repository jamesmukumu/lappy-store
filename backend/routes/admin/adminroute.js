const express = require("express")
const router = express.Router()
const {postAdmin,loginAdminwithpassword,loginwithOTP,resetPassword,requestOTP,Validateemail} = require("../../controllers/Admins/admincontr")
const {validateTokenforadmins} = require("../../auth/jwtadmins")

router.post("/post/admin",postAdmin)
router.post('/login/admin/password',loginAdminwithpassword)
router.post('/login/with/otp',loginwithOTP)
router.post('/validate/email/admin',Validateemail)
router.put('/reset/password/admin',validateTokenforadmins,resetPassword)
router.get('/request/otp',requestOTP)
module.exports = router
