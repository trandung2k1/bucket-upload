const file = require('./file.route');
const bucket = require('./bucket.route');
const routes = (app) => {
  app.use('/buckets', bucket);
  app.use('/files', file);
};

module.exports = routes;
