const express = require("express")
const { handleGenerateShortUrl,handleGetUserAllUrls, handleRedirectUrl, handleUrlAnalytics } = require("../controllers/url")

const router = express.Router()

router.post('/',handleGenerateShortUrl)
router.get('/:id',handleRedirectUrl)
router.get('/analytics/:id',handleUrlAnalytics)

module.exports = router