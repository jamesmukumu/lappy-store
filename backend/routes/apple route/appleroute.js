const express = require("express")
const router = express.Router()
const {fetchMacbookair,fetchApplemacbookgoldprice,buyApplemacbookairgold,fetchApplemacbookpro2price,fetchMacbookpro2,buyApplemacbookprom2} = require("../../controllers/laptops/apple laptops/apple")
 const {validateToken} = require('../../auth/jwt')

router.get('/apple/macbookairgold',fetchMacbookair)
router.get('/apple/macbookairgold/price',validateToken,fetchApplemacbookgoldprice)
router.post('/buy/applemacbookairgold',validateToken,buyApplemacbookairgold)






//mac book air two

router.get('/apple/macbookprom2',fetchMacbookpro2)
router.get('/apple/macbookprom2/price',validateToken,fetchApplemacbookpro2price)
router.post('/buy/applemacbookprom2',validateToken,buyApplemacbookprom2)






module.exports = router