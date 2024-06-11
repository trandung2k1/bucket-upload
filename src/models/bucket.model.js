const { Schema, model, models } = require('mongoose');

const bucketSchema = new Schema(
    {
        bucketId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        bucketName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        bucketPath: {
            type: String,
            required: true,
            trim: true,
        },
        bucketSlug: {
            type: String,
            required: true,
            trim: true,
        },
        files: [
            {
                type: Schema.Types.ObjectId,
                ref: 'File',
            },
        ],
    },
    {
        timestamps: true,
    },
);

const Bucket = models.Bucket || model('Bucket', bucketSchema);
module.exports = Bucket;
