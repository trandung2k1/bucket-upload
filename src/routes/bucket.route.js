const { Router } = require('express');
const bucketController = require('../controllers/bucket.controller');
const isValidId = require('../middleware/validateId');
const router = Router();
router.get('/', bucketController.getAllBucket);
router.post('/', bucketController.createBucket);
router.get('/:id', isValidId, bucketController.getBucket);
router.delete('/:id', isValidId, bucketController.deleteBucket);
module.exports = router;
