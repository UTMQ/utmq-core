var sanitize = require('validator').sanitize;
var xss = require('sanitizer');

var setupViews = require('./views/instructors');

module.exports = function (nano) {
  var db = nano.use('utmq-core-instructors');

  setupViews(db);

  return {
    post: function (req, res, next) {
      console.log('POST');
      var name = sanitize(xss.sanitize(req.body.name)).trim();
      var doc = {
        name: name,
        created_at: new Date()
      };

      db.insert(doc, function (err, body) {
        res.contentType = 'json';
        if (!err) {
          res.send({
            result: body
          });
        } else {
          res.send(500,{
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

      db.view('instructors', 'by_name', function (err, body) {
        if (!err && body && body.rows.length !== 0) {
          res.send(200, { body: body });
        } else if (!err) {
          res.send(200, { body: { rows: [] }});
        } else {
          res.send(500, { body: { rows: [] }});
        }
      });
    },

    del: function (req, res, next) {
      var id = req.params.id;
      db.get(id, function (err, body) {
        if (!err) {

          db.destroy(body._id, body._rev, function (err) {
            if (!err) {
              res.send(200);
            } else {
              res.send(500);
            }
          });

        } else {
          res.send(500);
        }

      });
    }
  };

};
