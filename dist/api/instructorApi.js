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

 


exports.post = function(req, res, next){
  console.log('POST');
  req.body.created_at = new Date();
  req.body.updated_at = new Date();
  utmq.insert(req.body, function(err, body) {
    res.contentType = 'json';
    if (!err) {
      res.send({
        result: body
      });
    } else {
      res.send({
        error: true,
        result: err
      });
    }
  });

};

exports.put = function(req, res, next){
  console.log('PUT');
  console.log(req);

};

exports.get = function(req, res, next){
  console.log('GET');
  utmq.list(function(err, body) {
    if (!err) {
      body.rows.forEach(function(doc) {
        res.send(body);
        console.log(doc);
      });
    } else {
      console.log(err);
    }
  });
};

exports.getAll = function(req, res, next){
  console.log('GET ALL');
  res.contentType = 'json';

  utmq.view('problems', 'by_name', function(err, body) {
    if (!err && body && body.rows.length !== 0) {
      res.send({ error: false, body: body});
    } else {
      res.send({ error: true, description: err});
    }
  });
};

exports.del = function(req, res, next){
  console.log('DEL');
  console.log(req);
};


