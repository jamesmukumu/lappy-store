const express = require("express")
const router = express.Router()
const {postAdmin,loginAdminwithpassword,loginwithOTP,resetPassword,requestOTP} = require("../../controllers/Admins/admincontr")
const {validateTokenforadmins} = require("../../auth/jwtadmins")

router.post("/post/admin",postAdmin)
router.post('/login/password',loginAdminwithpassword)
router.post('/login/with/otp',loginwithOTP)
router.put('/reset/password/admin',validateTokenforadmins,resetPassword)
router.get('/request/otp',validateTokenforadmins,requestOTP)
module.exports = router
