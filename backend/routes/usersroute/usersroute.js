const express = require("express")
const router = express.Router()
const {postUser,loginClient,validateEmailforpasswordreset,updatePassword,fetchAllemails} = require('../../controllers/users/userscont')
const {validateToken} = require("../../auth/jwt")

router.post('/post/user',postUser)
router.post('/login/client',loginClient)
router.post('/validate/email',validateEmailforpasswordreset)
router.put('/change/password',validateToken,updatePassword)
router.get('/get/allemails',validateToken,fetchAllemails)
module.exports = router 