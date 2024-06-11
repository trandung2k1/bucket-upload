const { Schema, model, models } = require('mongoose');

const fileSchema = new Schema(
    {
        fileId: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        fileName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        //uploads/avatar/1717973523950.jpg
        filePath: {
            type: String,
            required: true,
            trim: true,
        },
        fileSlug: {
            type: String,
            required: true,
            trim: true,
        },
        bucket: {
            type: Schema.Types.ObjectId,
            ref: 'Bucket',
            required: true,
        },
    },
    {
        timestamps: true,
    },
);

const File = models.File || model('File', fileSchema);
module.exports = File;
