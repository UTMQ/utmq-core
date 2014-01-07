var setupViews = require('./views/students');

module.exports = function (dbConn) {
  var db = dbConn.database('utmq-core-students');

  setupViews(db);

  return { };

};
