const express = require('express')
const router = express.Router()

const homeController = require('../controllers/home.controller')

router.get('/api/detail/:id', homeController.detail)
router.post('/api/input', homeController.inputNews)
router.post('/api/update/:id', homeController.updateNews)
router.post('/api/delete/:id', homeController.delete)
router.get('/api/', homeController.news)


module.exports = router