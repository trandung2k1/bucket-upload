const { StatusCodes } = require('http-status-codes');
const { v4: uuidv4 } = require('uuid');
const slugify = require('slugify');
const File = require('../models/file.model');
const Bucket = require('../models/bucket.model');
const fs = require('fs');
class FileController {
  static async getAllFile(req, res) {
    try {
      const files = await File.find().populate('bucket');
      return res.status(StatusCodes.OK).json({ data: files });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  static async createFile(req, res) {
    const { bucketId } = req.fields;
    const file = req.files.file;
    try {
      const index = file?.name?.lastIndexOf('.');
      const fileExtension = file?.name?.slice(index);
      // <Buffer
      const fileData = await fs.readFileSync(file?.path);
      if (!fileData) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'File error' });
      }
      const findBucket = await Bucket.findById(bucketId);
      if (!findBucket) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'Bucket not found' });
      }
      const fileId = uuidv4();
      const filePath = `src/buckets/${findBucket.bucketId}/` + fileId + fileExtension;
      const fileSlug = slugify(file?.name?.slice(0, file?.name?.lastIndexOf('.')));
      fs.writeFileSync(filePath, fileData);
      const newFile = new File({
        fileId,
        filePath,
        bucket: bucketId,
        fileName: file.name,
        fileSlug,
      });
      const savedFile = await newFile.save();
      findBucket.files.push(savedFile._id);
      await findBucket.save();
      return res.status(StatusCodes.CREATED).json({ data: savedFile });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  static async getFile(req, res) {
    const { id } = req.params;
    try {
      const findFile = await File.findById(id);
      // const bucket = await Bucket.findById(findFile.bucket);
      // bucket.files.push(findFile);
      // await bucket.save();
      if (!findFile) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'File not found' });
      }
      const fileData = await fs.readFileSync(findFile.filePath);
      if (!fileData) {
        return res.json({
          data: fileData,
        });
      }
      res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Length': fileData.length,
      });
      return res.end(fileData);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }

  static async dowloadFile(req, res) {
    const { id } = req.params;
    try {
      const findFile = await File.findById(id);
      if (!findFile) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'File not found' });
      }
      const fileData = await fs.readFileSync(findFile.filePath);
      if (!fileData) {
        return res.json({
          message: 'File data error',
        });
      }
      return res.download(findFile.filePath, findFile.fileName);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
  static async removeFile(req, res) {
    const { id } = req.params;
    try {
      const findFile = await File.findById(id);
      if (!findFile) {
        return res.status(StatusCodes.NOT_FOUND).json({ message: 'File not found' });
      }
      // await findFile.remove();
      await File.findByIdAndDelete(id);
      await Bucket.updateOne(
        {
          _id: findFile.bucket,
        },
        {
          $pull: {
            files: id,
          },
        },
        { new: true },
      );
      fs.unlinkSync(findFile.filePath);
      return res.status(StatusCodes.OK).json({ message: 'Delete file successfully' });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
    }
  }
}

module.exports = FileController;
