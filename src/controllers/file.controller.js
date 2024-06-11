const { StatusCodes } = require('http-status-codes');
const File = require('../models/file.model');
class FileController {
    static async getAllFile(req, res) {
        try {
            const files = await File.find();
            return res.status(StatusCodes.OK).json({ data: files });
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: error.message });
        }
    }
}

module.exports = FileController;
