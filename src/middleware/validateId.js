const { StatusCodes } = require('http-status-codes');
const mongoose = require('mongoose');
const isValidId = (req, res, next) => {
    const id = req.params.id;
    if (mongoose.Types.ObjectId.isValid(id)) {
        next();
    } else {
        return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Invalid id',
        });
    }
};
module.exports = isValidId;
