const { StatusCodes } = require('http-status-codes');
const Bucket = require('../models/bucket.model');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const rootPath = 'src\\buckets\\';
const fs = require('fs');
class BucketController {
    static async getAllBucket(req, res) {
        try {
            const buckets = await Bucket.find();
            return res.status(StatusCodes.OK).json({ data: buckets });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }

    static async createBucket(req, res) {
        const { bucketName } = req.body;
        try {
            const bucketId = uuidv4();
            const bucketSlug = slugify(bucketName);
            const newBucket = new Bucket({ bucketId, bucketName, bucketSlug });
            const savedBucket = await newBucket.save();
            if (savedBucket && savedBucket._doc && savedBucket._doc.bucketId) {
                if (!fs.existsSync(rootPath + savedBucket._doc.bucketId)) {
                    fs.mkdirSync(rootPath + savedBucket._doc.bucketId, {
                        recursive: true,
                    });
                }
            }
            return res.status(StatusCodes.CREATED).json({ data: savedBucket._doc });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
    static async getBucket(req, res) {
        const { id } = req.params;
        try {
            const findBucket = await Bucket.findById(id);
            if (!findBucket) {
                return res.status(StatusCodes.NOT_FOUND).json({ data: 'Bucket not found' });
            }
            return res.status(StatusCodes.CREATED).json({ data: findBucket });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
    static async renameBucket(req, res) {
        const { id } = req.params;
        try {
            const findBucket = await Bucket.findById(id);
            if (!findBucket) {
                return res.status(StatusCodes.NOT_FOUND).json({ data: 'Bucket not found' });
            }
            // Delete all file inside bucket
            // Delete bucket folder
            await findBucket.remove();
            return res.status(StatusCodes.OK).json({ data: 'Delete bucket successfully' });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
    static async deleteBucket(req, res) {}
}

module.exports = BucketController;
