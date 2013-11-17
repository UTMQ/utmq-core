var server = process.env.DB || "http://127.0.0.1:5984";
var nano = require('nano')(server);

nano.db.create('utmq-core', function(err, body) {
  if (!err) {
    console.log('Database created!');
  }
});
var utmq = nano.use('utmq-core');

exports.post = function(req, res, next){
  console.log('POST');
  console.log(req);

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
  utmq.list(function(err, body) {
    if (!err) {
      console.log(body.rows.length);
      if (body.rows.length === 0) {
        res.json([]);
      } else {
        body.rows.forEach(function(doc) {
          res.send(body);
          console.log(doc);
        });
      }

    } else {
      console.log(err);
    }
  });
};

exports.del = function(req, res, next){
  console.log('DEL');
  console.log(req);
};


