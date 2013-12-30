var sanitize = require('validator').sanitize;
var xss = require('sanitizer');

var setupViews = require('./views/instructors');

module.exports = function (dbConn) {
  var db = dbConn.database('utmq-core-instructors');

  setupViews(db);

  return {
    post: function (req, res, next) {
      console.log('POST');
      var name = sanitize(xss.sanitize(req.body.name)).trim();
      var doc = {
        name: name,
        created_at: new Date()
      };

      db.save(doc, function (err, body) {
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
    },

    getAll: function (req, res, next) {
      console.log('GET ALL');
      res.contentType = 'json';

      db.view('instructors/all', function (err, res) {
        if (!err && res && res.length !== 0) {
          res.send(200, { body: { rows: res } });
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
