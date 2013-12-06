var setupViews = require('./views/problems');

module.exports = function (nano) {
  var db = nano.use('utmq-core-problems');

  setupViews(db);

  return {
    post: function (req, res, next) {
      console.log('POST');
      req.body.created_at = new Date();
      req.body.updated_at = new Date();
      db.insert(req.body, function (err, body) {
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

    },
    put: function (req, res, next) {
      console.log('PUT');
      console.log(req);

    },
    get: function (req, res, next) {
      console.log('GET');
      db.list(function (err, body) {
        if (!err) {
          body.rows.forEach(function (doc) {
            res.send(body);
            console.log(doc);
          });
        } else {
          console.log(err);
        }
      });
    },

    getAll: function (req, res, next) {
      console.log('GET ALL');
      res.contentType = 'json';

      db.view('problems', 'by_name', function (err, body) {
        if (!err && body && body.rows.length !== 0) {
          res.send(200, { body: body});
        } else {
          res.send({ error: err, body: { rows: [] } });
        }
      });
    },

    del: function (req, res, next) {
      console.log('DEL');
      console.log(req);
    }
  };

};


