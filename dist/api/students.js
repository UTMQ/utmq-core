var sanitize = require('validator').sanitize;
var xss = require('sanitizer');

var setupViews = require('./views/students');

module.exports = function (dbConn) {
  var db = dbConn.database('utmq-core-students');

  setupViews(db);

  return { };

};
