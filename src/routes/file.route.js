const { Router } = require('express');
const fileController = require('../controllers/file.controller');
const router = Router();
router.get('/', fileController.getAllFile);
module.exports = router;
