const { Router } = require('express');
const fileController = require('../controllers/file.controller');
const isValidId = require('../middleware/validateId');
const expressFormidable = require('express-formidable');
const router = Router();
router.post('/', expressFormidable({}), fileController.createFile);
router.get('/', fileController.getAllFile);
router.get('/:id', isValidId, fileController.getFile);
router.get('/dowload/:id', isValidId, fileController.dowloadFile);
router.delete('/:id', isValidId, fileController.removeFile);
module.exports = router;
