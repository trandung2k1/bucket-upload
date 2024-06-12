const { Router } = require('express');
const bucketController = require('../controllers/bucket.controller');
const router = Router();
router.get('/', bucketController.getAllBucket);
router.post('/', bucketController.createBucket);
router.get('/:id', bucketController.getBucket);
module.exports = router;
