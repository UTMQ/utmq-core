var server = process.env.DB || "http://127.0.0.1:5984";
console.log('Trying to connect to a database at ' + server);
var nano = require('nano')(server);

/**
 * Create databases if they don't exist
 */
nano.db.create('utmq-core-problems');
nano.db.create('utmq-core-courses');
nano.db.create('utmq-core-instructors');
nano.db.create('utmq-core-submissions');

module.exports = nano;
