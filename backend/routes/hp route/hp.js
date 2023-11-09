const express = require('express')
const router = express.Router()
const {fetchHPeliteBookG2,fetchHPeliteBookG2price,buyHpelitebook} = require('../../controllers/laptops/hplaptops/hp')
const {validateToken} = require('../../auth/jwt')

router.get('/hp/elitebookg2',fetchHPeliteBookG2)
router.get('/hp/elitebookg2/price',validateToken,fetchHPeliteBookG2price)
router.post('/buy/hp/elitebookg2',validateToken,buyHpelitebook)

module.exports = router