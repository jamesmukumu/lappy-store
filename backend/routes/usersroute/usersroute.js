const express = require("express")
const router = express.Router()
const {postUser,loginClient,validateEmailforpasswordreset,updatePassword,fetchAllemails} = require('../../controllers/users/userscont')


router.post('/post/user',postUser)
router.post('/login/client',loginClient)
router.post('/validate/email',validateEmailforpasswordreset)
router.put('/change/password',updatePassword)
router.get('/get/allemails',fetchAllemails)
module.exports = router