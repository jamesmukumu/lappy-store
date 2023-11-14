const express = require('express')
const router = express.Router()
const {fetchHPeliteBookG2,fetchHPeliteBookG2price,buyHpelitebook,buyHpceleron4020,fetchHPceleron4020,fetchHPceleron4020price} = require('../../controllers/laptops/hplaptops/hp')
const {validateToken} = require('../../auth/jwt')

router.get('/hp/elitebookg2',fetchHPeliteBookG2)
router.get('/hp/elitebookg2/price',validateToken,fetchHPeliteBookG2price)
router.post('/buy/hp/elitebookg2',validateToken,buyHpelitebook)




router.get('/hp/celeron/4020',fetchHPceleron4020)
router.get('/hp/celeron4020/price',validateToken,fetchHPceleron4020price)
router.post('/buy/hp/celeron4020',validateToken,buyHpceleron4020)

module.exports = router