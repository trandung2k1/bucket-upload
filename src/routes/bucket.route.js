const { Router } = require('express');
const bucketController = require('../controllers/bucket.controller');
const router = Router();
router.get('/', bucketController.getAllBucket);
module.exports = router;
