require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { notFound, errorHandlingMiddleware } = require('./middleware/errorHandlingMiddleware');
const connectDB = require('./configs/mongo');
const routes = require('./routes');
const port = process.env.PORT || 4000;
const dir = path.resolve(path.join(__dirname, 'buckets'));
const startServer = () => {
    const app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.disable('x-powered-by');
    app.use(morgan('combined'));
    app.use(cors());
    routes(app);
    app.use(notFound);
    app.use(errorHandlingMiddleware);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    }
    app.listen(port, () => {
        console.log(`Server listening on http://localhost:${port}`);
    }).on('error', (e) => {
        console.log(e);
        process.exit(1);
    });
};

(async () => {
    try {
        // console.log('Connected MongoDB successfully');
        await connectDB();
        startServer();
    } catch (error) {
        // console.log('Connected MongoDB failed.');
        console.log(error);
        process.exit(1);
    }
})();
