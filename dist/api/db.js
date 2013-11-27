var server = process.env.DB || "http://127.0.0.1:5984";

console.log('Trying to connect to a database at ' + server);

var nano = require('nano')(server);
var utmq = nano.use('utmq-core');

function createViews() {
  nano.db.destroy("design_list", function (err) {

    utmq.insert({ "views":
    {
      "by_name": { "map": function(doc) { emit({
        name: doc.name,
        updated_at: doc.updated_at,
        created_at: doc.created_at,
        id: doc._id
        }); } }
    }
    }, '_design/problems', function (error, response) {
      console.log(error);
      console.log(response);
    });
  });
}


function createDb() {
  nano.db.create('utmq-core', function(err, body) {
    if (!err) {
      console.log('Database created!');
      createViews();
    }
  });
}


nano.db.get('utmq-core', function(err, body) {
  if (!err) {
    console.log('Database exists!');
    console.log(body);
    createViews();
  } else {
    console.log(err);
    createDb();
  }
});
exports.db = utmq;