const express = require("express")
const router = express.Router()
const {fetchMacbookair,fetchApplemacbookgoldprice,buyApplemacbookairgold} = require("../../controllers/laptops/apple laptops/apple")
const {validateToken} = require('../../auth/jwt')

router.get('/apple/macbookairgold',fetchMacbookair)
router.get('/apple/macbookairgold/price',validateToken,fetchApplemacbookgoldprice)
router.post('/buy/applemacbookairgold',validateToken,buyApplemacbookairgold)


module.exports = router