const { Router } = require('express');
const fileController = require('../controllers/file.controller');
const isValidId = require('../middleware/validateId');
const router = Router();
router.get('/', fileController.getAllFile);
router.get('/:id', isValidId, fileController.getFile);
router.get('/dowload/:id', isValidId, fileController.dowloadFile);
router.post('/', fileController.createFile);
module.exports = router;
