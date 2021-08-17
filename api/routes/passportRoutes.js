const express = require('express')
const router = express.Router()
const passportController = require('../controllers/passportController')

router
  .route('/')
  .get(passportController.getAll)
  .post(passportController.validateBody, passportController.post)

router.route('/validate').post(passportController.validateCredential)

module.exports = router
