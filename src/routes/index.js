const file = require('./file.route');
const bucket = require('./bucket.route');
const routes = (app) => {
    app.use('/files', file);
    app.use('/buckets', bucket);
};

module.exports = routes;
