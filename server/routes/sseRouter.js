const express = require('express')
const { setupAddListener } = require('../controllers/sseController')

const router = express.Router()

router.get('/', setupAddListener)

module.exports = router
