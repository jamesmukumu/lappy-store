const express = require("express")
const router = express.Router()
const {fetchLenovoideapad,fetchLenovoideapadprice,buyLenovoideapad} = require('../../controllers/laptops/lenovo laptops/lenovolaptops')
const {validateToken} = require('../../auth/jwt')


router.get('/lenovo/ideapad',fetchLenovoideapad)
router.get('/lenovo/ideapad/price',validateToken,fetchLenovoideapadprice)

router.post('/buy/lenovo/ideapad',validateToken,buyLenovoideapad)


module.exports = router
