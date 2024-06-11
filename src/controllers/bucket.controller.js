const { StatusCodes } = require('http-status-codes');
const Bucket = require('../models/bucket.model');
class BucketController {
    static async getAllBucket(req, res) {
        try {
            const buckets = await Bucket.find();
            return res.status(StatusCodes.OK).json({ data: buckets });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}

module.exports = BucketController;
