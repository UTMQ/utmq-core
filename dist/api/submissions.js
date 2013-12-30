var sanitize = require('validator').sanitize;
var xss = require('sanitizer');

var setupViews = require('./views/submissions');

module.exports = function (dbConn) {
  var db = dbConn.database('utmq-core-submissions');

  setupViews(db);

  return {
    post: function (req, res, next) {
      console.log('POST');


      db.insert(req.body, function (err, body) {
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
      var id = req.params.id;
      db.get(id, function (err, body) {
        if (!err) {
          res.send(200, body);
        } else {
          res.send(500);
        }

      });
    },

    getAll: function (req, res, next) {
      console.log('GET ALL');
      res.contentType = 'json';

      db.view('submissions', 'by_name', function (err, body) {
        if (!err && body && body.rows.length !== 0) {
          res.send(200, { body: body });
        } else if (!err) {
          res.send(200, { body: { rows: [] }});
        } else {
          res.send(500, { error: err,  body: { rows: [] }});
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



