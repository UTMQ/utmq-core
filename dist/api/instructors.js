var sanitize = require('validator').sanitize;
var xss = require('sanitizer');

var setupViews = require('./views/instructors');

module.exports = function (dbConn) {
  var db = dbConn.database('utmq-core-instructors');

  setupViews(db);

  return {
    post: function (req, res, next) {
      var name = sanitize(xss.sanitize(req.body.name)).trim();

      db.save(name, {}, function (err, body) {
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
    getAll: function (req, res, next) {
      db.view('instructors/byEmail', function (err, resp) {
        if (!err && resp && resp.length !== 0) {
          res.send(200, { body: { rows: resp } });
        } else {
          res.send(500, { body: { rows: [] }});
        }
      });
    },

    del: function (req, res, next) {
      var id = req.params.id;
      db.get(id, function (err, body) {
        if (!err && body.admin !== true) {

          db.remove(body._id, function (err) {
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
