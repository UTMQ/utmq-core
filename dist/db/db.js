module.exports = function (settings) {
  var server = process.env.DB || "http://127.0.0.1:5984";
  console.log('Trying to connect to a database at ' + server);
  var cradle = require('cradle');
  var dbConn = new(cradle.Connection)(server);


  /**
   * Create databases if they don't exist
   */

  dbConn.database('utmq-core-problems').create();
  dbConn.database('utmq-core-courses').create();
  dbConn.database('utmq-core-instructors').create();
  dbConn.database('utmq-core-submissions').create();
  dbConn.database('utmq-core-students').create();

  /**
   * Configure admin instructor
   */
  if(settings.admin) {
    var admin = settings.admin;
    var dbStudent = dbConn.database('utmq-core-instructors');
    dbStudent.get(admin, function (err, doc) {
      if (!doc) {
        dbStudent.save(settings.admin, {});
      }
    });
  }

  return dbConn;

};
